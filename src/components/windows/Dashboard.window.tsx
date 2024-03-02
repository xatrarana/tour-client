import { useNavbar } from '@/context/ResponsiveNabBar'
import UserGreeting from '../UserGreeting.component'
import WorkSpace from '../Workspace.component'
import Drawer from '../common/Drawer.common'
import MobileMenu from '../common/Mobile.Navbar'
import Navbar from '../common/Navbar.common'
import DetailsWindow from './Details.window'
import FeaturedWindow from './Featured.window'
const DashboardWindow = () => {
  const {state} = useNavbar()
  return (
    <main className='h-screen grid-container'>
        <section className='sidebar-section'>
            <Drawer/>
        </section>
        <section className='workspace-section '>
            <Navbar/>
            <WorkSpace>
                <UserGreeting/>
                <FeaturedWindow/>
                <DetailsWindow/>
            </WorkSpace>
        </section>
        {state.isNavbarOpen && <MobileMenu/>}
    </main>
  )
}

export default DashboardWindow