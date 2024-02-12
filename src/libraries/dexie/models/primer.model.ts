import { DexieJsTable } from '../utils/schema'

export type Primer = {
  id?: number
  name: string
  description: string
  created_at: number
}

// Define the DexieJsTable for Primer
export const primerModel: DexieJsTable<Primer> = {
  id: { type: 'number', validation: [], autoIncrement: true },
  name: {
    type: 'string',
    validation: ['isValidText', 'isRequired'],
    unique: true,
  },
  description: { type: 'string', validation: ['isValidText'] },
  created_at: { type: 'number', validation: ['isNumeric'] },
}
