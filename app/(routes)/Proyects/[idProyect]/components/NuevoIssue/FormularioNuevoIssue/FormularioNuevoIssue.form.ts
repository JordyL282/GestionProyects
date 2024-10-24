import { z } from "zod"

export const formSchema = z.object({
    nombre: z.string().min(3),
    estado: z.string().min(3),
    descripcion: z.string().min(3),
    gravedad: z.string().min(3),
    
  
  })