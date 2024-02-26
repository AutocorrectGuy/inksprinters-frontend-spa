import React from 'react'
import TailwindcssDropdown from '../../../../Components/Dropdowns/TailwindcssDropdown'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { Article } from '../../../../libraries/dexie/models/article.model'
import { db } from '../../../../libraries/dexie/db'
import { useNavigate } from 'react-router-dom'
import PATH_CONSTANTS from '../../../pathConstants'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../../libraries/toast/CustomToastContainer'

type OptionsType = 'Edit' | 'Delete' | 'Export'
const OPTIONS: OptionsType[] = ['Delete']

type Props = {
  article: Article
}

const OptionsCog = (props: Props) => {
  const navigate = useNavigate()

  const handleDelete = () => {
    if (!props.article.id) return

    const articleName = props.article.name
    db.articles.delete(props.article.id)
      .then(() => {
        navigate(PATH_CONSTANTS.STORAGE.ARTICLES.SEARCH)
        toast.success(`Article "${articleName}" deleted successfully!`, customToastProps)
      })
      .catch(err => {
        toast.error(err.message, customToastProps)
      })
  }
  const handleSelect = (item: string) => {
    const selectedItem = item as OptionsType
    switch (selectedItem) {
      case 'Delete':
        handleDelete()
        break;
      case 'Edit':
        // TODO
        break;
      case 'Export':
        // TODO
        break;
      default:
        console.error('Invalid item selected in OptionsCog component!')
        break;
    }
  }

  return (
    <div>
      <TailwindcssDropdown
        items={OPTIONS}
        onSelect={handleSelect}
        selectedItem=''
        icon={faCog}
        iconClassName='w-9 h-9'
        btnClassName='w-10 h-10 p-0 gap-0 m-0 hover:bg-transparent hover:rotate-180 duration-300'
        menuClassName='min-w-[108px] bg-base-100 text-md leading-5'
        optionClassName='hover:bg-[#242c36] px-4 py-3'
      />
    </div>
  )
}

export default OptionsCog