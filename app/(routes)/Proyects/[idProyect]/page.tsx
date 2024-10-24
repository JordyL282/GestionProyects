import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { HeaderP } from "./components/Header"
import { ProyectInformation } from "./components/ProyectInformation"

export default async function ProyectoIdPage({params}: {params: {idProyect: string}}){
    //codigo para que al momento de intntar acceder a la pgina sin logear
    const { userId } = auth()

    if(!userId){
        return redirect("/")
    }

    const proyects = await db.proyects.findUnique({
        where:{
            idProyecto: params.idProyect,
            userId
        }
    })
    if(!proyects){
        return("/")
    }
  
    return(
        <div>
            <HeaderP/>
            <ProyectInformation proyects={proyects}/>
            
            <p>Footer proyect</p>
        </div>
    )
}