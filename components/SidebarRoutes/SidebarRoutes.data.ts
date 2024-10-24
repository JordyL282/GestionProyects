import { GitHubLogoIcon, MixIcon, PersonIcon } from '@radix-ui/react-icons'
import {
    BarChart4,
    Building2,
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    CircleHelpIcon,
    Calendar,
    SettingsIcon,
    PersonStanding,
    Rocket

} from 'lucide-react'

export const dataGeneralSidebar=[
    {
    icon: Rocket, 
    label: "Dashboard",
    href: "/"
},
{
    icon: Building2,
    label: "Proyectos",
    href: "/Proyects"
},
{
    icon: Calendar,
    label: "Calendario",
    href: "/task"
},
]


export const dataToolsSidebar=[
    {
    icon: MixIcon,
    label: "Planificacion",
    href: "/Planificacion"
}
]


export const dataSuportSidebar=[
    {
    icon: PersonStanding,
    label: "Casos de Uso",
    href: "/casosdeuso"
},
{
    icon: GitHubLogoIcon,
    label: "Gitea",
    href: "/Gitea"
}
]




