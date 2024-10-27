"use client"
import { Separator } from "@/components/ui/separator"
import { SidebarItem } from "../SidebarItems"
import { dataGeneralSidebar, dataSuportSidebar, dataToolsSidebar } from "./SidebarRoutes.data"
import { Button } from "@/components/ui/button"
export function SidebarRoutes(){
    return(
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="p-2 md:p-6">
                    <p className="text-slate-500 mb-2">General</p>
                    {dataGeneralSidebar.map((item)=>(
                        <SidebarItem key={item.label} item={item}/>
                    ))}
                    
                </div>
                <Separator/>
                <div className="p-2 md:p-6">
                    <p className="text-slate-500 mb-2">Reportes</p>
                    {dataToolsSidebar.map((item)=>(
                        <SidebarItem key={item.label} item={item}/>
                    ))}
                </div>
                <Separator/>
                <div className="p-2 md:p-6">
                    <p className="text-slate-500 mb-2">Otros</p>
                    {dataSuportSidebar.map((item)=>(
                        <SidebarItem key={item.label} item={item}/>
                    ))}
                
                </div>
            </div>
            <div>
                <div className="text-center p-6">
                    <button className="w-full">
                        Actualizar
                    </button>
                </div>
            </div>
            <Separator/>
            <footer className="mt-3 p-3 text-center">
                    Proyecto Seminario 2024 - Jordy Lemus
            </footer>
        </div>
    )
}