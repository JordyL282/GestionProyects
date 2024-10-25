import { GitHubLogoIcon, MixIcon } from '@radix-ui/react-icons';
import { BarChart4, Building2, Calendar, PersonStanding, Rocket } from 'lucide-react';

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
    icon: Calendar,
    label: "Calendario",
    href: "/task"
  }
];

export const dataToolsSidebar = [
  {
    icon: Rocket,
    label: "Planificación",
    href: "/Planificacion"
  }
];

export const dataSuportSidebar = [
  {
    icon: Rocket,
    label: "Casos de Uso",
    href: "/casosdeuso"
  },
  {
    icon: Rocket,
    label: "Gitea",
    href: "/Gitea"
  }
];
