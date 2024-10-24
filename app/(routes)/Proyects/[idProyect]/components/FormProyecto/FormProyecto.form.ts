import { z } from "zod"

export const formSchema = z.object({
    nombre: z.string().min(3),
    Descripcion: z.string().min(3),
    Responsable: z.string().min(3),
    Tipo: z.string().min(3),
    Duracion: z.string().min(1),
  })
  