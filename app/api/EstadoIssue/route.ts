import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Asegúrate de que esta ruta es correcta

export async function GET() {
    try {
        const estadoissue = await db.estadoIssue.findMany();
        return NextResponse.json(estadoissue);
    } catch (error) {
        console.error("Error al obtener estados:", error);
        return NextResponse.error();
    }
}
