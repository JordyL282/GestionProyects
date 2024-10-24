import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { idProyecto: string; idHistoria: string } }
) {
  try {
    const { userId } = auth();
    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log('ID del proyecto recibido:', params.idProyecto);
    console.log('ID de la historia recibido:', params.idHistoria);
    console.log('Datos recibidos:', data);

    // Validar campos requeridos
    if (!data.nombre || !data.descripcion || !data.responsable || !data.prioridad) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Verificar si existe la historia
    const historia = await db.historia.findUnique({
      where: { idHistoria: params.idHistoria },
    });

    if (!historia) {
      return new NextResponse("Historia not found", { status: 404 });
    }

    // Intentar actualizar la historia
    let updatedHistoria;
    try {
      updatedHistoria = await db.historia.update({
        where: { idHistoria: params.idHistoria },
        data: {
          nombre: data.nombre,
          descripcion: data.descripcion,
          // Asegúrate de incluir todos los campos necesarios
          estadohistoria: {
            connect: { idEstadoH: data.estado }, // Si necesitas actualizar el estado
          },
          prioridadhistoria: {
            connect: { idPrioridadH: data.prioridad }, // Si necesitas actualizar la prioridad
          },
          colaborador: {
            connect: { idcolaborador: data.responsable }, // Si necesitas actualizar el colaborador
          },
        },
      });
    } catch (updateError) {
      console.error("[actualizarhistoria] Error en la actualización: ", updateError);
      return new NextResponse("Error updating historia", { status: 500 });
    }

    return NextResponse.json(updatedHistoria);
  } catch (error) {
    console.error("[actualizarhistoria] Error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
