// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// Endpoint to update data.json
app.post('/update-data', (req, res) => {
    const newData = req.body; // Get new data from request body

    // Write new data to data.json file
    fs.writeFile('C:/Users/natha/smart-retail/public/data.json', JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Error writing to file');
        }
        res.send('Data updated successfully');
    });
});

// Start the server on all interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});