// pages/api/integration-tools.ts
import { NextApiRequest, NextApiResponse } from 'next';

const tools = [
    { id: '1', name: 'Jenkins', description: 'Servidor de automatización de código abierto.' },
    { id: '2', name: 'GitHub Actions', description: 'Automatización de flujo de trabajo directamente en GitHub.' },
    // Agregar más herramientas según sea necesario
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(tools);
}
