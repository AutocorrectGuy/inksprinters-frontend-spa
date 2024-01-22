import GROUND_SVG from '../../Resources/images/Pages/Welcome/inksprinters-ground.svg'

import HEXAGONS from '../../Resources/images/Pages/Welcome/hexagons.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { styles } from './config/MainLayout.config'
import { Link, Outlet, useLocation } from 'react-router-dom'
import TopNav from './components/TopNav'
import SidebarNav from './components/SidebarNav'

export default function MainLayout() {
  const { pathname } = useLocation()

  return (
    <>
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-[#131412] to-[#1c3534]">
        <img className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full" src={HEXAGONS} />
        <div
          className="absolute bottom-0 left-0 right-0 top-0 -z-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #00000025 20px, #00000025 22px, transparent 22px, transparent 42px)',
          }}
        />
        <div
          className="fixed -z-10 h-screen border-r-2 border-r-[#ffffff54]"
          style={{
            left: styles.sideNavWidth,
            top: styles.topNavHeigh,
          }}
        />

        <img src={GROUND_SVG} className="absolute bottom-0 right-0 -z-10 w-full" />

        {pathname === '/' && (
          <div className="absolute bottom-0 left-0 right-0 w-full bg-black/30 py-2 text-center text-xl font-bold text-[#cfcbc4]">
            INKSPRINTERS 2023-2024
          </div>
        )}

        <TopNav />

        {/* Sidebar nav */}
        <SidebarNav />

        {/* Main content */}
        <div
          className="flex min-h-screen flex-grow flex-col text-neutral-300"
          style={{
            marginLeft: styles.sideNavWidth,
            paddingTop: styles.topNavHeigh,
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  )
}
