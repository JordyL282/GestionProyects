import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; 

export async function GET() {
    try {
        const proyects = await db.proyects.findMany();
        return NextResponse.json(proyects);
    } catch (error) {
        console.error("Error al obtener proyectos:", error);
        return NextResponse.error();
    }
}
