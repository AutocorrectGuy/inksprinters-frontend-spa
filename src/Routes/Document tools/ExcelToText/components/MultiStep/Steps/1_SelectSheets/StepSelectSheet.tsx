import { useEffect } from 'react'
import { StepComponentProps } from '../../MultiStepModal'
import { useExcelToTextContext } from '../../../../contexts/ExcelToTextContext'
import { lineSpacingHandler } from '../../../../utils/OptionsHandlers/lineSpacingHandler'

const StepSelectSheet = ({ handleNextStep }: StepComponentProps) => {
  const { workBook, sheetName, setSheetName, setSheetData, setEditorText, setColumnValues, appSettings } =
    useExcelToTextContext()

  useEffect(() => setSheetName(sheetName ?? workBook!.sheetNames[0]), [])

  const clickNext = (selectedSheetName: string) => {
    const currSheetData = workBook!.sheets[selectedSheetName]
    const nextStepIncrement = currSheetData.length > 1 ? 1 : 2

    if (nextStepIncrement === 1) {
      setSheetName(selectedSheetName)
      setSheetData(currSheetData)
    } else {
      setColumnValues(currSheetData[0])
      setEditorText(lineSpacingHandler(appSettings, currSheetData[0]))
    }
    handleNextStep!(nextStepIncrement)
  }

  return (
    <div className="flex h-full flex-col grow">
      {/* Content section */}
      <div className={`flex flex-grow overflow-y-auto ${workBook!.sheetNames.length > 5 ? '' : 'items-center'}`}>
        <div className="flex w-full flex-col">
          {workBook!.sheetNames.map((shName, i) => (
            <button key={`worksheet-name-${i}`} onClick={() => clickNext(shName)} className={'btn btn-lg m-4 my-2'}>
              {shName}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StepSelectSheet
