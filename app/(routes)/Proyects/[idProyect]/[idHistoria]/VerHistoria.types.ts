import { Historia } from "@prisma/client";

export type VerHistoriaProps ={
    historia : Historia;
    setOpen: (open: boolean) => void; // Asegúrate de que esta línea esté incluida

}