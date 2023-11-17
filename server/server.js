const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
