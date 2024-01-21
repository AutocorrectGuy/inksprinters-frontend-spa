import { toast } from 'react-toastify'
import { WorkbookType } from '../../contexts/ExcelToTextContext'
import { extractColumn } from './processData'
import { AppSettingsType } from '../../config/TextEditorSettings'
import * as XLSX from 'xlsx'
import { customToastProps } from '../../../../../Components/Toast/CustomToastContainer'

export const sanitizeSheetData = (cells: string[][]) => {
  // Determine the number of columns
  const columnCount = cells[0]?.length || 0

  // Check if each column is empty
  const isColumnEmpty = Array(columnCount).fill(true)
  // Track if each row is empty
  const isRowEmpty = Array(cells.length).fill(true)

  cells.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell !== '') {
        isColumnEmpty[colIndex] = false
        isRowEmpty[rowIndex] = false
      }
    })
  })

  // Filter out the empty columns and rows
  return cells
    .filter((_, rowIndex) => !isRowEmpty[rowIndex])
    .map((row) => row.filter((_, colIndex) => !isColumnEmpty[colIndex]))
}

/**
 * Parses an Excel file to extract cell data and determine the column mode.
 *
 * @param files - A FileList containing the Excel files to be processed.
 * @param setCellsCallback - A callback function to update the cell data state.
 * @param setMultiColumnModeCallback - A callback function to update the Multi-column mode state.
 */

// TODO: modify to validate workbook not cells
type ReadExcelFileProps = {
  files: File[]
  setSheetName: (sheetName: string) => void
  setSheetData: (sheetData: string[][]) => void
  setWorkBook: (workbook: WorkbookType) => void
  setCurrentStep: (step: number) => void
  setColumnValues: (columnValues: string[]) => void
  setEditorText: (editorText: string) => void
  appSettings: AppSettingsType
}
export const readExcelFile = ({
  files,
  setSheetName,
  setSheetData,
  setWorkBook,
  setCurrentStep,
}: ReadExcelFileProps) => {
  // Limit to only one file at a time
  if (files.length > 1) {
    toast.error('You can use only one file at a time!', customToastProps)
    return
  }

  const file = files[0]
  const reader = new FileReader()

  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (!e.target) return
    if (!e.target.result) return

    // Read excel file
    const XLSXworkbook = XLSX.read(e.target.result, { type: 'binary' })

    // Check if any of sheets are present
    if (!XLSXworkbook.SheetNames.length) {
      toast.error('Excel file does not containy any sheets!', customToastProps)
      return
    }

    // Loop throught each sheet, sanitize and store the data, if there is any
    const workbook: WorkbookType = { sheetNames: [], sheets: {} }

    for (const XLSXsheetName of XLSXworkbook.SheetNames) {
      // convert sheet to string[][] (it does not matter that function name is `sheet_to_json`)
      const XLSXsheetData = sanitizeSheetData(
        XLSX.utils.sheet_to_json(XLSXworkbook.Sheets[XLSXsheetName], {
          header: 1,
          blankrows: true,
          defval: '',
        }),
      )

      // first check if there are any of rows present and then, if there is, if each cell isn't empty
      if (!XLSXsheetData.length || XLSXsheetData.every((row) => !row.length)) continue

      // if there is data, push it into workbook object
      workbook.sheetNames.push(XLSXsheetName)
      // saves each column in separate array of strings
      workbook.sheets[XLSXsheetName] = [...Array(XLSXsheetData[0].length)].map((_x, i) =>
        extractColumn(XLSXsheetData, i),
      )
    }

    // If there were only empty sheets, throw an error
    if (workbook.sheetNames.length === 0) {
      toast.error(
        `Excel file does not any values in present sheet${XLSXworkbook.SheetNames.length === 1 ? '' : 's'}!`,
        customToastProps,
      )
      return
    }

    // Move to a certain step based on `sheet count` and `column count` in the sheet
    if (workbook.sheetNames.length === 1) {
      const sheetData = workbook.sheets[workbook.sheetNames[0]]

      setCurrentStep(sheetData.length === 1 ? 2 : 1)
      setSheetName(workbook.sheetNames[0])
      setSheetData(sheetData)
    } else {
      // There were at least 2 sheets and 2 columns
      // Otherwise, let the user choose the sheet in the first step of the multistep modal
      setCurrentStep(0)
    }
    setWorkBook(workbook)
  }

  reader.onerror = () => {
    toast.error('Error reading the Excel file', customToastProps)
  }

  reader.readAsBinaryString(file)
}
