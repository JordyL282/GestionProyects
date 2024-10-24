import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; 

export async function GET() {
    try {
        const colaborador = await db.colaborador.findMany();
        return NextResponse.json(colaborador);
    } catch (error) {
        console.error("Error al obtener colaborador:", error);
        return NextResponse.error();
    }
}
