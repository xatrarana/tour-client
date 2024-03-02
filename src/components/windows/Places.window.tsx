import Drawer from '../common/Drawer.common'
import Navbar from '../common/Navbar.common'
import WorkSpace from '../Workspace.component'

import MobileMenu from '../common/Mobile.Navbar'
import { useNavbar } from '@/context/ResponsiveNabBar'


type PlacesWindowProps = {
  children: JSX.Element
}

const PlacesWindow = ({children}: PlacesWindowProps) => {
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

export default PlacesWindow