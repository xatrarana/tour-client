import { cn } from "@/lib/utils"
import {  Calendar, LucideHome, MapPinned, UsersIcon, VideoIcon } from "lucide-react"
import {  NavLink } from "react-router-dom"

const isActiveConfig = ({isActive}: any) =>
[
    isActive ? 'dark:bg-stone-50 bg-gray-800 text-white dark:text-black font-bold rounded-md' : ''
].join(' ')
const navLinks = [
    { path: '/', icon: <LucideHome size={22} />, name: 'Home' },
    { path: '/places', icon: <MapPinned size={22} />, name: 'Places' },
    { path: '/users', icon: <UsersIcon size={22} />, name: 'Users' },
    { path: '/events', icon: <Calendar size={22} />, name: 'Events' },
    { path: '/videos', icon: <VideoIcon size={22} />, name: 'Videos' },
];
const Drawer = () => {
  return (
   <div className="h-screen hidden md:flex flex-col border-r-[0.5px] dark:border-r-[0] rounded-br-[5rem] dark:border-gray-0 border-gray-200">
            <div className=" navbar items-center justify-center">
                <h1 className="text-2xl font-bold tracking-wider font-sans text-center">Dashboard</h1>
            </div>

             {/* actions buttons */}
             <div className="w-ful px-2 mt-2 flex flex-col gap-y-5 ">
                {navLinks.map(({ path, icon, name }) => (
                <NavLink key={path} to={path} className={isActiveConfig}>
                    <div className={cn("flex items-center gap-x-3 pl-6 h-12 rounded-md hover:bg-gray-800 dark:hover:bg-stone-50 hover:text-white dark:hover:text-black")}>
                        {icon}
                        <h1 className="ml-5 text-md tracking-tight">{name}</h1>
                    </div>
                </NavLink>
            ))}
             </div>
   </div>

  )
}

export default Drawer