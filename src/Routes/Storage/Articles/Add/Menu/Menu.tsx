import React from 'react'
import MainContentContainer from '../../../../../Layouts/MainLayout/components/MainLayoutContainer'
import MenuCard from '../../components/MenuCard'
import { faFile, faHammer } from '@fortawesome/free-solid-svg-icons'
import PATH_CONSTANTS from '../../../../pathConstants'

const Menu = () => {
  return (
    <MainContentContainer h1='Add Article by'>
      <div className='flex grow h-full p-2'>
        <MenuCard icon={faHammer} path={PATH_CONSTANTS.STORAGE.ARTICLES.ADD.MANUALLY} text='Manually' />
        <MenuCard icon={faFile} path={PATH_CONSTANTS.STORAGE.ARTICLES.ADD.FROM_FILE.MENU} text='Import From File' />
      </div>
    </MainContentContainer>
  )
}

export default Menu