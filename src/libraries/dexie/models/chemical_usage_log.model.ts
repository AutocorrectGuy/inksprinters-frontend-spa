import { DexieJsTable } from '../utils/schema'

export type ChemicalUsageLog = {
  id?: number
  article_number: string
  order_size: number
  date: number
}

// Define the DexieJsTable for Primer
export const chemicalUsageLogModel: DexieJsTable<ChemicalUsageLog> = {
  id: { type: 'number', validation: [], autoIncrement: true },
  article_number: { type: 'string', validation: ['isValidText', 'isRequired'] },
  order_size: { type: 'number', validation: ['isRequired', 'isNumeric'] },
  date: { type: 'number', validation: ['isRequired', 'isNumeric'] },
}
