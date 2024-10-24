"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  proyectoid: z.string().min(1, "Selecciona un proyecto"),
  emison: z.string().min(1, "Ingresa la fecha de emisión"),
  observaciones: z.string().optional(),
  lenguaje: z.string().min(1, "Ingresa el tipo de lenguaje"),
  version: z.string().min(1, "Ingresa la versión"),
  idioma: z.string().min(1, "Selecciona un idioma"),
  sprint: z.string().min(1, "Selecciona un sprint"),
  puebas: z.string().min(1, "Selecciona un tipo de prueba"),
  plataforma: z.string().min(1, "Selecciona una plataforma"),
});

const Planificación = () => {
  const router = useRouter();
  const [plataformas] = useState(["Desktop", "Web", "Mobile Android", "Mobile iOS"]);
  const [sprints] = useState(["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4", "Sprint 5", "Sprint 6"]);
  const [tiposPruebas] = useState(["Manual", "Automatizada"]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      proyectoid: "",
      emison: "",
      observaciones: "",
      lenguaje: "",
      version: "",
      idioma: "",
      sprint: "",
      puebas: "",
      plataforma: "",
    },
  });

  interface Proyecto {
    idProyecto: string;
    nombre: string;
  }

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await axios.get('/api/proyectos');
        setProyectos(response.data);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
        toast({ title: "Error al cargar proyectos", variant: "destructive" });
      }
    };

    fetchProyectos();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const dataToSend = {
        proyectoid: values.proyectoid,
        emison: values.emison,
        observaciones: values.observaciones,
        lenguaje: values.lenguaje,
        version: values.version,
        idioma: values.idioma,
        sprint: values.sprint,
        puebas: values.puebas,
        plataforma: values.plataforma,
      };

      const response = await axios.post('/api/planificacion', dataToSend);
      
      // Mostrar modal
      setModalOpen(true);

      // Descargar PDF
      const pdfResponse = await axios.get(`/api/planificacion/pdf/${response.data.idplanificacion}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([pdfResponse.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `planificacion_${response.data.idplanificacion}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Mensaje de éxito
      toast({ title: "Planificación creada con éxito" });
      form.reset(); // Limpiar los campos
      router.refresh();
    } catch (error) {
      console.error("Error al crear la planificación:", error);
      toast({ title: "Error al crear la planificación", variant: "destructive" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} style={styles.form}>
        <h2>Planificación de Pruebas</h2>

        <FormField control={form.control} name="proyectoid" render={({ field }) => (
          <FormItem>
            <FormLabel>Proyecto:</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar proyecto" />
              </SelectTrigger>
              <SelectContent>
                {proyectos.map((proyecto) => (
                  <SelectItem key={proyecto.idProyecto} value={proyecto.idProyecto}>
                    {proyecto.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="emison" render={({ field }) => (
          <FormItem>
            <FormLabel>Fecha de Emisión:</FormLabel>
            <FormControl>
              <Input type="date" {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="observaciones" render={({ field }) => (
          <FormItem>
            <FormLabel>Observaciones:</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Observaciones" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="lenguaje" render={({ field }) => (
          <FormItem>
            <FormLabel>Lenguaje:</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Tipo de lenguaje" {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="version" render={({ field }) => (
          <FormItem>
            <FormLabel>Versión:</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Versión" {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="idioma" render={({ field }) => (
          <FormItem>
            <FormLabel>Idioma:</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="espanol">Español</SelectItem>
                <SelectItem value="ingles">Inglés</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="sprint" render={({ field }) => (
          <FormItem>
            <FormLabel>Sprint:</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar sprint" />
              </SelectTrigger>
              <SelectContent>
                {sprints.map((sprint) => (
                  <SelectItem key={sprint} value={sprint}>
                    {sprint}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="puebas" render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Pruebas:</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo de prueba" />
              </SelectTrigger>
              <SelectContent>
                {tiposPruebas.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="plataforma" render={({ field }) => (
          <FormItem>
            <FormLabel>Plataforma:</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar plataforma" />
              </SelectTrigger>
              <SelectContent>
                {plataformas.map((plataforma) => (
                  <SelectItem key={plataforma} value={plataforma}>
                    {plataforma}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" style={styles.button}>Guardar Planificación</Button>

     
      </form>
    </Form>
  );
};

const styles = {
  form: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  button: {
    padding: '10px 15px',
    borderRadius: '4px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Planificación;
