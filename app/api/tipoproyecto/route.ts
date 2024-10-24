import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Asegúrate de que esta ruta es correcta

export async function GET() {
    try {
        const tipoproyect = await db.tipoProyecto.findMany();
        return NextResponse.json(tipoproyect);
    } catch (error) {
        console.error("Error al obtener estados:", error);
        return NextResponse.error();
    }
}
