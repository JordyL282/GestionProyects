import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Asegúrate de que esta ruta es correcta

export async function GET() {
    try {
        const prioridad = await db.prioridadHistoria.findMany();
        return NextResponse.json(prioridad);
    } catch (error) {
        console.error("Error al obtener estados:", error);
        return NextResponse.error();
    }
}
