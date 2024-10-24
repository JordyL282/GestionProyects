import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { idHistoria: string; idProyecto: string } }) {
  try {
    const issues = await db.defectos.findMany({
      where: {
        historiaid: params.idHistoria,
      },
    });

    return NextResponse.json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { idHistoria: string; idProyecto: string } }) {
  try {
    const { userId } = auth();
    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!data.nombre || !data.descripcion || !data.gravedad || !data.estado) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const historia = await db.historia.findUnique({
      where: {
        idHistoria: params.idHistoria,
      },
    });

    if (!historia) {
      return new NextResponse("History not found", { status: 404 });
    }

    const issue = await db.defectos.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        gravedad: data.gravedad,
        estado: data.estado,
        historiaid: historia.idHistoria,
      },
    });

    return NextResponse.json(issue);
  } catch (error) {
    console.error("[issue] Error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
