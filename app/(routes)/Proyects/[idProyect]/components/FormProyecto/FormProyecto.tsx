"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { FormProyectoProps } from "./FormProyecto.types"
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { formSchema } from "./FormProyecto.form"
import { toast } from "@/hooks/use-toast"
import { Colaborador } from "@prisma/client"
import { useEffect, useState } from "react"
import { TipoProyecto } from "@prisma/client"

export function FormProyect(props: FormProyectoProps) {
    const { proyects } = props
    const router = useRouter()
    const [colaboradores, setColaboradores] = useState<Colaborador[]>([])
    const [tipoproyecto, setTipoproyecto] = useState<TipoProyecto[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: proyects.nombre,
            Descripcion: proyects.Descripcion,
            Tipo: proyects.Tipo ?? '', // Asignar valor vacío si es null
            Responsable: proyects.Responsable ?? '',// ID del responsable
            Duracion: proyects.Duracion
        }
    })

    useEffect(() => {
        const fetchColaboradores = async () => {
            try {
                const response = await axios.get('/api/colaborador'); 
                setColaboradores(response.data); // Asegúrate de que la respuesta tiene la forma correcta
            } catch (error) {
                console.error("Error al obtener colaboradores:", error);
                toast({ title: "Error al cargar colaboradores", variant: "destructive" });
            }
        }

        fetchColaboradores();
    }, []);

    useEffect(() => {
        const fetchTipoProyecto = async () => {
            try {
                const response = await axios.get('/api/tipoproyecto'); 
                setTipoproyecto(response.data); // Asegúrate de que la respuesta tiene la forma correcta
            } catch (error) {
                console.error("Error al obtener tipo:", error);
                toast({ title: "Error al cargar tipo", variant: "destructive" });
            }
        }

        fetchTipoProyecto();
    }, []);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/proyect/${proyects.idProyecto}`, values)
            toast({ title: "Proyecto actualizado", variant: "destructive" })
            router.refresh()
        } catch (error) {
            toast({
                title: "Something went wrong",
                variant: "destructive"
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre del Proyecto" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Responsable"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Responsable:</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {colaboradores.map((colaborador) => (
                                            <SelectItem key={colaborador.idcolaborador} value={colaborador.idcolaborador}>
                                                {colaborador.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Tipo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo:</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {tipoproyecto.map((tipoP) => (
                                            <SelectItem key={tipoP.idTipo} value={tipoP.idTipo}>
                                                {tipoP.TIpoProyecto}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Duracion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duracion:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Días estimados para proyecto" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Descripcion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripcion:</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Descripción del proyecto" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Actualizar</Button>
            </form>
        </Form>
    )
}
