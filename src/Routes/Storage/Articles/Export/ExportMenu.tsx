import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'
import PATH_CONSTANTS from '../../../pathConstants'

type Props = {}

const ExportMenu = (props: Props) => {
  return (
    <MainContentContainer h1='Articles settings' linkBackTo={PATH_CONSTANTS.STORAGE.ARTICLES.MENU}>
      <div className='flex flex-col grow w-full items-center justify-center'>Exporting to excel, json, csv // TODO</div>
    </MainContentContainer>
  )
}

export default ExportMenu

