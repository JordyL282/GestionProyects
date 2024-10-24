"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormularioNuevaHistoriaProps } from "./FormularioNuevaHistoria.types"
import { useEffect, useState } from "react"
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { formSchema } from "./FormHistoria.form"
import { Colaborador, PrioridadHistoria } from "@prisma/client"

// Define el tipo para los estados
type EstadoHistoria = {
    idEstadoH: string;
    Estado: string;
};

export function FormularioNuevaHistoria(props: FormularioNuevaHistoriaProps) {
    const { setOpen } = props
    const router = useRouter()
    const params = useParams<{ idProyect: string }>()
    const [estados, setEstados] = useState<EstadoHistoria[]>([])
    const [colaboradores, setColaboradores] = useState<Colaborador[]>([])
    const [prioridades, setPrioridad] = useState<PrioridadHistoria[]>([])


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            estado: "",
            descripcion: "",
            responsable: "",
            prioridad: ""
        },
    })

    // Obtener los estados desde la API
    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const response = await axios.get('/api/estados'); 
                setEstados(response.data); // Asegúrate de que la respuesta tiene la forma correcta
            } catch (error) {
                console.error("Error al obtener estados:", error);
                toast({ title: "Error al cargar estados", variant: "destructive" });
            }
        }

        fetchEstados();
    }, []);
     // Obtener los colaboradores desde la API
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
      // Obtener la gravedad desde la API
      useEffect(() => {
        const fetchprioridad = async () => {
            try {
                const response = await axios.get('/api/prioridad'); 
                setPrioridad(response.data); // Asegúrate de que la respuesta tiene la forma correcta
            } catch (error) {
                console.error("Error al obtener prioridad:", error);
                toast({ title: "Error al cargar prioridad", variant: "destructive" });
            }
        }

        fetchprioridad();
    }, []);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log('Datos enviados:', values);
            await axios.post(`/api/proyect/${params.idProyect}/historia`, values);
            toast({ title: "Historia creada" });
            router.refresh();
            setOpen(false);
        } catch (error) {
            console.error("Error en el envío:", error);
            toast({
                title: "Something went wrong",
                variant: "destructive",
            });
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre de historia:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Historia" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="estado"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado:</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {estados.map((estadom) => (
                                                <SelectItem key={estadom.idEstadoH} value={estadom.idEstadoH}>
                                                    {estadom.Estado}
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
                            name="responsable"
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
                            name="prioridad"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prioridad:</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {prioridades.map((prioridad) => (
                                                <SelectItem key={prioridad.idPrioridadH} value={prioridad.idPrioridadH}>
                                                    {prioridad.PrioridadH}
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
                            name="descripcion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción:</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descripción HU" {...field} />
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
