// IC24 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis
// ic24-routes.js | Session State — Student Favorites

const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /ic24/students — all students with isFavorite flag
router.get('/students', (req, res) => {
  db.all('SELECT * FROM students', [], (err, rows) => {
    if (err) { return res.status(500).json({ error: err.message }); }

    const favorites = req.session.favorites || [];
    const enriched  = rows.map(student => ({
      ...student,
      isFavorite: favorites.includes(student.id)
    }));

    res.json(enriched);
  });
});

// POST /ic24/favorites — add a student to session favorites
router.post('/favorites', (req, res) => {
  const studentId = parseInt(req.body.studentId);

  if (!req.session.favorites) {
    req.session.favorites = [];
  }

  if (!req.session.favorites.includes(studentId)) {
    req.session.favorites.push(studentId);
  }

  res.json({ favorites: req.session.favorites });
});

// POST /ic24/favorites/clear — clear all session favorites
router.post('/favorites/clear', (req, res) => {
  req.session.favorites = [];
  res.json({ favorites: req.session.favorites });
});



module.exports = router;