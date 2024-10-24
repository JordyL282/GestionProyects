import React from "react";

export default function LayoutAuth({children}: {children: React.ReactNode}){
    return(
        <div className="flex flex-col justify-center h-full items-center">
            <p>Proyecto Seminario</p>
            <h1 className="text-3xl my-2">
                Gestion de proyectos de desarrollo
            </h1>
      
            {children}
        </div>
    )
}