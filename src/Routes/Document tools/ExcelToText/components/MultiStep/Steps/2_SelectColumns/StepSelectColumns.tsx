import 'react-tooltip/dist/react-tooltip.css'
import { useRef, useState } from 'react'
import { useExcelToTextContext } from '../../../../contexts/ExcelToTextContext'
import { Tooltip } from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import TableHeaderCell from './TableHeaderCell'
import { StepComponentProps } from '../../MultiStepModal'
import { pickColumn } from '../../../../utils/ExcelDataProcessing/processData'
import { getMaxContainerHeight } from '../../../../../../../Layouts/MainLayout/config/MainLayout.config'

const getSelectedColumnIndexes = (selectedColumns: boolean[]) =>
  selectedColumns.map((isSelected, index) => (isSelected ? index : -1)).filter((index) => index !== -1)

const StepSelectColumns = ({ handlePreviousStep, handleNextStep }: StepComponentProps) => {
  const { sheetData, setSheetData, setSelectedCols } = useExcelToTextContext()

  const tableRef = useRef<HTMLTableElement>(null)

  // transpose 2d array
  const [tableData, _setTableData] = useState(sheetData[0].map((_, colIndex) => sheetData.map((row) => row[colIndex])))

  const [selectedColumns, setSelectedColumns] = useState<boolean[]>([...Array(sheetData.length)].map((_x, i) => !i))

  const clickNext = () => {
    // store selected column indexes
    const selectedIndexes = getSelectedColumnIndexes(selectedColumns)
    setSelectedCols(selectedIndexes)
    handleNextStep!()
  }

  const clickBack = () => {
    setSheetData([])
    setSelectedCols([])
    handlePreviousStep!()
  }

  const selectedColumnCount = selectedColumns.reduce((acc, curr) => +curr + acc, 0)

  return (
    <>
      {tableData && sheetData && (
        <div className="flex h-full grow flex-col overflow-hidden">
          {/* Heading */}
          <div className="flex items-center justify-center py-4 text-left">
            <p className="mr-2">Please pick the column you want to use.</p>
            <span data-tooltip-id="tooltip-excel-viewer-1">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-200"
              />
            </span>
            <Tooltip
              id="tooltip-excel-viewer-1"
              clickable
              opacity={'100%'}
              place="bottom"
              classNameArrow="border border-gray-600"
              delayHide={200}
              className="z-30 max-w-[350px] border border-gray-600 text-white"
              style={{ backgroundColor: '#1D232A' }}
            >
              <div className="pb-4 text-left">
                <p className="float-left mr-1">
                  Tip: You can select multiple columns at once by clicking and holding&nbsp;
                  <kbd className="kbd kbd-sm border border-info">⌘</kbd>
                  &nbsp;/&nbsp;
                  <kbd className="kbd kbd-sm border border-info">Ctrl</kbd>
                  &nbsp;key or by clicking&nbsp;
                  <button
                    className="btn btn-primary btn-xs inline-block"
                    onClick={(e) => pickColumn('all', e, setSelectedColumns)}
                  >
                    here
                  </button>
                </p>
              </div>
            </Tooltip>
          </div>
          {/* Table container */}
          <div className="h-0 flex-grow overflow-auto">
            <table
              ref={tableRef}
              className="table table-pin-rows table-pin-cols table-xs mx-auto w-fit table-fixed overflow-hidden rounded-none"
            >
              <thead>
                <tr>
                  <td className="w-10 select-none"></td>
                  {tableData[0].map((_x, i) => (
                    <TableHeaderCell
                      key={`table-header-cell-${i}`}
                      isSelected={selectedColumns[i]}
                      columnIndex={i + 1}
                      setSelectedColumns={setSelectedColumns}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr key={`row-${i}`}>
                    <td className={`w-10 select-none text-right text-gray-500`}>{i + 1}</td>
                    {row.map((cell, j) => (
                      <td
                        onClick={(e) => pickColumn(j, e, setSelectedColumns)}
                        className="relative cursor-pointer select-none border border-gray-600 bg-transparent"
                        key={`cell-${i}-${j}`}
                      >
                        {cell}
                        {/* Backdrop */}
                        {!i && selectedColumns[j] && (
                          <div
                            className={`absolute left-0 top-0 -z-10 w-40 overflow-hidden bg-gray-700 bg-opacity-50`}
                            style={{
                              height: tableRef.current ? tableRef.current.scrollHeight * 2 : 9999,
                            }}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Selection info */}
          <div className="flex justify-center pb-4 pt-8">
            <p className="flex items-center rounded-md text-xl text-white">
              {selectedColumnCount > 0 ? (
                <>
                  <span className="float-left">Selected&nbsp;</span>
                  <span className="float-left rounded-md bg-gray-700 px-2 text-2xl">{selectedColumnCount}</span>
                  <span className="float-left">
                    &nbsp;column{selectedColumnCount > 1 || selectedColumnCount === 0 ? 's' : ''}
                  </span>
                </>
              ) : (
                'No columns selected'
              )}
            </p>
          </div>
          {/* Navigation buttons */}
          <div className="flex justify-end p-2">
            <button className="btn btn-primary mr-2" onClick={() => clickBack()}>
              Back
            </button>
            <button
              className={`btn ${selectedColumnCount ? 'btn-primary' : 'btn-disabled select-none'}`}
              onClick={() => clickNext()}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default StepSelectColumns
