import { JigTemplate } from '../../../../libraries/dexie/models/jig.model'

// todo implement dynamic wrapping for different screen sizes
export const generateGrid = (formData: JigTemplate, wrapperSize: { x: number; y: number }) => {

  const cellsCount = Number(formData.copies)
  const cellWidth = Number(formData.cellElementSizeX)
  const cellHeight = Number(formData.cellElementSizeY)

  // Check if either of these values are 0. Division with zero is permitted!
  if (!cellsCount || !cellWidth || !cellHeight) return []

  let cells = []
  const gridWidth = Number(formData.pageSizeX)
  const gridHeight = Number(formData.pageSizeY)
  const gapWidth = Number(formData.layoutSpaceX)
  const gapHeight = Number(formData.layoutSpaceY)
  let offsetX = Number(formData.originOffsetX)
  let offsetY = Number(formData.originOffsetY)

  let cellWidthPlusGap = cellWidth + gapWidth
  let cellHeightPlusGap = cellHeight + gapHeight

  const columnsCount = Math.floor((gridWidth - offsetX + gapWidth) / cellWidthPlusGap)
  const rowsCount = Math.floor((gridHeight - offsetY - gapHeight) / cellHeightPlusGap)

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

export const calculateMaxCellCount = (formData: JigTemplate) => {
  const cellWidth = Number(formData.cellElementSizeX)
  const cellHeight = Number(formData.cellElementSizeY)

  // Check if either of these values are 0. Division with zero is permitted!
  if (!cellWidth || !cellHeight) return Number(formData.copies)

  const gridWidth = Number(formData.pageSizeX)
  const gridHeight = Number(formData.pageSizeY)
  const gapWidth = Number(formData.layoutSpaceX)
  const gapHeight = Number(formData.layoutSpaceY)
  let offsetX = Number(formData.originOffsetX)
  let offsetY = Number(formData.originOffsetY)

  let cellWidthPlusGap = cellWidth + gapWidth
  let cellHeightPlusGap = cellHeight + gapHeight

  const columnsCount = Math.floor((gridWidth - offsetX + gapWidth) / cellWidthPlusGap)
  const rowsCount = Math.floor((gridHeight - offsetY - gapWidth) / cellHeightPlusGap)

  return columnsCount * rowsCount
}
