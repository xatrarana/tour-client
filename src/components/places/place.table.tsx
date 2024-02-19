import React, { useMemo } from 'react';
import { ColumnDef, useReactTable,getCoreRowModel,flexRender,getPaginationRowModel } from '@tanstack/react-table';
import  { TPlace, places } from '../../mockdata';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
  
const PlaceTable: React.FC = () => {
  const data = useMemo(() => places, []);
  const columns:ColumnDef<TPlace>[] = [
    {
      header: 'Title',
      accessorKey:"title"
    },
    {
      header: 'Ward No',
      accessorKey: 'wardno',
    },
    {
      header: 'Location',
      accessorKey: 'location',
    },
    {
      header: 'Category',
      accessorKey: 'category',
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const place = row.original
            console.log(place)
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(place._id)}
                >
                  Copy place ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    
  ];

  const table = useReactTable({ 
    columns, 
    data, 
    getCoreRowModel:getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
 });

  return (
<>
<Table>
    <TableHeader>
      
      {
        table.getHeaderGroups().map((headergroup) => (
            <TableRow key={headergroup.id}>
                {
                    headergroup.headers.map((header) => (
                        <TableHead key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                    ))
                }
            </TableRow>
        ))
      }
    </TableHeader>
    <TableBody>
      {
        table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
                {
                    row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    ))
                }
            </TableRow>
        ))
      }
    </TableBody>
  </Table> 
  <div className='mt-3 mb-3 flex items-center justify-center gap-x-5'>
  <Button variant={'outline'} onClick={() => table.setPageIndex(0)}>
      <ChevronLeft/>
      <ChevronLeft/>
  </Button>
  <Button variant={'outline'} disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
      <ChevronLeft/>
  </Button>
  <Button variant={'outline'} disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
      <ChevronRight/>
  </Button>
  <Button variant={'outline'} onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
      <ChevronRight/>
      <ChevronRight/>
  </Button>
  </div>
</>
  );
};

export default PlaceTable;
