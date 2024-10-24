// backend.js
const express = require('express');
const simpleGit = require('simple-git');
const app = express();
const git = simpleGit();

app.use(express.json());

app.post('/api/git-command', async (req, res) => {
    const { command } = req.body;

    try {
        // Ejecutar el comando de Git
        const result = await git.raw(command.split(' '));
        res.json({ output: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log('Servidor en el puerto 5000');
});
