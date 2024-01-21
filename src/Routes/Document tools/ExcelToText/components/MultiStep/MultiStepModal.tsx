import { useRef, RefObject, useEffect } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useExcelToTextContext } from '../../contexts/ExcelToTextContext'
import StepSelectSheet from './Steps/1_SelectSheets/StepSelectSheet'
import StepSelectColumns from './Steps/2_SelectColumns/StepSelectColumns'
import StepEditAndExport from './Steps/3_EditAndExport/StepEditAndExport'

export type StepComponentProps = {
  handlePreviousStep?: (stepIncrement?: number) => void
  handleNextStep?: (stepDecrement?: number) => void
}

const TOTAL_STEPS_COUNT = 3

const MultiStepModal = () => {
  const { currentStep, setCurrentStep, sheetData } = useExcelToTextContext()

  const nextStep = (stepIncrement?: number) =>
    currentStep! < TOTAL_STEPS_COUNT - 1 && setCurrentStep(currentStep! + (stepIncrement ?? 1))
  const previousStep = (stepDecrement?: number) =>
    currentStep! > 0 && setCurrentStep(currentStep! - (stepDecrement ?? 1))

  return (
    <div className="flex flex-col grow min-h-full">
      {currentStep !== null && sheetData ? (
        <div className="flex flex-col min-h-full grow">
          {/* Render content based on currentStep */}
          {currentStep === 0 && <StepSelectSheet handleNextStep={nextStep} />}
          {currentStep === 1 && <StepSelectColumns handlePreviousStep={previousStep} handleNextStep={nextStep} />}
          {currentStep === 2 && <StepEditAndExport handlePreviousStep={previousStep} />}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}
    </div>
  )
}

export default MultiStepModal
