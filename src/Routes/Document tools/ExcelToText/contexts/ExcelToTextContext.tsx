import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'
import { AppSettingsType, loadSettings } from '../config/TextEditorSettings'

export type SkipStepsConfigType = { skipFirstStep: boolean; skipSecondStep: boolean }
export type WorkbookType = {
  sheetNames: string[]
  sheets: {
    [name: string]: string[][]
  }
}

// MyContextType defines the structure of the context used for managing state
// in the 'excel-to-text' application. It includes states and setters for handling
// Excel data, editor contents, foreign characters, and application settings.

type ExcelToTextContextType = {
  // Represents the entire imported Excel file as an XLSX object.
  workBook: WorkbookType | null
  setWorkBook: Dispatch<SetStateAction<WorkbookType | null>>

  // Stores the name of the currently active or selected Excel sheet.
  sheetName: string | null
  setSheetName: Dispatch<SetStateAction<string | null>>

  // Contains the data of a single Excel sheet as a two-dimensional array of strings,
  // where each sub-array represents a row from the Excel sheet.
  sheetData: string[][]
  setSheetData: Dispatch<SetStateAction<string[][]>>

  // Holds the indexes of columns selected by the user in the Excel sheet.
  selectedCols: number[]
  setSelectedCols: Dispatch<SetStateAction<number[]>>

  // An array of strings, where each string is a cell value from a selected column,
  // intended for use in the primary text editor.
  columnValues: string[] | null
  setColumnValues: Dispatch<SetStateAction<string[] | null>>

  // Contains the current text content of the primary text editor.
  editorText: string | null
  setEditorText: Dispatch<SetStateAction<string | null>>

  // Maps unique foreign characters found in the editor's content to their respective
  // positions within the text.
  foreignChars: { [key: string]: number[] }
  setForeignChars: Dispatch<SetStateAction<{ [key: string]: number[] }>>

  // Current step index of the modal
  currentStep: number | null
  setCurrentStep: Dispatch<SetStateAction<number | null>>

  skipStepsConfig: SkipStepsConfigType
  setSkipStepsConfig: Dispatch<SetStateAction<SkipStepsConfigType>>

  // Represents the configuration settings of the 'excel-to-text' application,
  // intended for persistence in local storage.
  appSettings: AppSettingsType
  setAppSettings: Dispatch<SetStateAction<AppSettingsType>>

  // Function to reset the context to its initial state.
  resetContext: (onResetCallback?: () => void) => void
}

// Define the initial context value based on MyContextType
const DEFAULTS: ExcelToTextContextType = {
  workBook: null,
  setWorkBook: () => {},

  sheetName: null,
  setSheetName: () => {},

  sheetData: [],
  setSheetData: () => {},

  selectedCols: [],
  setSelectedCols: () => {},

  columnValues: null,
  setColumnValues: () => {},

  editorText: null,
  setEditorText: () => {},

  foreignChars: {},
  setForeignChars: () => {},

  currentStep: null,
  setCurrentStep: () => {},

  skipStepsConfig: { skipFirstStep: false, skipSecondStep: false },
  setSkipStepsConfig: () => {},

  appSettings: loadSettings(),
  setAppSettings: () => {},

  resetContext: () => {},
}

// Create a provider component
const ExcelToTextContext = createContext(DEFAULTS)

export const ExcelToTextContextProvider = ({ children }: { children: ReactNode }) => {
  const [workBook, setWorkBook] = useState<WorkbookType | null>(DEFAULTS.workBook)
  const [sheetName, setSheetName] = useState<string | null>(DEFAULTS.sheetName)
  const [sheetData, setSheetData] = useState<string[][]>(DEFAULTS.sheetData)
  const [selectedCols, setSelectedCols] = useState<number[]>(DEFAULTS.selectedCols)
  const [columnValues, setColumnValues] = useState<string[] | null>(DEFAULTS.columnValues)
  const [editorText, setEditorText] = useState<string | null>(DEFAULTS.editorText)
  const [currentStep, setCurrentStep] = useState<number | null>(DEFAULTS.currentStep)
  const [foreignChars, setForeignChars] = useState<{ [key: string]: number[] }>(DEFAULTS.foreignChars)
  const [skipStepsConfig, setSkipStepsConfig] = useState(DEFAULTS.skipStepsConfig)
  const [appSettings, setAppSettings] = useState<AppSettingsType>(DEFAULTS.appSettings)

  const resetContext = (onResetCallback?: () => void) => {
    onResetCallback && onResetCallback()
    setWorkBook(DEFAULTS.workBook)
    setSheetName(DEFAULTS.sheetName)
    setSheetData(DEFAULTS.sheetData)
    setSelectedCols(DEFAULTS.selectedCols)
    setColumnValues(DEFAULTS.columnValues)
    setEditorText(DEFAULTS.editorText)
    setCurrentStep(DEFAULTS.currentStep)
    setForeignChars(DEFAULTS.foreignChars)
    setSkipStepsConfig(DEFAULTS.skipStepsConfig)
    setAppSettings(loadSettings())
  }

  return (
    <ExcelToTextContext.Provider
      value={{
        workBook,
        setWorkBook,
        sheetName,
        setSheetName,
        sheetData,
        setSheetData,
        selectedCols,
        setSelectedCols,
        columnValues,
        setColumnValues,
        editorText,
        setEditorText,
        foreignChars,
        setForeignChars,
        currentStep,
        setCurrentStep,
        skipStepsConfig,
        setSkipStepsConfig,
        appSettings,
        setAppSettings,
        resetContext,
      }}
    >
      {children}
    </ExcelToTextContext.Provider>
  )
}

// use context as hook
export const useExcelToTextContext = () => useContext(ExcelToTextContext)
