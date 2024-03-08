import React, { useEffect, useState } from 'react';
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, getPaginationRowModel,getFilteredRowModel } from '@tanstack/react-table';
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
import { useQuery } from '@tanstack/react-query';
import { fetchPlaces } from '@/lib/services';
import TableSkeleton from './Table.skeleton';

type TPlace = {
  points: {
    coordinates: [number, number];
    type: string;
  };
  _id: string;
  title: string;
  slug_name: string;
  description: string;
  location: string;
  wardno: string;
  category: string;
  thumbnail: string;
  images: string[];
  totalRating: number;
  rating: {
    userId: string;
    userRating: number;
    _id: string;
  }[];
  __v: number;
};

type tableProp = {
  globalFiltering: string,
  setFiltering: React.Dispatch<React.SetStateAction<string>>
}
const PlaceTable: React.FC<tableProp> = ({globalFiltering, setFiltering}) => {
  const query = useQuery({ queryKey: ['places'], queryFn: fetchPlaces })
  const [placesData, setPlaceData] = useState([])
  useEffect(() => {
    if(!query.isLoading){
      setPlaceData(query.data.data)
    }
  },[query.isLoading])
  const columns: ColumnDef<TPlace>[] = [
    {
      header: 'Title',
      accessorKey: "title"
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
              <DropdownMenuItem>
                <Link to={`/places/details?Iv=${place._id}`}>View details</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },

  ];

 
  const table = useReactTable({
    columns,
    data: placesData, // data validation
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: globalFiltering,
    },
    onGlobalFilterChange: setFiltering
  });

  return (
    <>
    {query.isLoading && <TableSkeleton table={table}/>}
      {
        !query.isLoading && query.data.data && (
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
      <div className='mt-3 mb-3 flex items-center justify-center gap-x-5'>
        <Button variant={'ghost'} onClick={() => table.setPageIndex(0)}>
          <ChevronLeft size={15} />
          <ChevronLeft size={15} />
        </Button>
        <Button variant={'ghost'} disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
          <ChevronLeft  />
        </Button>
        <Button variant={'ghost'} disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
          <ChevronRight />
        </Button>
        <Button variant={'ghost'} onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          <ChevronRight size={15} />
          <ChevronRight size={15} />
        </Button>
      </div>
          </>
        )
      }
    </>
  );
};

export default PlaceTable;
