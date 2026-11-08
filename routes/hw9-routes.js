// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis

const express = require('express');
const router  = express.Router();

let cases  = [];   // in-memory case log — resets on server restart
let nextId = 1;

// GET /hw9/credentials — return detective clearance from .env
router.get('/credentials', (req, res) => {
    const license = process.env.PI_LICENSE;
    const station = process.env.STATION_NAME;
    const alert = process.env.ALERT_LEVEL;

    const envInfo = {license, station, alert };

    res.json(envInfo);
});

router.get('/cases', (req, res) => {
    res.json(cases);
});

// POST /hw9/ sustpect, location, notes
router.post('/cases', (req, res) => {
    const { suspect, location, notes } = req.body;
    if (!suspect || !location) {
        return res.status(400).json({ error: 'suspect and location required' });
    }

    const timestamp = new Date().toISOString();

    const newCase = { id: nextId++, suspect, location, notes, timestamp};
    cases.push(newCase);
    res.status(201).json(newCase);  
});

module.exports = router;