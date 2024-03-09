import { cn } from "@/lib/utils"
import {  Calendar,  LucideHome, MapPinned, UsersIcon, VideoIcon, X } from "lucide-react"
import { NavLink } from "react-router-dom"
import { Button } from "../ui/button"
import { useNavbar } from "@/context/ResponsiveNabBar"

const isActiveConfig = ({isActive}: any) =>
[
    isActive ? 'dark:bg-stone-50 bg-gray-800 text-white dark:text-black font-bold rounded-md' : ''
].join(' ')

const navLinks = [
    { path: '/', icon: <LucideHome size={30} />, name: 'Home' },
    { path: '/places', icon: <MapPinned size={30} />, name: 'Places' },
    { path: '/users', icon: <UsersIcon size={30} />, name: 'Users' },
    { path: '/events', icon: <Calendar size={30} />, name: 'Events' },
    { path: '/videos', icon: <VideoIcon size={30} />, name: 'Videos' },
  ];

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
             <div className="w-full  mt-10 flex flex-col  gap-y-8 px-2">
                {navLinks.map((link, index) => (
          <NavLink className={isActiveConfig} to={link.path} key={index} onClick={() => dispatch({ type: 'CLOSE_NAVBAR' })}>
            <div className={cn("flex items-center justify-center gap-x-10 h-12 rounded-md hover:bg-gray-800 dark:hover:bg-stone-50 hover:text-xlite dark:hover:text-xlack")}>
              {link.icon}
              <h1 className="ml-3 text-xl font-meditightacking-wider">{link.name}</h1>
            </div>
          </NavLink>
        ))}
             </div>
            
   </div>

  )
}

export default MobileDrawer