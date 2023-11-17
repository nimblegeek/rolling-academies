const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// SQLite database setup
const db = new sqlite3.Database(':memory:');

// Define a simple endpoint
app.get('/api/greeting', (req, res) => {
    res.json({ message: 'Hello, Lightweight World!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
