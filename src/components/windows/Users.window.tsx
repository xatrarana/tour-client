import WorkSpace from "@/components/Workspace.component"
import Drawer from "@/components/common/Drawer.common"
import MobileMenu from "@/components/common/Mobile.Navbar"
import Navbar from "@/components/common/Navbar.common"
import { useNavbar } from "@/context/ResponsiveNabBar"

type UsersWindowProps = {
    children: JSX.Element
  }
  
  const UsersWindow = ({children}: UsersWindowProps) => {
    const {state} = useNavbar()
    return (
      <main className='h-screen grid-container'>
          <section className='sidebar-section'>
              <Drawer/>
          </section>
          <section className='workspace-section'>
              <Navbar/>
              <WorkSpace>
                {children}
              </WorkSpace>
          </section>
          {state.isNavbarOpen && <MobileMenu/>}
      </main>
    )
  }
  
  export default UsersWindow