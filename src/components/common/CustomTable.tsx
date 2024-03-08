import React from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type TableProps<T> = {
  globalFiltering: string;
  setFiltering: React.Dispatch<React.SetStateAction<string>>;
  columns: ColumnDef<T>[];
  data: T[];
};

const CustomTable = <T,>({
  globalFiltering,
  setFiltering,
  columns,
  data,
}: TableProps<T>): JSX.Element => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: globalFiltering
    },
    onGlobalFilterChange: setFiltering
  });


  return (
    <>
      <Table className='table-scroll'>
        <TableHeader>
          {table.getHeaderGroups().map(headergroup => (
            <TableRow key={headergroup.id}>
              {headergroup.headers.map(header => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
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
  );
};

export default CustomTable;
