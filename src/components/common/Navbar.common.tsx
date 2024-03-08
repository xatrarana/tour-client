import { Link, useNavigate } from "react-router-dom";
import { AlignLeft, LogOut, Settings,  UserIcon } from "lucide-react";
import { useNavbar } from "@/context/ResponsiveNabBar"; 
import axios from "@/lib/axiosConfig";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";

const Navbar = () => {
  const navigate = useNavigate()
    const {dispatch} = useNavbar()
    const {state : {
      user
    },handleLogout} = useAuth()
    const {toast} = useToast()
    const logout = async () => {
      try {
        const response = await axios.post("/auth/logout");
        if(response.data.success && response.data.statusCode){
          toast({ variant: 'success', title: response.data.message });
          handleLogout();
          navigate("/auth/login");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({ variant: 'destructive', title: error.response?.data.message });
      } else {
          toast({ variant: 'destructive', title:' An unexpected error occurred' });
      }
      }
    };
    

  return (
      <header className="navbar h-6 max-w-6xl mx-auto ">
        <div className="flex-1">
          <button className="btn btn-ghost md:hidden "
          onClick={()=>dispatch({type:"OPEN_NAVBAR"})}
          >
          <AlignLeft size={28}/>
          </button>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full bg-gray-200 dark:text-black">
                {!user?.avatar && <div className="text-xl font-semibold py-1.5">
                  <span>{user?.fullname.split(' ')[0].charAt(0).toUpperCase()}</span>
                  <span>{user?.fullname.split(' ')[1].charAt(0).toUpperCase()}</span>
                  </div>}
                {
                  user?.avatar && <img
                  alt={user?.username}
                  src={user?.avatar}
                />
                }
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 gap-y-1"
            >
              <li>
                <Link to={'/profile/information'} className="items-center">
                  <UserIcon size={15}/>
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={'/settings'} className="items-center">
              <Settings size={15} />
                  Settings</Link>
              </li>
              <li>
                <button onClick={logout} className="items-center">
                <LogOut size={15} />
                  Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </header>
  );
};

export default Navbar;
