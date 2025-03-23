const express = require('express');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Function to run Python script
function runPythonScript() {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['get_heat_players.py']);
        
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python script output: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python script error: ${data}`);
            reject(new Error('Failed to run Python script'));
        });

        pythonProcess.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);
            if (code === 0) {
                // Read the updated JSON file
                const fs = require('fs');
                try {
                    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'frontend/data/heat_players.json'), 'utf8'));
                    resolve(data);
                } catch (error) {
                    reject(new Error('Failed to read updated stats file'));
                }
            } else {
                reject(new Error('Python script failed'));
            }
        });
    });
}

// API endpoint to get player stats
app.get('/api/player-stats', async (req, res) => {
    try {
        const updatedStats = await runPythonScript();
        res.json(updatedStats);
    } catch (error) {
        console.error('Error in /api/player-stats endpoint:', error);
        res.status(500).json({ error: 'Failed to fetch player stats' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 