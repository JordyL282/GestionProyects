"use client"
import { ArrowUpDown, Eye, MoreHorizontal, Pencil } from "lucide-react"
import { Proyects } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import Image from "next/image"
export const columns: ColumnDef<Proyects>[] = [
  {
      accessorKey: "nombre",
      header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Proyecto 
              <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
      )
  },
//  {
  //    accessorKey: "tipoproyecto.TIpoProyecto", // Asegúrate de que esto coincide con lo que devuelve la API
    //  header: "Tipo",
  //},
  //{
    //  accessorKey: "colaborador.nombre", // Asegúrate de que esto coincide con lo que devuelve la API
      //header: "Responsable",
  //},
  {
      accessorKey: "Descripcion",
      header: "Descripcion",
  },
  {
      accessorKey: "Duracion",
      header: "Duracion",
  },
  {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
          const { idProyecto } = row.original;
          return (
              <DropdownMenu>
                  <DropdownMenuTrigger>
                      <Button variant="ghost" className="w-8 h-4 p-0">
                          <span className="sr-only">Menu</span>
                          <MoreHorizontal className="w-4 h-4" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      <Link href={`/Proyects/${idProyecto}`}>
                          <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver
                          </DropdownMenuItem>
                      </Link>
                  </DropdownMenuContent>
              </DropdownMenu>
          );
      }
  },
];
