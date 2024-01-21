import LOGO_WITH_TEXT from '../../../Resources/images/Pages/Welcome/logo-with-text.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import { styles } from '../config/MainLayout.config'

const TopNav = () => {
  const { pathname } = useLocation()

  return (
    <div
      className="fixed left-0 right-0 top-0 z-10 flex bg-[#8dfffb] bg-opacity-[6%] text-xl"
      style={{ height: styles.topNavHeigh }}
    >
      <div className="flex items-center pl-2" style={{ width: styles.sideNavWidth }}>
        <img src={LOGO_WITH_TEXT} style={{ width: styles.sidebarWidth - 20 }} />
      </div>

      <div className="flex h-full flex-grow">
        <div className="grow">
          {pathname !== '/' && (
            <div className="flex h-full grow items-center">
              <FontAwesomeIcon icon={faSearch} className="ml-8 mr-2 h-8 w-8 -scale-x-100 text-[#a19e97]" />
              <input
                type="text"
                placeholder="Search for tools or articles"
                className={`input w-full max-w-[500px] rounded-full bg-[#0a1821] px-6 text-[1.375rem] text-[#C7C3BB] placeholder:font-medium placeholder:italic 
            placeholder:text-[#717274] focus:border-transparent focus:ring-0`}
              />
            </div>
          )}
        </div>
        <div className="flex h-full items-center px-6">
          <Link to={'/'} className="ml-4 font-semibold text-neutral-400 hover:text-white focus:rounded-sm">
            Log in
          </Link>

          <Link
            to={'/'}
            className="ml-4 font-semibold text-neutral-400 hover:text-white focus:rounded-sm"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopNav
