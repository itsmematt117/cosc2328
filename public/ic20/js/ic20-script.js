// IC20 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis

/* 1What does express.json() do, and what would happen to req.body in your POST route without it?

2What is the difference between HTTP status 200 and 201? When would you use each?

3Your seed missions disappear every time the Docker container restarts. What would you need to add to make them persist?

4If two people in different browser tabs both added missions at the same time, would they both see the same list? Why or why not?


1) It searches and manipulates the incoming JSON information and makes the parsed data available on 
    req.body. Without it the req.body in POST would be undefined.

2) 200 means the request was completed sucessfuly and returned, while 201 means
    the request completed and returned with a new resource.

3) You would need to add a system or location in which to store the data.

*/



const list = document.getElementById('mission-list');
const form = document.getElementById('mission-form');

async function loadMissions() {
  const res  = await fetch('/ic20/missions');
  const data = await res.json();
  list.innerHTML = '';
  data.forEach(m => {
    const li = document.createElement('li');
    li.innerHTML = `<p class="name">${m.name}</p><p class="dest">${m.destination}</p>`;
    list.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name        = document.getElementById('mission-name').value.trim();
  const destination = document.getElementById('mission-dest').value.trim();
  await fetch('/ic20/missions', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ name, destination }),
  });
  form.reset();
  loadMissions();
});

loadMissions();



