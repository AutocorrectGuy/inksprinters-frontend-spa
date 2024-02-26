import React from 'react'
import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'
import PATH_CONSTANTS from '../../../pathConstants'
import { db } from '../../../../libraries/dexie/db'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../../libraries/toast/CustomToastContainer'

type Props = {}

const Settings = (props: Props) => {
  const navigate = useNavigate()

  const handeDeletAll = () => {
    db.articles.clear()
      .then(() => {
        navigate(PATH_CONSTANTS.STORAGE.ARTICLES.MENU)
        toast.success('All entries from articles deleted successfully!', customToastProps)
      })
      .catch((err) => {
        toast.error(err.message, customToastProps)
      })
  }

  return (
    <MainContentContainer h1='Articles settings' linkBackTo={PATH_CONSTANTS.STORAGE.ARTICLES.MENU}>
      <div className='flex flex-col grow w-full items-center justify-center'>
        <button className='bg-red-600 text-white text-2xl px-4 py-2 rounded-lg animation-btn' onClick={handeDeletAll}>DELETE ALL ARTICLES</button>
      </div>
    </MainContentContainer>
  )
}

export default Settings