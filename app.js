// IC1 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis
require('dotenv').config();
// NEW - IC19 : read .env and load value into proces.env
const PORT = process.env.PORT || 3000;

const express = require("express");                       // load the Express web framework
const path    = require("path");                          // built-in Node module for working with file paths
const app     = express();                               // create the Express application
//const PORT2    = 3000;                                    // the port your browser connects to

//
app.use(express.json());                                    // NEW - IC20 : parse incoming JSON and make it available on req.body



app.use(express.static(path.join(__dirname, "public"))); // serve every file in public/ as a static file
//___

// IC19 — mission status route
app.get('/ic19/status', (req, res) => {                  // NEW — IC19: GET route, responds with plain text
  res.send(`Mission Zone: ${process.env.MISSION_ZONE} | Alert Level: ${process.env.ALERT_LEVEL}`);
});

//___

// IC19 — config route (returns JSON)
app.get('/ic19/config', (req, res) => {                  // NEW — IC19: GET route, responds with JSON
  res.json({
    zone:       process.env.MISSION_ZONE,
    alert:      process.env.ALERT_LEVEL,
    port:       PORT,
    serverTime: new Date().toISOString(),
  });
});

// IC20 - mission routes
app.use("/ic20", require("./routes/ic20-routes"));  // NEW - IC20 : mount the mission routes at /ic20 

// HW9 - NEON N.
app.use('/hw9', require('./routes/hw9-routes'));  // NEW — HW9: mount hw9 router


//____
app.listen(PORT, "0.0.0.0", () =>                        // 0.0.0.0 makes the server reachable from the droplet (IC2)
  console.log(`Running on http://localhost:${PORT}`)
);