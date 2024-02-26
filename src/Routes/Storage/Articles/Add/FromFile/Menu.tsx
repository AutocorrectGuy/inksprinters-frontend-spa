import React from 'react'
import MainContentContainer from '../../../../../Layouts/MainLayout/components/MainLayoutContainer'
import MenuCard from '../../components/MenuCard'
import { faFile, faFileExcel, faHand, faImages } from '@fortawesome/free-solid-svg-icons'
import PATH_CONSTANTS from '../../../../pathConstants'


const Menu = () => {
  return (
    <MainContentContainer h1='Choose importing type' linkBackTo={PATH_CONSTANTS.STORAGE.ARTICLES.ADD.MENU}>
      <div className='flex grow h-full p-2'>
        <MenuCard icon={faFileExcel} path={PATH_CONSTANTS.STORAGE.ARTICLES.ADD.FROM_FILE.USING_EXCEL} text='From Excel File' />
        <MenuCard icon={faImages} path={PATH_CONSTANTS.STORAGE.ARTICLES.ADD.FROM_FILE.ADD_IMAGES} text='Import Images' />
      </div>
    </MainContentContainer>
  )
}

export default Menu