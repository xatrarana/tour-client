
import Navbar from "../common/Navbar.common"
import ProfileComponent from "../profile/Profile.component"
import Drawer from "../common/Drawer.common"
import MobileMenu from "../common/Mobile.Navbar"
import { useNavbar } from "@/context/ResponsiveNabBar"

type ProfileWindowProps = {
  children: React.ReactNode
}
const ProfileWindow = ({children}:ProfileWindowProps) => {
  const {state} = useNavbar()
  return (
    <main className="h-screen grid-container">
      <section className="sidebar-section">
        {/* <MobileDrawer/> */}
        <Drawer/>
      </section>
       <section className="workspace-section">
       <ProfileComponent>
            <Navbar/>
            <div className="p-3 md:p-5 h-screen">
              <h1 className="text-3xl font-bold">My Profile</h1> 
            {children}
            </div>
        </ProfileComponent>
       </section>
       {state.isNavbarOpen && <MobileMenu/>}
    </main>
  )
}

export default ProfileWindow