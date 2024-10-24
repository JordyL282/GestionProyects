import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { VerHistoria } from "./VerHistoria"

export default async function HistoriaIdPage({params}: {params: {idHistoria: string}}){
    //codigo para que al momento de intntar acceder a la pgina sin logear
    const { userId } = auth()

    if(!userId){
        return redirect("/")
    }

    const historia = await db.historia.findUnique({
        where:{
            idHistoria: params.idHistoria,
           
        }
    })
    if(!historia){
        return("/")
    }
  
    return(
        <div>

            <VerHistoria historia={historia}/>
            
            <p>Footer proyect</p>
        </div>
    )
}