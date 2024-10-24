import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Método para crear una historia
export async function POST(
  req: Request,
  { params }: { params: { idProyecto: string } }
) {
  try {
    const { userId } = auth();
    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log('ID del proyecto recibido:', params.idProyecto);
    console.log('Datos recibidos:', data);

    // Validar campos requeridos
    if (!data.nombre || !data.descripcion || !data.responsable || !data.prioridad) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Verificar si existe el proyecto
    const proyects = await db.proyects.findUnique({
      where: {
        idProyecto: params.idProyecto,
      },
    });

    if (!proyects) {
      return new NextResponse("Project not found", { status: 404 });
    }

    // Crear la historia vinculada al proyecto
    const historia = await db.historia.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        proyects: {
          connect: { idProyecto: params.idProyecto },
        },
        estadohistoria: { // Conectar el estado
          connect: { idEstadoH: data.estado }, // ID del estado
        },
        prioridadhistoria: { // Conectar la prioridad
          connect: { idPrioridadH: data.prioridad }, // ID de la prioridad
        },
        colaborador: { // Conectar el colaborador
          connect: { idcolaborador: data.responsable }, // ID del colaborador
        },
      },
    });

    return NextResponse.json(historia);
  } catch (error) {
    console.error("[historia] Error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


