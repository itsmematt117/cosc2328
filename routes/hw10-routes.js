// HW10 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis

const express = require('express');
const router  = express.Router();
const db      = require('../db');

function buildPage(monsters, message, error, battle) {

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/hw10/css/hw10.css"></link>
    </head>
    <body>
    ${message ? `<p class="banner-success">${message}</p>` : ''}
    ${error ? `<p class="banner-error">${error}</p>` : ''}

    ${monsters.map(monster => `
        <div class="monster-card">
            <h2>${monster.name}</h2>
            <p>Species: ${monster.species}</p>
            <p>Attack: ${monster.attack}</p>
            <p>Defense: ${monster.defense}</p>
            <p>HP: ${monster.hp}</p>
        </div>`
    ).join('')}
    
        <form class="form-block" action="/hw10/recruit" method="POST">
            <label for="name">name</label>
            <input type="text" id="name" name="name" required></input>

            <label for="species">species</label>
            <input type="text" id="species" name="species" required></input>

            <label for="attack">attack</label>
            <input type="number" id="attack" name="attack" required></input>

            <label for="defense">defense</label>
            <input type="number" id="defense" name="defense" required></input>

            <label for="hp">hp</label>
            <input type="number" id="hp" name="hp" required></input>

            <button type="submit">Recruit</button>
        </form>

        <form class="form-block" action="/hw10/retire" method="POST">
            <input type="number" id="id" name="id" required></input>
            <label for="id">id</label>
            <button type="submit">Retire</button>
        </form>

        <form class="form-block" action="/hw10/battle" method="POST">
            <button type="submit">BATTLE!</button>
        </form>

        Battle Result: ${battle ? `<div class="battle-results">
            <div class="fighters">
                <div class="fighter">
                    <div class="fighter-name">${battle.a.name}</div>
                    <div class="fighter-species">${battle.a.species}</div>
                    <div class="fighter-stats">Attack: ${battle.a.attack}, Defense: ${battle.a.defense},
                     HP: ${battle.a.hp}</div>
                    <div class="fighter-score">Score: ${battle.scoreA}</div>
                </div>
                <div class="fighter">
                    <div class="fighter-name">${battle.b.name}</div>
                    <div class="fighter-species">${battle.b.species}</div>
                    <div class="fighter-stats">Attack: ${battle.b.attack}, Defense: ${battle.b.defense},
                     HP: ${battle.b.hp}</div>
                    <div class="fighter-score">Score: ${battle.scoreB}</div>
                </div>

            </div>
            <p class="winner">${battle.winner}</p>
        </div>` : ''}


    </body>
    </html>
  `
}

router.get('/', (req, res) => {
  const message = req.query.message || null;
  const error   = req.query.error   || null;
  db.all('SELECT * FROM monsters ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).send('<p>Database error: ' + err.message + '</p>');
    const html = buildPage(rows, message, error, null);
    res.send(html);
  });
});

router.post('/recruit', (req, res) => {
  const { name, species, attack, defense, hp } = req.body;
  db.run(
    'INSERT INTO monsters (name, species, attack, defense, hp) VALUES (?, ?, ?, ?, ?)',
    [name, species, attack, defense, hp],
    function (err) {
      if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
      res.redirect('/hw10?message=' + encodeURIComponent('Monster recruited!'));
    }
  );
});

router.post('/retire', (req, res) => {
  const { id } = req.body;
  db.run('DELETE FROM monsters WHERE id = ?', [id], function (err) {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (this.changes === 0) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Monster not found.'));
    }
    res.redirect('/hw10?message=' + encodeURIComponent('Monster retired!'));
  });
});

router.post('/battle', (req, res) => {
  db.all('SELECT * FROM monsters', [], (err, rows) => {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (rows.length < 2) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Not enough monsters to battle!'));
    }

    let i = Math.floor(Math.random() * rows.length);
    let j;
    do { j = Math.floor(Math.random() * rows.length); } while (j === i);

    const a = rows[i];
    const b = rows[j];
    const scoreA = a.attack + a.defense + a.hp;
    const scoreB = b.attack + b.defense + b.hp;

    let winner = 'Draw!';
    if (scoreA > scoreB) winner = a.name + ' wins!';
    else if (scoreB > scoreA) winner = b.name + ' wins!';

    const battle = { a, b, scoreA, scoreB, winner };
    const html   = buildPage(rows, null, null, battle);
    res.send(html);
  });
});

module.exports = router;