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
import { ColumnDef } from '@tanstack/react-table';
import { TUser } from './usersignupform';
import CustomTable from '../common/CustomTable';
import { useEffect, useState } from 'react';
import instance from '@/lib/axiosConfig';
import { Loading } from "@/page";

const UsersTableList = () => {
    const [globalFiltering, setFiltering] = useState('')
    const [UsersData, setUsersData] = useState<TUser[] | null>(null)
  const getVideoUrlsData = async () => {
    try {
      const response = await instance.get('/users', {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '5bdb68c9efa67cf69f3425f908'
        }
      })
      setUsersData(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getVideoUrlsData()
  }, [])
    const columns: ColumnDef<TUser>[] = [
       
        {
          id:"sample",
          cell: ({row}) => {
            const user = row.original
            return (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center dark:text-black text-xl font-semibold py-1.5">
                  <span>{user?.fullname.split(' ')[0].charAt(0).toUpperCase()}</span>
                  <span>{user?.fullname.split(' ')[1].charAt(0).toUpperCase()}</span>
                  </div>
            )
          }
        },
        {
          header: 'Name',
          accessorKey: "fullName",
          cell: ({row}) => {
            return row.original?.fullname.toLocaleUpperCase()
          }
        },
        {
          header: 'Email',
          accessorKey: 'email',
        },
        {
          header: 'Role',
          accessorKey: 'role',
          cell: ({row}) => {
            return row.original.role.toLocaleUpperCase()
          }
        },
        {
          id: "actions",
          cell: ({ row }) => {
            const user = row.original
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
                    onClick={() => navigator.clipboard.writeText(user.email)}
                  >
                    Copy email ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                   <span>Update user</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                   <span>Delete user</span>

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
    !UsersData && <Loading/>
   }
    {
        UsersData && <CustomTable<TUser>  globalFiltering={globalFiltering} setFiltering={setFiltering} columns={columns} data={UsersData} />
    }
   </>
  )
}

export default UsersTableList