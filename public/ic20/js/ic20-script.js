// IC20 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis

/*              Responses
1) It searches and manipulates the incoming JSON information and makes the parsed data available on 
    req.body. Without it the req.body in POST would be undefined.

2) 200 means the request was completed sucessfuly and returned, while 201 means
    the request completed and returned with a new resource.

3) You would need to add a system or location in which to store the data.

4) No since the data is not stored or constantly pulled from the server. So they would only see it if
    one persons page happened to be reloaded right after the other person posted.
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



