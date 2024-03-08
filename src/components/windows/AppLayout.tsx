import { useNavbar } from '@/context/ResponsiveNabBar'
import WorkSpace from '../Workspace.component'
import Drawer from '../common/Drawer.common'
import Navbar from '../common/Navbar.common'
import MobileDrawer from '../common/Mobile.Drawer'

type AppLayoutProps = {
    children: React.ReactNode
}
const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
  const {state} = useNavbar()
  return (
    <main className='h-screen grid-container'>
        <section className='sidebar-section'>
            <Drawer/>
        </section>
        <section className='workspace-section '>
        <Navbar/>
            <WorkSpace>
               {children}
            </WorkSpace>
        </section>
        {state.isNavbarOpen && <MobileDrawer/>}
    </main>
  )
}

export default AppLayout