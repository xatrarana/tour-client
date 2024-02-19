import DashboardWindow from "@/components/windows/Dashboard.window";
import { useEffect } from "react";


const DashboardPage = () => {

  // const {isLoggedIn} = useAuthState();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if(!isLoggedIn){
  //     navigate('/login')
  //   }
  // },[isLoggedIn])
  useEffect(()=>{
    document.title = "Dashboard"
  },[])
  return (
    <DashboardWindow/>
  )
}

export default DashboardPage