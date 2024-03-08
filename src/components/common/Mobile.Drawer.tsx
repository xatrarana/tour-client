import { cn } from "@/lib/utils"
import {  Calendar,  LucideHome, MapPinned, UsersIcon, VideoIcon, X } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { useNavbar } from "@/context/ResponsiveNabBar"

const MobileDrawer = () => {
    const {dispatch} = useNavbar()
  return (
   <div className="h-full bg-white dark:bg-black dark:text-xlite w-full fixed top-0 left-0 z-20 lg:hidden flex flex-col overflow-y-auto">
            <div className=" navbar items-center justify-end ">
               <Button onClick={() => dispatch({type: "CLOSE_NAVBAR"})} className="py-3 px-2 mr-5 rounded-full">
               <X />
               </Button >
            </div>

             {/* actions buttons */}
             <div className="w-full  mt-10 flex flex-col  gap-y-8">
                <Link to={'/'} onClick={()=>dispatch({type:"CLOSE_NAVBAR"})}  >
                    <div className={cn("flex items-center justify-center gap-x-10 h-12 rounded-md hover:bg-gray-800 dark:hover:bg-stone-50 hover:text-xlite  dark:hover:text-xlack")}>
                    <LucideHome size={30}  /> 
                    <h1 className="ml-3 text-xl font-meditightacking-wider">Home</h1>
                    </div>
                </Link>
                <Link to={'/places'} onClick={()=>dispatch({type:"CLOSE_NAVBAR"})}  >
                    <div className={cn("flex items-center justify-center gap-x-10 h-12 rounded-md hover:bg-gray-800 dark:hover:bg-stone-50 hover:text-xlite dark:hover:text-xlack")}>
                    <MapPinned size={30}  /> 
                    <h1 className="ml-3 text-xl tracking-tight">Places</h1>
                    </div>
                </Link>
                <Link to={'/users'} onClick={()=>dispatch({type:"CLOSE_NAVBAR"})} >
                    <div className={cn("flex items-center justify-center gap-x-10 h-12 rounded-md hover:bg-gray-800 dark:hover:bg-stone-50 hover:text-xlite dark:hover:text-xlack")}>
                    <UsersIcon size={30}  /> 
                    <h1 className="ml-3 text-xl tracking-tight">Users</h1>
                    </div>
                </Link>
                <Link to={'/events'} onClick={()=>dispatch({type:"CLOSE_NAVBAR"})} >
                    <div className={cn("flex items-center justify-center gap-x-10 h-12 rounded-md hover:bg-gray-800 dark:hover:bg-stone-50 hover:text-xlite dark:hover:text-xlack")}>
                    <Calendar size={30}  /> 
                    <h1 className="ml-3 text-xl tracking-tight">Events</h1>
                    </div>
                </Link>
                <Link to={'/videos'} onClick={()=>dispatch({type:"CLOSE_NAVBAR"})} >
                    <div className={cn("flex items-center justify-center gap-x-10 h-12 rounded-md hover:bg-gray-800 dark:hover:bg-stone-50 hover:text-xlite dark:hover:text-xlack")}>
                    <VideoIcon size={30}  /> 
                    <h1 className="ml-3 text-xl tracking-tight">Videos</h1>
                    </div>
                </Link>
             </div>
            
   </div>

  )
}

export default MobileDrawer