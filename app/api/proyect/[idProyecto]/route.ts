import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { idProyecto: string } }
) {
    try {
        const { userId } = auth();
        const { idProyecto } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!idProyecto) {
            console.error("idProyecto is undefined");
            return new NextResponse("Project ID is required", { status: 400 });
        }

        console.log("idProyecto:", idProyecto);
        console.log("userId:", userId);
        console.log("Datos a actualizar:", values);

        // Verificar si el proyecto existe
        const existingProject = await db.proyects.findUnique({
            where: {
                idProyecto: idProyecto,
                userId: userId
            }
        });

        if (!existingProject) {
            return new NextResponse("Project not found", { status: 404 });
        }

        // Actualizar el proyecto
        const proyects = await db.proyects.update({
            where: {
                idProyecto: idProyecto,
                userId: userId
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(proyects);

    } catch (error) {
        console.error("[PROYECTOS id]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
