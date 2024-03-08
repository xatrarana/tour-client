import React, { useMemo } from 'react';
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
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
import { Link } from 'react-router-dom';

export interface Document {
  _v: number;
  _id: string;
  link: string;
  title: string;
}
const VideoTable: React.FC<any> = ({videoData}) => {
  const data = useMemo(() => videoData, []);
  const columns: ColumnDef<Document>[] = [
    {
      header: 'Title',
      accessorKey: "title"
    },
    {
      header: 'Link',
      accessorKey: 'link',
      cell: ({row}) => {
        const link = row.original
        return (
          <Link  className='cursor-pointer tooltip' data-tip="play video" target='_blank' to={link.link}>{link.link}</Link>
        )
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const link = row.original
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
                onClick={() => navigator.clipboard.writeText(link.link)}
              >
                Copy video url
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
               <span>Delete Url</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },

  ];

 
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    
  });

  return (
    <>
      <Table className='table-scroll'>
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
      <div className='mt-5 mb-3 flex items-center justify-center gap-x-5'>
        <Button variant={'outline'} onClick={() => table.setPageIndex(0)}>
          <ChevronLeft />
          <ChevronLeft />
        </Button>
        <Button variant={'outline'} disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
          <ChevronLeft />
        </Button>
        <Button variant={'outline'} disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
          <ChevronRight />
        </Button>
        <Button variant={'outline'} onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          <ChevronRight />
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default VideoTable;
