"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { VerHistoriaProps } from "./VerHistoria.types";
import { formSchema } from "./VerHistoria.form";
import { Colaborador } from '@prisma/client';
import { PrioridadHistoria } from '@prisma/client';
import { FormularioNuevoIssue } from "../components/NuevoIssue/FormularioNuevoIssue/FormularioNuevoIssue";
import { Separator } from "@radix-ui/react-select";
import { useParams, useRouter } from "next/navigation";


type EstadoHistoria = {
  idEstadoH: string;
  Estado: string;
};

type EstadoIssue = {
  idEstadoH: string;
  Estado: string;
};

type Issue = {
  idDefecto: string;
  nombre: string;
  descripcion: string;
  estado: string; // ID del estado del issue
};

export function VerHistoria(props: VerHistoriaProps) {
  const { historia } = props;
  const router = useRouter();
  const [estados, setEstados] = useState<EstadoHistoria[]>([]);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [prioridades, setPrioridad] = useState<PrioridadHistoria[]>([]);
  const [defectos, setDefectos] = useState<EstadoIssue[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [open, setOpen] = useState(false);
  const params = useParams<{ idProyect: string; idHistoria: string, idDefecto: string}>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: historia?.nombre || "",
      estado: historia?.estado || "",
      descripcion: historia?.descripcion || "",
      responsable: historia?.responsable || "",
      prioridad: historia?.prioridad || "",
    },
  });

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await axios.get('/api/estados');
        setEstados(response.data);
      } catch (error) {
        console.error("Error al obtener estados:", error);
        toast({ title: "Error al cargar estados", variant: "destructive" });
      }
    };
    fetchEstados();
  }, []);

  useEffect(() => {
    const fetchDefectos = async () => {
      try {
        const response = await axios.get('/api/EstadoIssue');
        setDefectos(response.data);
      } catch (error) {
        console.error("Error al obtener estados de issue:", error);
        toast({ title: "Error al cargar estados de issue", variant: "destructive" });
      }
    };
    fetchDefectos();
  }, []);

  useEffect(() => {
    const fetchColaborador = async () => {
      try {
        const response = await axios.get('/api/colaborador');
        setColaboradores(response.data);
      } catch (error) {
        console.error("Error al obtener colaboradores:", error);
        toast({ title: "Error al cargar colaboradores", variant: "destructive" });
      }
    };
    fetchColaborador();
  }, []);

  useEffect(() => {
    const fetchPrioridad = async () => {
      try {
        const response = await axios.get('/api/prioridad');
        setPrioridad(response.data);
      } catch (error) {
        console.error("Error al obtener prioridad:", error);
        toast({ title: "Error al cargar prioridad", variant: "destructive" });
      }
    };
    fetchPrioridad();
  }, []);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`/api/proyect/${params.idProyect}/historia/${historia.idHistoria}/issue`);
        setIssues(response.data);
      } catch (error) {
        console.error("Error al obtener issues:", error);
        toast({ title: "Error al cargar issues", variant: "destructive" });
      }
    };
    fetchIssues();
  }, [params.idProyect, historia.idHistoria,]);

  const updateIssueStatus = async (issueId: string, estadoId: string) => {
    try {
      console.log('ID del defecto:', issueId); // Agrega este log para verificar el ID
      console.log('Estado a actualizar:', estadoId); // Verifica también el estado
  
      await axios.patch(`/api/proyect/${params.idProyect}/historia/${params.idHistoria}/issue/${issueId}/actualizacion`, { estado: estadoId });
      toast({ title: "Estado del issue actualizado" });
      router.refresh();
    } catch (error) {
      console.error("Error al actualizar estado del issue:", error);
      toast({ title: "Error al actualizar estado", variant: "destructive" });
    }
  };
  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/proyect/${params.idProyect}/historia/${params.idHistoria}/actualizacion`, values);
      toast({ title: "Historia actualizada" });
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error("Error en el envío:", error);
      toast({ title: "Error al actualizar historia", variant: "destructive" });
    }
  };

  return (
    <div>
      <Form {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="float-right">Nueva Issue</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Crear Nueva Issue</DialogTitle>
                <DialogDescription>
                  Relaciona un nuevo issue con la historia.
                </DialogDescription>
              </DialogHeader>
              <FormularioNuevoIssue setOpen={setOpen} historiaId={historia.idHistoria} />
            </DialogContent>
          </Dialog>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-bold">Nombre de historia:</div>
            <div>{historia?.nombre}</div>

            <div className="font-bold">Estado:</div>
            <div>
            <Select onValueChange={(value) => form.setValue('estado', value)} defaultValue={historia?.estado || undefined}>
            <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {estados.map((estado) => (
                    <SelectItem key={estado.idEstadoH} value={estado.idEstadoH}>
                      {estado.Estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="font-bold">Responsable:</div>
            <div>{colaboradores.find(c => c.idcolaborador === historia?.responsable)?.nombre}</div>

            <div className="font-bold">Prioridad:</div>
            <div>{prioridades.find(p => p.idPrioridadH === historia?.prioridad)?.PrioridadH}</div>

            <div className="font-bold">Descripción:</div>
            <div>{historia?.descripcion}</div>
          </div>
          <Button type="submit">Actualizar</Button>
        </form>
      </Form>

      {/* Listar Issues Relacionados */}
      <div>
        <div className="grid items-center justify-between grid-cols-4 p-2 px-4 mt-4 mb-2 rounded-lg gap-x-3 bg-slate-400/200">
          <p>Defecto</p>
          <p>Descripción</p>
          <p>Estado</p>
        </div>
        <Separator />
        {issues.length > 0 ? (



          issues.map(issue => (
            <div key={issue.idDefecto}>
              <div className="grid grid-cols-4 gap-x-3 items-center justify-between px-4">
                <p>{issue.nombre}</p>
                <p>{issue.descripcion}</p>
                <p>
                  <Select defaultValue={issue.estado} onValueChange={(value) => updateIssueStatus(issue.idDefecto, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {defectos.map((estado) => (
                        <SelectItem key={estado.idEstadoH} value={estado.idEstadoH}>
                          {estado.Estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </p>
                <Separator />
                <p>
                <Separator />
                </p>
              </div>
              <Separator />
            </div>
            
          ))
        ) : (
          <p>No hay defectos relacionados.</p>
        )}
      </div>
    </div>
  );
}
