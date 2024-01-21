import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { getMaxContainerHeight, styles } from '../config/MainLayout.config'
import CustomToastContainer from '../../../Components/Toast/CustomToastContainer'
import Breadcrumbs from './BreadCrumbs'
import SCRUMBLED_PAPER_JPG from '../../../Resources/images/Pages/Welcome/scrumbled-paper.png'

export type additionalStepsType = {
  index: number
  h1: string
}

type Props = {
  h1: string
  children: ReactNode
  additionalSteps?: additionalStepsType[]
  currentAdditionalStep?: null | number
  setCurrentStep?: (stepIndex: number | null) => void
  resetComponentState?: () => void
  fullWidth?: boolean
  displayQueryParam?: string
}
const MAX_CONTENT_HEIGHT = getMaxContainerHeight(window.innerHeight)

const MainContentContainer = ({ h1, children, additionalSteps, currentAdditionalStep, setCurrentStep, resetComponentState, fullWidth, displayQueryParam }: Props) => {
  const { pathname } = useLocation()
  const hasBreadCrumb = pathname.split('/').length > 2

  return (
    <div className="flex flex-col grow"
      style={{
        marginTop: styles.contentContainer.margin,
        marginBottom: styles.contentContainer.margin
      }}>
      <div className={`${fullWidth ? 'w-full px-8' : 'max-w-5xl'} flex flex-col grow w-full mx-auto`}>

        {/* Navigation */}
        {hasBreadCrumb && <Breadcrumbs
          pathname={pathname}
          additionalSteps={additionalSteps}
          currentAdditionalStep={currentAdditionalStep}
          setCurrentStep={setCurrentStep}
          resetComponentState={resetComponentState}
          displayQueryParam={displayQueryParam}
        />}

        {/* Heading */}
        <div className='border border-[#9da3a3] text-[#e7e4db] rounded-lg flex items-center px-5 text-3xl font-bold w-full relative'
          style={{
            height: styles.contentContainer.h1Height,
            marginBottom: styles.contentContainer.margin
          }}
        >
          <div className='absolute top-0 right-0 bottom-0 left-0 -z-10 bg-gradient-to-b from-[#0004040F] to-black opacity-90' />
          <div className='absolute w-full top-0 right-0 bottom-0 left-0 -z-10 opacity-[10%]'
            style={{
              backgroundImage: `url(${SCRUMBLED_PAPER_JPG})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '100%'
            }}
          />
          <h1 className='font-medium'>{h1}</h1>
        </div>

        {/* Content */}
        <div className='border border-[#9da3a3] text-[#e7e4db] rounded-lg grow leading-8 overflow-y-auto'
          style={{ height: MAX_CONTENT_HEIGHT - (hasBreadCrumb ? styles.breadCrumbHeight : 0) }}
        >
          <div className='relative h-auto min-h-full rounded-lg flex flex-col grow'>
            <div className='absolute top-0 right-0 bottom-0 left-0 -z-10 bg-gradient-to-b from-[#0004040F] to-black opacity-90' />
            <div className='absolute top-0 right-0 bottom-0 left-0 -z-10 opacity-[10%]'
              style={{
                backgroundImage: `url(${SCRUMBLED_PAPER_JPG})`,
                backgroundRepeat: 'repeat',
                backgroundSize: `100% 100%`, // Let background size adjust automatically
              }}
            />
            {children}
          </div>
        </div>
      </div>
      <CustomToastContainer />
    </div>
  )
}

export default MainContentContainer