import { Dispatch, SetStateAction } from 'react'
import { pickColumn } from '../../../../utils/ExcelDataProcessing/processData'

type TableHeaderCellProps = {
  isSelected: boolean
  columnIndex: number
  setSelectedColumns: Dispatch<SetStateAction<boolean[]>>
}

const TableHeaderCell = ({ isSelected, columnIndex, setSelectedColumns }: TableHeaderCellProps) => {
  const attributes = isSelected
    ? {
        cellText: '',
        tdClassName: 'bg-gray-600 text-white',
        btnClassName: 'btn-primary',
        btnText: 'Selected',
      }
    : {
        tdClassName: 'bg-base-100',
        btnClassName: 'btn-secondary',
        btnText: 'Pick',
      }

  return (
    <td
      onClick={(e) => pickColumn(columnIndex - 1, e, setSelectedColumns)}
      className={`w-40 cursor-pointer select-none border-x border-gray-600 text-center outline outline-1 -outline-offset-1 outline-gray-600 ${attributes.tdClassName}`}
    >
      <div className="pb-1">{`Column ${columnIndex}`}</div>
      <button className={`btn btn-xs ${attributes.btnClassName}`}>{attributes.btnText}</button>
    </td>
  )
}

export default TableHeaderCell
