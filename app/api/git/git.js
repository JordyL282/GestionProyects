// app/api/git.js
import { exec } from 'child_process';

const allowedCommands = ['git clone', 'git status', 'git pull', 'git push', 'git add', 'git commit'];

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { command } = req.body;

        // Verifica si el comando es permitido
        if (!allowedCommands.some(allowed => command.startsWith(allowed))) {
            return res.status(400).json({ output: 'Error: Comando no permitido.' });
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ output: `Error: ${stderr || error.message}` });
            }
            res.status(200).json({ output: stdout });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
