"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormularioNuevoProyectoProps } from "./FormularioNuevoProyecto.types"
import { SelectContent, SelectItem ,SelectTrigger, SelectValue, Select } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Colaborador } from "@prisma/client"
import { useEffect, useState } from "react"
import { TipoProyecto } from "@prisma/client"

const formSchema = z.object({
  nombre: z.string().min(3),
  Descripcion: z.string().min(3),
  Responsable: z.string().min(3),
  Tipo: z.string().min(3),
  Duracion: z.string().min(1),
})

export function FormularioNuevoProyecto(props:FormularioNuevoProyectoProps){
    const {setOpenModalCreate} = props
    const [photoUploaded, setPhotoUploaded] = useState(false)
    const router = useRouter()
    const [colaboradores, setColaboradores] = useState<Colaborador[]>([])
    const [tipoproyect, setTipoproyecto] = useState<TipoProyecto[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            Descripcion: "",
            Responsable:"",
            Tipo: "",
            Duracion: "",
         
        },
      })
      const {isValid} = form.formState

      useEffect(() => {
        const fetchcolaborador = async () => {
            try {
                const response = await axios.get('/api/colaborador'); 
                setColaboradores(response.data); // Asegúrate de que la respuesta tiene la forma correcta
            } catch (error) {
                console.error("Error al obtener colaboradores:", error);
                toast({ title: "Error al cargar colaboradores", variant: "destructive" });
            }
        }

        fetchcolaborador();
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
     
      // 2. Define a submit handler.
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          axios.post("/api/proyect", values)
          toast({ title: "Proyecto creado" })
          router.refresh()
          setOpenModalCreate(false)
        } catch (error) {
          toast({
            title: "Something went wrong",
            variant: "destructive"
          })
        }
      }
      

    return(
        <div>
           
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
                    name="Descripcion"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Descripcion:</FormLabel>
                        <FormControl>
                            <Input placeholder="Descripcion del proyecto" type="text" {...field} />
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
                                            {tipoproyect.map((tipoP) => (
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
                            <Input placeholder="Dias estimados para proyecto" type="number" {...field} />
                        </FormControl>

                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                   <Button type="submit">Crear</Button>
            </form>
            </Form>
            
        </div>
    )
}