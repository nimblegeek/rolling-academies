const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));
// Parse JSON request bodies
app.use(bodyParser.json());

// SQLite database setup
const db = new sqlite3.Database(':memory:');

// Create a gyms table in the database
db.serialize(() => {
    db.run(`
        CREATE TABLE gyms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            city TEXT,
            picture TEXT
        )
    `);
});

// Define a simple endpoint to get all gyms
app.get('/api/gyms', (req, res) => {
    // Fetch all gyms from the database
    db.all('SELECT * FROM gyms', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Define an endpoint to add a new gym
app.post('/api/gyms/add', (req, res) => {
    const { name, city, picture } = req.body;

    if (!name || !city || !picture) {
        res.status(400).json({ error: 'Invalid data. Please provide name, city, and picture.' });
        return;
    }

    // Insert the new gym into the database
    const stmt = db.prepare('INSERT INTO gyms (name, city, picture) VALUES (?, ?, ?)');
    stmt.run(name, city, picture, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Gym added successfully!' });
    });
    stmt.finalize();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
