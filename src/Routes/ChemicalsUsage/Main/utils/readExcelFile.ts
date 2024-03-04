import { ChangeEvent } from 'react'
import * as XLSX from 'xlsx'
import { dateStringToUTC } from '../../../../Utils/dateStringToUtc'
import { ChemicalUsageLog } from '../../../../libraries/dexie/models/chemical_usage_log.model'
import { db } from '../../../../libraries/dexie/db'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../../libraries/toast/CustomToastContainer'

export const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
  const SHEET_NAME = 'chemicals_usage_log'

  if (!e.target.files || !e.target.files.length) return

  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = async (readerEvent: ProgressEvent<FileReader>) => {
    const data = readerEvent.target?.result

    if (!data) {
      console.error('Files data is corrupted')
      return
    }

    const wb = XLSX.read(data, { type: 'buffer' })
    const ws = wb.Sheets[SHEET_NAME]

    if (!ws) {
      console.error(`Sheet "${SHEET_NAME}" does not exist in file!`)
      return
    }
    const rows: (string | number)[][] = XLSX.utils.sheet_to_json(ws, { header: 1 })

    if (!rows || !rows.length) {
      console.error(`Sheet "${SHEET_NAME}" does not contain any data!`)
    }

    // Save column indexes for each column from sheet
    const columnIndexes = { article_number: -1, order_size: -1, date: -1 }
    const headerRow = rows[0]

    for (const colName in columnIndexes) {
      columnIndexes[colName as keyof typeof columnIndexes] = headerRow.findIndex((cellValue) => cellValue === colName)

      if (columnIndexes[colName as keyof typeof columnIndexes] < 0) {
        console.error(`Column name ${colName} not found in the sheet "${SHEET_NAME}"`)
        return
      }
    }

    // loop throught each row of the sheet from top to bottom and push
    // an entry into db, if all field requirements are met
    // Do not break the loop if the row is empty or the requirements are not
    // met. Keep looping through all rows
    const dbEntries = []
    for (let i = 1; i < rows.length; i++) {
      const articleNumber = rows[i][columnIndexes.article_number]?.toString()
      if (!articleNumber) continue // Skip the row if article number is not present

      // Convert order_size to number and use 0 as fallback if NaN
      const orderSize = Number(rows[i][columnIndexes.order_size])
      if (isNaN(orderSize)) continue // Skip the row if order size is not a number

      // Convert date string to UTC and use null as fallback if conversion fails
      const dateUTC = dateStringToUTC(rows[i][columnIndexes.date]?.toString())
      if (dateUTC === null) continue // Skip the row if date conversion fails

      const chemicalUsageLogEntry: ChemicalUsageLog = {
        article_number: articleNumber,
        order_size: orderSize,
        date: dateUTC,
      }

      dbEntries.push(chemicalUsageLogEntry)
    }

    if (!dbEntries.length) {
      console.error('There were no valid entries found in the sheet!')
      return
    }
    await db.chemical_usage_logs
      .bulkAdd(dbEntries)
      .then(() => {
        toast.success(`Successfully added ${dbEntries.length} new entries in the Chemical Usage Log.`, customToastProps)
        // reload the page
        window.location.reload()
      })
      .catch((err) => {
        toast.error(`Failed to add new entries to database. Error: \n${err}`, customToastProps)
      })
  }
  reader.readAsArrayBuffer(file)
}
