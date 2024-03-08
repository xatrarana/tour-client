import { ColumnDef } from '@tanstack/react-table';
import CustomTable from '../common/CustomTable';
import { useEffect, useState } from 'react';
import instance from '@/lib/axiosConfig';
import { Loading } from "@/page";
import UserActionButtons from "./Users.ActionButtons";

interface UserResponse {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullname: string;
}

const UsersTableList = () => {
    const [globalFiltering, setFiltering] = useState('')
    const [UsersData, setUsersData] = useState<UserResponse[] | null>(null)
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
  }, [UsersData])
    const columns: ColumnDef<UserResponse>[] = [
       
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
               <div className="flex gap-x-1">
                  <UserActionButtons action={'DELETE'} userId={user._id} />
               </div>
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
        UsersData && <CustomTable<UserResponse>  globalFiltering={globalFiltering} setFiltering={setFiltering} columns={columns} data={UsersData} />
    }
   </>
  )
}

export default UsersTableList