"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormularioNuevoIssueProps } from "./FormularioNuevoIssue.types";
import { useEffect, useState } from "react";
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "./FormularioNuevoIssue.form";
import { EstadoIssue, PrioridadHistoria } from "@prisma/client";

// Define el tipo para los estados
type EstadoHistoria = {
  idEstadoH: string;
  Estado: string;
};

export function FormularioNuevoIssue(props: FormularioNuevoIssueProps) {
  const { setOpen } = props;
  const router = useRouter();
  const params = useParams<{ idProyect: string; idHistoria: string }>(); // Asegúrate de que idHistoria está presente

  const [estadosIssue, setEstados] = useState<EstadoIssue[]>([]);
  const [gravedad, setGravedad] = useState<PrioridadHistoria[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      estado: "",
      descripcion: "",
      gravedad: "",
    },
  });

  // Obtener los estados de los issues desde la API
  useEffect(() => {
    const fetchEstadoI = async () => {
      try {
        const response = await axios.get('/api/estadoi');
        setEstados(response.data);
      } catch (error) {
        console.error("Error al obtener estados:", error);
        toast({ title: "Error al cargar estados", variant: "destructive" });
      }
    };

    fetchEstadoI();
  }, []);

  // Obtener las prioridades desde la API
  useEffect(() => {
    const fetchPrioridad = async () => {
      try {
        const response = await axios.get('/api/prioridad');
        setGravedad(response.data);
      } catch (error) {
        console.error("Error al obtener prioridades:", error);
        toast({ title: "Error al cargar prioridades", variant: "destructive" });
      }
    };

    fetchPrioridad();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('onSubmit llamado con valores:', values);
    try {
      await axios.post(`/api/proyect/${params.idProyect}/historia/${params.idHistoria}/issue`, values);
      toast({ title: "Issue creado" });
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
                  <FormLabel>Nombre de Issue:</FormLabel>
                  <FormControl>
                    <Input placeholder="Issue" type="text" {...field} />
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
                      {estadosIssue.map((estadoi) => (
                        <SelectItem key={estadoi.idEstadoH} value={estadoi.idEstadoH}>
                          {estadoi.Estado}
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
              name="gravedad"
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
                      {gravedad.map((prioridad) => (
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
                    <Textarea placeholder="Descripción" {...field} />
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
  );
}
