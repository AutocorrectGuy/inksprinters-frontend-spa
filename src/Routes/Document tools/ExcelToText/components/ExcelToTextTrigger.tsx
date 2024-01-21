import { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useExcelToTextContext } from '../contexts/ExcelToTextContext'
import MultiStepModal from './MultiStep/MultiStepModal'
import { readExcelFile } from '../utils/ExcelDataProcessing/readAndSanitize'
import MainContentContainer, { additionalStepsType } from '../../../../Layouts/MainLayout/components/MainLayoutContainer'

const ExcelToTextButton = () => {
  const {
    setSheetName,
    setSheetData,
    currentStep,
    workBook,
    setWorkBook,
    setCurrentStep,
    setColumnValues,
    setEditorText,
    appSettings,
    resetContext
  } = useExcelToTextContext()

  const containerRef = useRef<HTMLDivElement>(null)

  // Dropzone props
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) =>
      readExcelFile({
        files: files as File[],
        setSheetName,
        setSheetData,
        setWorkBook,
        setCurrentStep,
        setColumnValues,
        setEditorText,
        appSettings,
      }),
  })

  const [additionalStepsState, setAdditionalStepsState] = useState<additionalStepsType[]>([]);



  useEffect(() => {


    setAdditionalStepsState(() => {
      return currentStep === null
        ? []
        : ([
          { index: 0, h1: 'Select Sheet' },
          { index: 1, h1: 'Choose Column(s)' },
          { index: 2, h1: 'Edit and Download' }
        ].slice(0, currentStep + 1))
    })
  }, [currentStep])
  return (
    <MainContentContainer
      h1='Convert and encode Excel'
      additionalSteps={additionalStepsState}
      currentAdditionalStep={currentStep}
      setCurrentStep={setCurrentStep}
      resetComponentState={resetContext}
    >

      {workBook ? (
        <MultiStepModal />
      ) : (
        // Dnd button that allows user to provide an excel file to this editor
        <div {...getRootProps({ role: 'test' })}
          className="border-4 grow border-dashed border-green-500/10 rounded-xl flex flex-col m-2  items-center justify-center"
        >
          <button className="btn btn-outline btn-lg rounded-md border-green-500 text-2xl text-green-500 focus:ring-green-500">
            <input {...getInputProps()} />
            <p>{isDragActive ? 'Release to drop' : 'Select excel file'}</p>
          </button>
          <div className='font-thin text-md pt-4 text-neutral-300'>
            or drop Excel document here
          </div>
        </div>
      )}
    </MainContentContainer>
  )
}

export default ExcelToTextButton
