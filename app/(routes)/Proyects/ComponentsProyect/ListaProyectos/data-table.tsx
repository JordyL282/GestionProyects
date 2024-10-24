"use client"
import React from "react"
import{
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table"
import {
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Table,
    TableBody
  } from "@/components/ui/table"

  import { Input } from "@/components/ui/input" 
  import { Button } from "@/components/ui/button"
import { eventNames } from "process"

  interface DataTableProps<TData, TValue>{
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
  }

  export function DataTable<TData, TValue>({
    columns,
    data
  }: DataTableProps<TData, TValue>){
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [isMouted, setIsMounted] = React.useState(false)
    
    React.useEffect(()=>{
        setIsMounted(true)
    }, [])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(), 
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange:  setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state:{
            sorting,
            columnFilters
        }
      })

    if(!isMouted){
        return null
    }

    return(
        <div className="p-4 bg-background shadow-md rounded-lg mt-4">
            <div className="flex items-center mb-2">
                <Input 
                placeholder="Ingresa nombre del proyecto"
                value={(table.getColumn("nombre")?.getFilterValue() as string)?? ""}
                onChange={(event)=> table.getColumn("nombre")?.setFilterValue(event.target.value)}
                />
            </div>
            <div className="border rounded-md">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup)=>(
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header)=>{
                                return(
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.
                                            columnDef.header, header.getContext()
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ?(
                        table.getRowModel().rows.map((row)=>(
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell)=>(
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ):(
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Sin Resultados
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm" onClick={()=> table.previousPage()} disabled = {!table.getCanPreviousPage()}>
                Anterior
            </Button>
            <Button variant="outline" size="sm" onClick={()=> table.nextPage()} disabled = {!table.getCanNextPage()}>
                Siguiente
            </Button>
            
        </div>
        </div>
        
        

    )
    
  }