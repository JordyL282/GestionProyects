import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Asegúrate de que esta ruta es correcta

export async function GET() {
    try {
        const estadoshistoria = await db.estadoHistoria.findMany();
        return NextResponse.json(estadoshistoria);
    } catch (error) {
        console.error("Error al obtener estados:", error);
        return NextResponse.error();
    }
}
