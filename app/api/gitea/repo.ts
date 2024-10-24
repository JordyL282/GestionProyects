// app/api/gitea/repo.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const repoFullName = searchParams.get('name');

    if (!repoFullName) {
        console.error('Nombre de repositorio no proporcionado');
        return NextResponse.json({ error: 'Nombre de repositorio requerido' }, { status: 400 });
    }

    try {
        const apiUrl = `https://gitea.com/api/v1/repos/${repoFullName}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error('Error al obtener el repositorio:', response.status);
            return NextResponse.json({ error: 'Repositorio no encontrado' }, { status: 404 });
        }

        const repoData = await response.json();
        return NextResponse.json(repoData);
    } catch (err) {
        console.error('Error en la solicitud a la API:', err);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
