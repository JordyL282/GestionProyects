// app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const proyectos = await prisma.proyects.findMany({
      include: {
        historia: {
          include: {
            estadohistoria: true,
          },
        },
      },
    });

    const data = proyectos.map(proyecto => {
      const historiasProcesoQA = proyecto.historia.filter(h => h.estadohistoria?.Estado === 'Proceso QA').length;
      const historiasEnCorrecion = proyecto.historia.filter(h => h.estadohistoria?.Estado === 'En Correccion').length;
      const historiasRechazadas = proyecto.historia.filter(h => h.estadohistoria?.Estado === 'Rechazada').length;
      const historiasEnDesarrollo = proyecto.historia.filter(h => h.estadohistoria?.Estado === 'En Desarrollo').length;

      return {
        idProyecto: proyecto.idProyecto,
        nombre: proyecto.nombre,
        totalHistorias: proyecto.historia.length,
        historiasProcesoQA,
        historiasEnCorrecion,
        historiasRechazadas,
        historiasEnDesarrollo,
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener estadísticas' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
