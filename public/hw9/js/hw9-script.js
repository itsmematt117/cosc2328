// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis

/*
1) the require('dotenv').config() ensures that the .env is loaded into the process.env before
any of the routes are mounted, this allows every other file that runs afterwards to 'have' the
data as well. That is how process.env.PI_LICENSE gets the data.

2) In HW9 we used the fetch() call to perform the process. A plain button outside a form
doesn't actually submit, and therefore does not trigger the default action.

3)If the docker container restarted, the case list resets since it is stored locally.
We would need a database of some flavor to store the information seperatley if we want it to persist through restarts.
As a proof of concept (small scale), you could simply export the list (even a simple json or as plain text even)
 before shutdown, and then import the list upon boot.

4) The browser side code "see's" it in the hw9-script.js when the case button is clicked.
Response.ok evaluates to true for status codes 200-299 and false for those 400 and higher.
Here we used a simple conditional check to determine what the next action will be based on the result.

*/
const creds = document.getElementById('credentials');
const caseList = document.getElementById('case-list');

async function loadCredentials() {
  const res  = await fetch('/hw9/credentials');
  const data = await res.json();
  creds.innerHTML = '';

  Object.entries(data).forEach(([theKey, value]) => {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = theKey;
    dd.textContent = value;
    creds.appendChild(dt);
    creds.appendChild(dd);
    
  });
}

async function loadCases() {
    const res = await fetch('/hw9/cases');
    const data = await res.json();
    caseList.innerHTML = '';
      

    if (data.length === 0){
      const li = document.createElement('li');
      li.innerHTML = '<p class="empty-msg">No cases filed yet.</p>'
      caseList.appendChild(li);
      return;
    }

    data.forEach(m => {
        const li = document.createElement('li');
        li.innerHTML = `<p class="case-id">${m.id}</p>
        <p class="case-suspect">${m.suspect}</p>
        <p class="case-location">${m.location}</p>
        <p class="case-case-notes">${m.notes}</p>
        <p class="case-ts">${m.timestamp}</p>`
        caseList.appendChild(li); 
    })

}

document.querySelector("#log-btn").addEventListener('click', async (e) => {
  const suspect        = document.getElementById('suspect').value.trim();
  const location = document.getElementById('location').value.trim();
  const notes = document.getElementById('notes').value.trim();
  const eMessage = document.getElementById('log-status')
  
 
  const response = await fetch('/hw9/cases', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ suspect, location, notes }),
  });
  const data = await response.json();
  eMessage.textContent = '';

  if (!response.ok){
    eMessage.textContent = data.error;
  }
  
  loadCases();
});

loadCredentials();
loadCases();