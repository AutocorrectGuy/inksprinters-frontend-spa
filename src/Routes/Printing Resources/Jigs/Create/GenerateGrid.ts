import { Jig } from '../../../../libraries/dexie/models/jig.model'

export const generateGrid = (formData: Jig, wrapperSize: { x: number; y: number }) => {
  console.log(wrapperSize)

  const cellsCount = Number(formData.count)
  const cellWidth = Number(formData.cell_width)
  const cellHeight = Number(formData.cell_height)

  // Check if either of these values are 0. Division with zero is permitted!
  if (!cellsCount || !cellWidth || !cellHeight) return []

  let cells = []
  const gridWidth = Number(formData.width)
  const gridHeight = Number(formData.height)
  const gapWidth = Number(formData.gap_x)
  const gapHeight = Number(formData.gap_y)
  let offsetX = Number(formData.offset_x)
  let offsetY = Number(formData.offset_y)

  let cellWidthPlusGap = cellWidth + gapWidth
  let cellHeightPlusGap = cellHeight + gapHeight

  const columnsCount = Math.floor((gridWidth - offsetX) / cellWidthPlusGap)
  const rowsCount = Math.floor((gridHeight - offsetY) / cellHeightPlusGap)

  let currIteration = 0
  for (let i = 0; i < rowsCount; i++) {
    for (let j = 0; j < columnsCount; j++) {
      if (currIteration >= cellsCount) return cells

      cells.push({
        x: j * cellWidthPlusGap + offsetX,
        y: i * cellHeightPlusGap + offsetY,
      })
      currIteration++
    }
  }
  return cells
}

export const calculateMaxCellCount = (formData: Jig) => {
  const cellWidth = Number(formData.cell_width)
  const cellHeight = Number(formData.cell_height)

  // Check if either of these values are 0. Division with zero is permitted!
  if (!cellWidth || !cellHeight) return Number(formData.count)

  const gridWidth = Number(formData.width)
  const gridHeight = Number(formData.height)
  const gapWidth = Number(formData.gap_x)
  const gapHeight = Number(formData.gap_y)
  let offsetX = Number(formData.offset_x)
  let offsetY = Number(formData.offset_y)

  let cellWidthPlusGap = cellWidth + gapWidth
  let cellHeightPlusGap = cellHeight + gapHeight

  const columnsCount = Math.floor((gridWidth - offsetX) / cellWidthPlusGap)
  const rowsCount = Math.floor((gridHeight - offsetY) / cellHeightPlusGap)
  return columnsCount * rowsCount
}
