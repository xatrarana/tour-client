import { useMemo, useState } from 'react';
import { ColumnDef} from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import {  MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomTable from '../common/CustomTable';
import { TVideoResponse, useData } from '@/context/DataContext';
import { Loading } from '@/page';

const VideoTable = () => {
  const [globalFiltering, setFiltering] = useState('')
  const {videosData} = useData()
  const videosDataMemoized = useMemo(() => videosData, [videosData]);
  const columns: ColumnDef<TVideoResponse>[] = [
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

  return (
   <>
    {
      !videosData && <Loading/>
    }
    {
      videosData &&  <CustomTable<TVideoResponse> setFiltering={setFiltering} globalFiltering={globalFiltering} columns={columns} data={videosDataMemoized}/>
    }
   </>
  );
};

export default VideoTable;
