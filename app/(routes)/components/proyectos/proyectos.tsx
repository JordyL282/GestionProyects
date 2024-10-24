import { CustomIcon } from "@/components/CustomIcon"
import { ProyectoSummaryProps } from "./proyectos.types"
import { Icon } from "lucide-react"
import { CustomTooltip } from "@/components/CustomTooltip/CustomTooltip"


export function Proyectos(props: ProyectoSummaryProps){
    const {average, icon: Icon, title, tooltipText, total}= props
    return(
        <div className="shadow-sm bg-background rounded-lg p-5 py-3 hover:shadow-lg transition">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <CustomIcon icon={Icon}/>
                    {title}
                </div>
            
            <CustomTooltip
                content={tooltipText}/>
        </div>
        </div>
    )
}