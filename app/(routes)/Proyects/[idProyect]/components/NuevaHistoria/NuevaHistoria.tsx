"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader,  DialogTitle, DialogTrigger  } from "@/components/ui/dialog"
import { FormularioNuevaHistoria } from "./FormularioNuevaHistoria"

export function NuevaHistoria(){
    const [open, setOpen] = useState (false)

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button>Nueva Historia</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Crear nueva Historia</DialogTitle>
                    <DialogDescription>
                        Crear una nueva historia para el proyecto.
                    </DialogDescription>
                </DialogHeader>
                <FormularioNuevaHistoria setOpen={setOpen}/>
            </DialogContent>
        </Dialog> 
    )
}