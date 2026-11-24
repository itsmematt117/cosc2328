// IC24 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis
// ic24-script.js | Session State — Student Favorites

// ── Step 6: Load all students with favorite status ──────────
function loadStudents() {
  fetch('/ic24/students', { credentials: 'same-origin' })
    .then(res => res.json())
    .then(students => {
      const list = document.getElementById('student-list');
      list.innerHTML = '';
      let favCount = 0;

      students.forEach(s => {
        const li       = document.createElement('li');
        const nameSpan = document.createElement('span');
        nameSpan.textContent = `${s.first_name} ${s.last_name}`;

        const starBtn = document.createElement('button');
        starBtn.textContent = s.isFavorite ? '★' : '☆';
        starBtn.setAttribute('data-id', s.id);
        starBtn.className = 'star-btn';

        if (s.isFavorite) {
          li.classList.add('favorited');
          favCount++;
        }

        // ── Step 7: Click handler for adding favorite ──────
        starBtn.addEventListener('click', () => {
          fetch('/ic24/favorites', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId: s.id })
          })
            .then(() => loadStudents())
            .catch(err => console.error('Favorite error:', err));
        });

        li.appendChild(nameSpan);
        li.appendChild(starBtn);
        list.appendChild(li);
      });

      document.getElementById('favorites-count').textContent = favCount;
    })
    .catch(err => console.error('Load error:', err));
}

// ── Step 8: Clear favorites button ──────────────────────────
document.getElementById('clear-favorites-btn')
  .addEventListener('click', () => {
    fetch('/ic24/favorites/clear', {
      method: 'POST',
      credentials: 'same-origin'
    })
      .then(() => loadStudents())
      .catch(err => console.error('Clear error:', err));
  });

// ── Load on page start ─────────────────────────────────────
loadStudents();