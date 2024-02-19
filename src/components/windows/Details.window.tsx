import {  MapPinned, UsersIcon } from 'lucide-react'

const DetailsWindow = () => {
  return (
    <>
    <div className='mt-2'>
        <h1 className='text-2xl font-bold'>Statistics</h1>
        <p>
  Explore the statistics below to get an overview of your platform's performance:
</p>
    </div>
   
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
      <div className="flex justify-between border border-gray-400 p-5 rounded-md">
        <div className='flex flex-col gap-5'>
            <span className='text-3xl font-bold'>
                10
            </span>
            <span className='text-gray-500'>Total counts</span>
        </div>
        <div>
        <UsersIcon size={22}  /> 
        </div>
      </div>
      <div className="flex justify-between border border-gray-400 p-5 rounded-md">
        <div className='flex flex-col gap-5'>
            <span className='text-3xl font-bold'>
                5
            </span>
            <span className='text-gray-500'>Total counts</span>
        </div>
        <div>
        <MapPinned size={22}  /> 
        </div>
      </div>
    </div>
    </>
  )
}

export default DetailsWindow