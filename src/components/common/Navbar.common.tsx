import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AlignLeft, LogOut, Settings,  UserIcon } from "lucide-react";
import { useNavbar } from "@/context/ResponsiveNabBar";

const Navbar = () => {
    const navigate = useNavigate();
    const {dispatch} = useNavbar()

    const logout = async () => {
        axios.defaults.withCredentials = true;
        await axios.post("/api/v1/auth/logout").then(resp => {
          console.log(resp.data);
          localStorage.removeItem("token");
          navigate("/login")
          
        }).catch(err => console.log(err.response.data));
      }

  return (
    <header className="w-full shadow-sm">
      <div className="navbar h-6 max-w-6xl mx-auto ">
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
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
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
      </div>
    </header>
  );
};

export default Navbar;
