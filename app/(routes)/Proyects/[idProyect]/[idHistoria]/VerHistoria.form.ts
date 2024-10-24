import { z } from "zod"

export const formSchema = z.object({
    nombre: z.string().min(3),
    estado: z.string().min(3),
    descripcion: z.string().min(3),
    responsable: z.string().min(1),
    prioridad: z.string().min(3),
    
  
  })