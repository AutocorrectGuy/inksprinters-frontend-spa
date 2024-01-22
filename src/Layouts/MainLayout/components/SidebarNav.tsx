import React from 'react'
import { styles } from '../config/MainLayout.config'
import SCRUMBLED_PAPER_JPG from '../../../Resources/images/Pages/Welcome/scrumbled-paper.png'
import SidebarNavButton from './SidebarNavButton'
import { siderBarButtons } from '../config/SidebarNav.config'
type Props = {}

export const sidebarStyleProps = {
  WebkitBoxShadow: 'inset 0 0 18px 8px rgba(0, 0, 0, 0.7)', // For Safari and Chrome
  MozBoxShadow: 'inset 0 0 18px 8px rgba(0, 0, 0, 0.7)', // For Firefox
  boxShadow: 'inset 0 0 18px 8px rgba(0, 0, 0, 0.7)', // Standard syntax
  width: styles.sidebarWidth,
  backgroundImage: `url(${SCRUMBLED_PAPER_JPG})`,
  backgroundRepeat: 'repeat-y',
  backgroundSize: '100% auto',
}
const SidebarNav = (props: Props) => {
  return (
    <aside
      className="fixed z-40 h-screen pt-12"
      style={{
        width: styles.sideNavWidth,
        top: styles.topNavHeigh,
      }}
    >
      <div className="mt-16 rounded-r-[24px] outline outline-2 outline-[#cfcbc4d5]" style={{ ...sidebarStyleProps }}>
        <ul className="text-2xl font-normal text-[#cfcbc4]">
          {siderBarButtons.map((btn, i) => (
            <SidebarNavButton
              key={`sidebar-main-btn-${i}`}
              icon={btn.icon}
              label={btn.label}
              href={btn.href}
              children={btn.children}
              isFirstChild={i === 0}
              isLastChild={i === siderBarButtons.length - 1}
            />
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default SidebarNav
