import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import {  NavLink } from 'react-router-dom';
import CustomTable from '../common/CustomTable';
import { Loading } from '@/page';
import { TPlaceResponse, useData } from '@/context/DataContext';


type tableProp = {
  globalFiltering: string,
  setFiltering: React.Dispatch<React.SetStateAction<string>>
}
const PlaceTable: React.FC<tableProp> = ({globalFiltering, setFiltering}) => {
 const {placesData} = useData()
 const placeDataMemoized = useMemo(() => placesData, [placesData]);
  const columns: ColumnDef<TPlaceResponse>[] = [
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
                <NavLink to={`/places/details?Iv=${place._id}`}>View details</NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },

  ];

 
  

  return (
    <>
      {
        !placesData && <Loading/>
      }
      {
        placesData && <CustomTable<TPlaceResponse> globalFiltering={globalFiltering} setFiltering={setFiltering} columns={columns} data={placeDataMemoized} />
      }
    </>
  );
};

export default PlaceTable;
