// app/api/proyects/index.ts

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { userId } = auth();
        
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Obtener todos los proyectos del usuario autenticado
        const proyectos = await db.proyects.findMany({
            where: { userId: userId },
            include: {
                colaborador: {
                    select: { nombre: true } // Incluir el nombre del colaborador
                },
                tipoproyecto: {
                    select: { TIpoProyecto: true } // Incluir el tipo de proyecto
                }
            }
        });

        return NextResponse.json(proyectos);
    } catch (error) {
        console.error("Error al obtener proyectos:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
