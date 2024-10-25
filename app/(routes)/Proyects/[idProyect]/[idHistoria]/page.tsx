import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { VerHistoria } from "./VerHistoria";

export default async function HistoriaIdPage({ params }: { params: { idHistoria: string } }) {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const historia = await db.historia.findUnique({
        where: {
            idHistoria: params.idHistoria,
        },
    });
    
    if (!historia) {
        return redirect("/"); 
    }

    const setOpen = (open: boolean) => {
        console.log("Set Open:", open);
    };
    
    const historiaId = historia.idHistoria;

    return (
        <div>
            <VerHistoria historia={historia} setOpen={setOpen} historiaId={historiaId} />
            <p>Footer proyect</p>
        </div>
    );
}
