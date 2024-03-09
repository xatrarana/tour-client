import { ColumnDef } from '@tanstack/react-table';
import CustomTable from '../common/CustomTable';
import {  useMemo, useState } from 'react';
import { Loading } from "@/page";
import AlertDialogContainer from '../places/confirm.Dialog';
import { TUserResponse, useData } from '@/context/DataContext';



const UsersTableList = () => {
    const [globalFiltering, setFiltering] = useState('')
    const {userData} = useData()
    const userDataMemoized = useMemo(() => userData, [userData]);
    const columns: ColumnDef<TUserResponse>[] = [
       
        {
          id:"sample",
          cell: ({row}) => {
            const user = row.original
            return (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center dark:text-black text-xl font-semibold py-1.5">
                  {user.avatar ? (
                    <img className='rounded-full' src={user.avatar} alt={user.fullname}/> 
                  )
                    :
                    (
                      <>
                      <span>{user?.fullname.split(' ')[0].charAt(0).toUpperCase()}</span>
                  <span>{user?.fullname.split(' ')[1].charAt(0).toUpperCase()}</span>
                      </>
                    
                  )}
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
          id: "sanple",
          cell: ({ row }) => {
            const user = row.original
            return (
                 <>
                 {!user.provider &&  <AlertDialogContainer path={`/users/delete/ad/${user._id}`} redirect="/users" />}
                 </>
            )
          },
        },
    
      ];
  return (
   <>
   {
    !userData && <Loading/>
   }
    {
        userData && <CustomTable<TUserResponse>  globalFiltering={globalFiltering} setFiltering={setFiltering} columns={columns} data={userDataMemoized} />
    }
   </>
  )
}

export default UsersTableList