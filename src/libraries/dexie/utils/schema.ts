import { ValidationFunctionKey } from './validation'

export type DexieJsTableColumn = {
  type: 'string' | 'number' | 'image' | 'boolean' | 'any'
  validation?: ValidationFunctionKey[]
  autoIncrement?: boolean
  unique?: boolean
}

export type DexieJsTable<T> = {
  [P in keyof T]: DexieJsTableColumn
}

export const generateDexieSchemaString = (tableSpecs: {
  [key: string]: DexieJsTableColumn
}): string => {
  return Object.entries(tableSpecs)
    .map(([key, spec]) => {
      let fieldSchema = ''
      if (spec.autoIncrement) {
        fieldSchema = '++'
      } else if (spec.unique) {
        fieldSchema = '&'
      }
      fieldSchema += key
      return fieldSchema
    })
    .join(', ')
}
