import { DexieJsTable } from '../utils/schema'

export type Setting = {
  id?: number
  key: string
  value: any
}

export const settingModel: DexieJsTable<Setting> = {
  id: { type: 'number', validation: [], autoIncrement: true },
  key: { type: 'string', validation: ['isValidText'] },
  value: { type: 'any' },
}
