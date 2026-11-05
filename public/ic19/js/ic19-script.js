// IC19 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis

/*. ANSWERS

1. require('dotenv').config() reads .env and loads each KEY=VALUE line into
    process.env before any other code runs. It must be first because process.env
    is read at the time each line executes — if dotenv loads after PORT is read,
    process.env.PORT is still undefined.

 2. res.send() returns plain text (Content-Type: text/html).
    res.json() serializes a JS object to JSON and sets Content-Type: application/json.
    Use res.send() for short messages or HTML; res.json() for structured data.

3) The .env contains your confidential information such as passwords and any other
information you would not want broadcasted publicly. If tis on your public github then it
is viewable by anyone.

4) You would need to creat a new .env file on the droplet and add the variables 
with corresponding values to it. 

*/



const dl = document.getElementById('config-display');

async function loadConfig() {
  const res  = await fetch('/ic19/config');
  const data = await res.json();
  dl.innerHTML = '';
  Object.entries(data).forEach(([key, value]) => {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = key;
    dd.textContent = value;
    dl.appendChild(dt);
    dl.appendChild(dd);
  });
}

loadConfig();
