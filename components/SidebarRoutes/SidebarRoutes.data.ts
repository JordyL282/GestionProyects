
import { BarChart4, Building2, Calendar, Code, Edit, GitBranch, PersonStanding, PersonStandingIcon, Rocket } from 'lucide-react';

export const dataGeneralSidebar = [
  {
    icon: Rocket,
    label: "Dashboard",
    href: "/"
  },
  {
    //jordy lemus
    icon: Building2,
    label: "Proyectos",
    href: "/Proyects"
  },
  {
    icon: Code,
    label: "Codigo",
    href: "/Automatizacion"
  }
];

export const dataToolsSidebar = [
  {
    icon: Edit,
    label: "Planificación",
    href: "/Planificacion"
  }
];

export const dataSuportSidebar = [
  {
    icon: PersonStandingIcon,
    label: "Casos de Uso",
    href: "/casosdeuso"
  },
  {
    icon: GitBranch,
    label: "Gitea",
    href: "/Gitea"
  }
];
