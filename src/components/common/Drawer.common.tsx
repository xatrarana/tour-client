import { cn } from "@/lib/utils"
import {  Calendar, LucideHome, MapPinned, UsersIcon, VideoIcon } from "lucide-react"
import {  NavLink } from "react-router-dom"

const Drawer = () => {
  return (
   <div className="h-screen hidden md:flex flex-col border-r-[0.5px] dark:border-r-[0] rounded-br-[5rem] dark:border-gray-0 border-gray-200">
            <div className=" navbar items-center justify-center">
                <h1 className="text-2xl font-bold tracking-wider font-sans text-center">Dashboard</h1>
            </div>

             {/* actions buttons */}
             <div className="w-ful px-2 mt-2 flex flex-col gap-y-3">
                <NavLink to={'/'}  >
                    <div className={cn("flex items-center h-12 rounded-md hover:bg-gray-800 dark:hover:bg-stone-50 hover:text-white  dark:hover:text-black")}>
                    <LucideHome size={22} className="ml-5" /> 
                    <h1 className="ml-3 text-md font-meditightacking-wider">Home</h1>
                    </div>
                </NavLink>
                <NavLink to={'/places'}  >
                    <div className={cn("flex items-center h-12 rounded-md hover:bg-gray-800 dark:hover:bg-stone-50 hover:text-white dark:hover:text-black")}>
                    <MapPinned size={22} className="ml-5" /> 
                    <h1 className="ml-3 text-md tracking-tight">Places</h1>
                    </div>
                </NavLink>
                <NavLink to={'/users'}  >
                    <div className={cn("flex items-center h-12 rounded-md hover:bg-gray-800 dark:hover:bg-stone-50 hover:text-white dark:hover:text-black")}>
                    <UsersIcon size={22} className="ml-5" /> 
                    <h1 className="ml-3 text-md tracking-tight">Users</h1>
                    </div>
                </NavLink>
                <NavLink to={'/events'}  >
                    <div className={cn("flex items-center h-12 rounded-md hover:bg-gray-800 dark:hover:bg-stone-50 hover:text-white dark:hover:text-black")}>
                    <Calendar size={22} className="ml-5" /> 
                    <h1 className="ml-3 text-md tracking-tight">Events</h1>
                    </div>
                </NavLink>
                <NavLink to={'/videos'}  >
                    <div className={cn("flex items-center h-12 rounded-md hover:bg-gray-800 dark:hover:bg-stone-50 hover:text-white dark:hover:text-black")}>
                    <VideoIcon size={22} className="ml-5" /> 
                    <h1 className="ml-3 text-md tracking-tight">Videos</h1>
                    </div>
                </NavLink>
             </div>
   </div>

  )
}

export default Drawer