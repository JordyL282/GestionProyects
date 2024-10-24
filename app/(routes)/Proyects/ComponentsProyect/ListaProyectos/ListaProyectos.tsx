import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db"
import Proyects from "../../page"
import { DataTable } from "./data-table"
import { columns } from "./Columns"

export async function ListaProyectos(){
    const { userId } = auth()

    if (!userId){
        return redirect("/")
    }

    const Proyectos = await db.proyects.findMany({
        where:{
            userId,
        },
        orderBy:{
            createdAt: "desc"
        }
    })


    return(
        <DataTable columns={columns} data={Proyectos}/>
    )
}