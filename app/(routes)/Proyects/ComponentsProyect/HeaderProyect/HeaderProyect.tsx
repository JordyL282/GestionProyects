"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader, 
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { CirclePlus } from "lucide-react";
  import { useState } from "react";
import { FormularioNuevoProyecto } from "../FormularioNuevoProyecto";
  

export function HeaderProyect(){
    const [openModalCreate, setOpenModalCreate] = useState(false)
    return(

        <div className="flex justify-between items-center">
            <h2 className="text-2xl">Proyectos Creados</h2>
            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button>Nuevo Proyecto</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Crear</DialogTitle>
                        <DialogDescription>Crea y configura tu proyecto</DialogDescription>
                    </DialogHeader>
                    <FormularioNuevoProyecto setOpenModalCreate={setOpenModalCreate}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}