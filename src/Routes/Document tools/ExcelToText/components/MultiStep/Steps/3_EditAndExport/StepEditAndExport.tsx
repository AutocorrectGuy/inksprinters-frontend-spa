import { useEffect, useRef } from 'react'
import TextEditorOptions from './TextEditorOptions'
import MonacoEditor from './MonacoEditor'
import { handleDownload } from '../../../../utils/OptionsHandlers/downloadHandlers'
import { lineSpacingHandler } from '../../../../utils/OptionsHandlers/lineSpacingHandler'
import { handleCopy } from '../../../../utils/OptionsHandlers/copyHandler'
import { useExcelToTextContext } from '../../../../contexts/ExcelToTextContext'
import { StepComponentProps } from '../../MultiStepModal'
import ForgeignCharTerminal from './ForgeignCharTerminal'

const StepEditAndExport = ({ handlePreviousStep }: StepComponentProps) => {
  const { sheetData, columnValues, setColumnValues, editorText, setEditorText, setForeignChars, appSettings } =
    useExcelToTextContext()

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setColumnValues(columnValues ?? sheetData[0])
    setEditorText(editorText ?? lineSpacingHandler(appSettings, sheetData[0]))
  }, [])

  useEffect(() => {
    setEditorText(lineSpacingHandler(appSettings, columnValues ?? sheetData[0]))
  }, [appSettings.textWrap, appSettings.lineSpacing, appSettings.textEncoding])

  const clickBack = () => {
    setForeignChars({})
    setEditorText('')
    setColumnValues(null)

    const decrement = sheetData.length > 1 ? 1 : 2

    handlePreviousStep!(decrement)
  }

  return (
    <div ref={containerRef} className="flex grow flex-col overflow-hidden">
      {/* Container for the columns */}
      <div className="flex flex-grow">
        <div className="w-64">
          <TextEditorOptions
            handleCopy={() => handleCopy(editorText as string)}
            handleDownload={() => handleDownload(editorText as string, appSettings.textEncoding)}
          />
        </div>
        {columnValues && editorText ? (
          <div ref={containerRef} className="flex flex-grow flex-col">
            <MonacoEditor />
            <ForgeignCharTerminal />
          </div>
        ) : (
          <div ref={containerRef} className="flex flex-grow flex-col items-center justify-center">
            <span className="loading loading-spinner loading-lg" />
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end p-2">
        <button className="btn btn-primary" onClick={clickBack}>
          Back
        </button>
      </div>
    </div>
  )
}

export default StepEditAndExport
