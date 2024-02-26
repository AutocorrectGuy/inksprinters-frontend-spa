import { Link, useSearchParams } from 'react-router-dom'
import { styles } from '../config/MainLayout.config'
import { additionalStepsType } from './MainLayoutContainer'
import { useState } from 'react'
import { toProperCase } from '../../../Routes/Storage/utils'

type BreadCrumbProps = {
  pathname: string
  additionalSteps?: additionalStepsType[]
  currentAdditionalStep?: null | number
  setCurrentStep?: (stepIndex: number | null) => void
  resetComponentState?: () => void
  displayQueryParam?: string
}
const Breadcrumbs = ({
  pathname,
  additionalSteps,
  currentAdditionalStep,
  setCurrentStep,
  resetComponentState,
  displayQueryParam,
}: BreadCrumbProps) => {
  const [searchParams] = useSearchParams()
  const [queriedValue, _setQueriedValue] = useState<string | null>(
    displayQueryParam ? searchParams.get(displayQueryParam) : null,
  )
  const pathnames = pathname.split('/').filter((x) => x)

  const breadcrumbPaths = pathnames.reduce((acc, currentPath, index) => {
    const href = `${index !== 0 ? acc[index - 1] : ''}/${currentPath}`
    acc.push(href)
    return acc
  }, [] as string[])

  const prettifyCrumbName = (href: string) => {
    const name = href.replaceAll('-', ' ').substring(href.lastIndexOf('/') + 1)
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  const handleClick = (stepIndex: number) => {
    resetComponentState && stepIndex === breadcrumbPaths.length - 1 && resetComponentState()
  }

  const renderCrumbName = (href: string, i: number) => {
    const defaultText = prettifyCrumbName(href)

    if (!displayQueryParam || !queriedValue) return defaultText

    if (i === breadcrumbPaths.length - 1) return `${defaultText}: ${toProperCase(queriedValue)}`

    return defaultText
  }

  return (
    <div
      className="breadcrumbs overflow-x-auto overflow-y-hidden text-lg font-semibold text-[#CFCBC4]"
      style={{ height: styles.breadCrumbHeight }}
    >
      <ul>
        {breadcrumbPaths.map((href, i) => (
          <li key={`crumb-link-${i}`}>
            <Link
              to={href}
              onClick={() => handleClick(i)}
              className={`${i === breadcrumbPaths.length - 1 && (currentAdditionalStep === null || currentAdditionalStep === undefined) ? 'text-[#E7E4DB]' : 'text-neutral-500'}`}
            >
              {renderCrumbName(href, i)}
            </Link>
          </li>
        ))}
        {additionalSteps &&
          additionalSteps?.map((step, i) => (
            <li
              key={`additional-crumb-link-${i}`}
              className={`cursor-pointer ${currentAdditionalStep === i ? 'text-[#E7E4DB]' : 'text-neutral-500'}`}
              onClick={() => setCurrentStep!(step.index)}
            >
              {step.h1}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Breadcrumbs
