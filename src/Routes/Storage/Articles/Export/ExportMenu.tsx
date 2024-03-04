import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'

type Props = {}

const ExportMenu = (props: Props) => {
  return (
    <MainContentContainer h1='Articles settings'>
      <div className='flex flex-col grow w-full items-center justify-center'>Exporting to excel, json, csv // TODO</div>
    </MainContentContainer>
  )
}

export default ExportMenu

