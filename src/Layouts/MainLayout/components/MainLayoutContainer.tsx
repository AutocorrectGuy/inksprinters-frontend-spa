import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { getMaxContainerHeight, styles } from '../config/MainLayout.config'
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
const MAX_CONTENT_HEIGHT = getMaxContainerHeight()

const MainContentContainer = ({
  h1,
  children,
  additionalSteps,
  currentAdditionalStep,
  setCurrentStep,
  resetComponentState,
  fullWidth,
  displayQueryParam,
}: Props) => {
  const { pathname } = useLocation()
  const hasBreadCrumb = pathname.split('/').length > 2

  return (
    <div
      className="flex grow flex-col"
      style={{
        marginTop: styles.contentContainer.margin,
        marginBottom: styles.contentContainer.margin,
      }}
    >
      <div className={`${fullWidth ? 'w-full px-8' : 'max-w-6xl'} mx-auto flex w-full grow flex-col`}>
        {/* Navigation */}
        {hasBreadCrumb && (
          <Breadcrumbs
            pathname={pathname}
            additionalSteps={additionalSteps}
            currentAdditionalStep={currentAdditionalStep}
            setCurrentStep={setCurrentStep}
            resetComponentState={resetComponentState}
            displayQueryParam={displayQueryParam}
          />
        )}

        {/* Heading */}
        <div
          className="relative flex w-full items-center rounded-lg border-2 border-[#9da3a3] px-5 text-3xl font-bold text-[#e7e4db]"
          style={{
            height: styles.contentContainer.h1Height,
            marginBottom: styles.contentContainer.margin,
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-gradient-to-b from-[#0004040F] to-black opacity-90" />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 -z-10 w-full opacity-[10%]"
            style={{
              backgroundImage: `url(${SCRUMBLED_PAPER_JPG})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '100%',
            }}
          />
          <h1 className="font-medium">{h1}</h1>
        </div>

        {/* Content */}
        {/* border border-[#9da3a3] */}
        <div className='grow relative'>
          <div
            className="grow overflow-y-auto rounded-b-md leading-8 text-[#e7e4db]"
            style={{ height: MAX_CONTENT_HEIGHT - (hasBreadCrumb ? styles.breadCrumbHeight : 0) }}
          >
            <div className="relative flex h-auto min-h-full grow flex-col rounded-md">
              <div
                className="absolute bottom-0 left-0 right-0 top-0 -z-10 opacity-[10%]"
                style={{
                  backgroundImage: `url(${SCRUMBLED_PAPER_JPG})`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: `100% 100%`,
                }}
              />
              {children}
            </div>
          </div>
          
          <div className='absolute top-0 bottom-0 left-0 bg-gradient-to-b from-[#9da3a3] to-transparent w-[3px] rounded-tl-full'></div>
          <div className='absolute top-0 right-0 bottom-0 bg-gradient-to-b from-[#9da3a3] to-transparent w-[3px] rounded-tr-full'></div>
          <div className='absolute left-[1px] -top-[1px] right-[1px] bg-[#9da3a3] to-transparent h-[3px] rounded-t-full'></div>
          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-gradient-to-b from-[#80ffe310] to-black opacity-80 rounded-b-md"
            style={{ height: MAX_CONTENT_HEIGHT - (hasBreadCrumb ? styles.breadCrumbHeight : 0) }}
          />
        </div>

      </div>
    </div>
  )
}

export default MainContentContainer
