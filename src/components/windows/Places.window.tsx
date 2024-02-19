import Drawer from '../common/Drawer.common'
import Navbar from '../common/Navbar.common'
import WorkSpace from '../Workspace.component'

import MobileMenu from '../common/Mobile.Navbar'
import { useNavbar } from '@/context/ResponsiveNabBar'
import PlacesComponent from '../places/place.component'


const PlacesWindow = () => {
  const {state} = useNavbar()
  return (
    <main className='h-screen grid-container'>
        <section className='sidebar-section'>
            <Drawer/>
        </section>
        <section className='workspace-section'>
            <Navbar/>
            <WorkSpace>
              <PlacesComponent/>
            </WorkSpace>
        </section>
        {state.isNavbarOpen && <MobileMenu/>}
    </main>
  )
}

export default PlacesWindow