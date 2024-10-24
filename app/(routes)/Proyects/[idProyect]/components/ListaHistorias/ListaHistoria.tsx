import { ListaHistoriaProps } from "./ListaHistoria.type";
import { redirect } from "next/navigation";
import { db } from "@/lib/db"; 
import { auth } from "@clerk/nextjs";
import { Separator } from "@radix-ui/react-select";
import Link from 'next/link'; 
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export async function ListaHistorias(props: ListaHistoriaProps) {
    const { proyects } = props;
    const { userId } = auth();

    if (!userId) {
        redirect("/");
        return null; 
    }

    const historias = await db.historia.findMany({
        where: {
            idProyect: proyects.idProyecto,
        },
        include: {
            estadohistoria: true, // Incluye la relación con estadohistoria
        },
    });

    if (historias.length === 0) {
        return <p>Aún no se han creado historias para este proyecto</p>;
    }

    return (
        <div>
            <div className="grid items-center justify-between grid-cols-4 p-2 px-4 mt-4 mb-2 rounded-lg gap-x-3 bg-slate-400/200">
                <p>Historia</p>
                <p>Descripción</p>
                <p>Estado</p>
                <p>Acciones</p>
            </div>
            <Separator />
            {historias.map((historia, index) => (
                <div key={historia.idHistoria}>
                    <div className="grid grid-cols-4 gap-x-3 items-center justify-between px-4">
                        <p>{historia.nombre}</p>
                        <p>{historia.descripcion}</p>
                        <p>{historia.estadohistoria?.Estado}</p> {/* Muestra el estado usando la relación */}
                        <div className="flex gap-2">
                            <Link href={`/Proyects/${proyects.idProyecto}/${historia.idHistoria}`}>
                                <Button variant="ghost" color="secondary">
                                    <Pencil className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <Separator /> {/* Línea separadora entre historias */}
                </div>
            ))}
        </div>
    );
}
