// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis
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