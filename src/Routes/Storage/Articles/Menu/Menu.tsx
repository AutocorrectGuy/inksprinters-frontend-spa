import React from 'react'
import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'
import BtnBack from '../../../../Layouts/MainLayout/components/BtnBack'
import PATH_CONSTANTS from '../../../pathConstants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faAdd, faCogs, faExpand, faFileExport, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import MenuCard, { CardProps } from '../components/MenuCard'


const CARDS_DATA: CardProps[] = [
  {
    text: 'Search',
    icon: faSearch,
    path: PATH_CONSTANTS.STORAGE.ARTICLES.SEARCH
  },
  {
    text: 'Add',
    icon: faAdd,
    path: PATH_CONSTANTS.STORAGE.ARTICLES.ADD.MENU
  },
  {
    text: 'Export',
    icon: faFileExport,
    path: PATH_CONSTANTS.STORAGE.ARTICLES.EXPORT.MENU
  },
  {
    text: 'Settings',
    icon: faCogs,
    path: PATH_CONSTANTS.STORAGE.ARTICLES.SETTINGS
  },
]

const Menu = () => {
  return (
    <MainContentContainer h1='Articles menu' linkBackTo={PATH_CONSTANTS.STORAGE.ROOT}>
      <div className='grid grid-cols-4 w-full grow gap-1 p-2'>
        {CARDS_DATA.map((prop, i) => <MenuCard key={`card-${i}`} text={prop.text} icon={prop.icon} path={prop.path} index={i} />)}
      </div>
    </MainContentContainer>
  )
}

export default Menu