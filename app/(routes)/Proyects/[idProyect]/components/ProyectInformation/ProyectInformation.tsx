

import { FormProyect } from "../FormProyecto";
import { ProyectInformationProps } from "./ProyectsInformation.types";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { NuevaHistoria } from "../NuevaHistoria/NuevaHistoria";
import { ListaHistorias } from "../ListaHistorias";
export function ProyectInformation(props: ProyectInformationProps) {
    const { proyects } = props;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
            <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
                <FormProyect proyects={proyects} />
            </div>
            <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
                <div className="flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-x-2">
                        <Bookmark className="h-5 w-5" />
                        Historias
                    </div>
                    <div>
                        <NuevaHistoria />
                    </div>
                </div>
                <ListaHistorias proyects={proyects}/> 
            </div>
        </div>
    );
}
