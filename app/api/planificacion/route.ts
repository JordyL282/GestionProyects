import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Asegúrate de que esta ruta es correcta

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        // Validar que todos los datos requeridos estén presentes
        if (!data.proyectoid || !data.emison || !data.observaciones || !data.lenguaje || !data.version || !data.idioma || !data.sprint || !data.puebas || !data.plataforma) {
            return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
        }

        const newPlanificacion = await db.planificacion.create({
            data: {
                proyectoid: data.proyectoid,
                emison: new Date(data.emison), // Asegúrate de que este es el formato correcto
                observaciones: data.observaciones,
                lenguaje: data.lenguaje,
                version: data.version,
                idioma: data.idioma,
                sprint: data.sprint,
                puebas: data.puebas,
                plataforma: data.plataforma,
            },
        });

        return NextResponse.json(newPlanificacion, { status: 201 });
    } catch (error) {
        console.error("Error en la creación de planificación:", error);
        return NextResponse.json({ error: "Error en la creación de planificación" }, { status: 500 });
    }
}
