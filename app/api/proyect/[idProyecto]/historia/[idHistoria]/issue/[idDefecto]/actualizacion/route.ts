import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { idProyecto: string; idHistoria: string; idDefecto: string } }) {
  try {
    const { userId } = auth();
    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log('ID del proyecto recibido:', params.idProyecto);
    console.log('ID de la historia recibido:', params.idHistoria);
    console.log('ID del defecto recibido:', params.idDefecto); // Verifica que este ID no sea undefined
    console.log('Datos recibidos:', data);

    // Verificar si existe el defecto
    const defecto = await db.defectos.findUnique({
      where: { idDefecto: params.idDefecto },
    });

    if (!defecto) {
      return new NextResponse("Defecto not found", { status: 404 });
    }

    // Actualizar el defecto usando idEstadoH
    const updatedDefecto = await db.defectos.update({
      where: { idDefecto: params.idDefecto },
      data: {
        estado: data.estado, // Asume que estás pasando idEstadoH en el cuerpo
      },
    });

    return NextResponse.json(updatedDefecto);
  } catch (error) {
    console.error("[actualizarDefecto] Error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
