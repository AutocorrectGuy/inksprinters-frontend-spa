import { MouseEvent, SetStateAction } from 'react'

/**
 * Extracts a column from a 2D array of strings.
 *
 * @param array2D The 2D array of strings representing the Excel data.
 * @param columnIndex The index of the column to extract.
 * @returns An array of strings representing the selected column.
 */
export const extractColumn = (array2D: string[][], columnIndex: number): string[] => {
  if (array2D.length === 0 || columnIndex < 0) {
    return []
  }

  return array2D.map((row) => {
    // Ensure the row has enough elements
    if (row.length > columnIndex) {
      return row[columnIndex]
    } else {
      // Return a default value (e.g., empty string) if the column index is out of bounds for this row
      return ''
    }
  })
}

/**
 * Handles the selection of columns in a table-like structure.
 *
 * @param i The index of the column being selected, or 'string' to select all.
 * @param event The mouse event associated with the selection.
 * @param setSelectedColumns The state setter function for selected columns.
 */
export const pickColumn = (
  columnIndex: number | string,
  event: MouseEvent,
  setSelectedColumns: React.Dispatch<SetStateAction<boolean[]>>,
) => {
  if (typeof columnIndex === 'string') {
    // Handle special cases where columnIndex is a string
    // For example, selecting all columns, etc.
    // This part depends on how you want to handle string inputs.
    setSelectedColumns((prev) => prev.map(() => true)) // Example: Select all
    return
  }

  setSelectedColumns((prev) => {
    const newSelections = [...prev]

    if (event.ctrlKey || event.metaKey) {
      // Toggle the selection status of the clicked column
      newSelections[columnIndex] = !newSelections[columnIndex]
    } else {
      // Without Ctrl/Cmd key, select only the clicked column
      newSelections.fill(false) // Deselect all
      newSelections[columnIndex] = true // Select the clicked one
    }

    return newSelections
  })
}
