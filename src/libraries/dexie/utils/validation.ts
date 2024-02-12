/**
 *  Validation functions
 */

import { DexieJsTable } from './schema'

type ValidationFunction = (value: any) => boolean

type ValidationFunctionMap = {
  isAlpha?: ValidationFunction
  isNumeric?: ValidationFunction
  isBoolean?: ValidationFunction
  isAlphaNumeric?: ValidationFunction
  isValidText?: ValidationFunction
  isOptional?: ValidationFunction
  isRequired?: ValidationFunction
}

export type ValidationFunctionKey = keyof ValidationFunctionMap

export const isAlpha = (value: string): boolean => /^[A-Za-z]+$/.test(value)
export const isNumeric = (value: any): boolean => !isNaN(parseFloat(value)) && isFinite(value)
export const isBoolean = (value: any): boolean => typeof value === 'boolean'
export const isAlphaNumeric = (value: string): boolean => /^[A-Za-z0-9]+$/.test(value)
export const isValidText = (value: string): boolean =>
  /^[A-Za-z0-9\s!@#$%^&*()\-_+=\[\]{}\\|;:'",.<>?/`~]*$/.test(value)
export const isRequired = (value: any): boolean => value !== null && value !== undefined && value !== ''

const validationFunctions: ValidationFunctionMap = {
  isAlpha,
  isNumeric,
  isBoolean,
  isAlphaNumeric,
  isValidText,
  isRequired,
}

export const validateData = <T>(value: T, model: DexieJsTable<T>, sanitizeObject = true): void => {
  let errors: string[] = []

  Object.keys(model).forEach((key) => {
    const fieldSpec = model[key as keyof T]
    const fieldValue = value[key as keyof T]
    const isFieldRequired = fieldSpec.validation?.includes('isRequired')

    // If the field is not required and the value is null or undefined, skip validation
    if (!isFieldRequired && (fieldValue === null || fieldValue === undefined)) return

    // Perform validations
    fieldSpec.validation?.forEach((validationKey) => {
      const validate = validationFunctions[validationKey as keyof ValidationFunctionMap]
      if (validationKey !== 'isRequired' && !isFieldRequired) return
      if (validate && !validate(fieldValue))
        errors.push(`Validation failed for '${validationKey}' in field '${key}' with value '${fieldValue}'.`)
    })
  })

  if (errors.length > 0) throw new Error(errors.join('\n'))
  if (sanitizeObject) sanitizeObjectKeys(value as Record<string, any>, model)
}

const sanitizeObjectKeys = <T>(obj: Record<string, any>, model: DexieJsTable<T>): void => {
  // Ensure all keys from the model are present in obj
  Object.keys(model).forEach((key) => {
    if (obj[key] === undefined || obj[key] === null || (typeof obj[key] === 'string' && obj[key].trim() === '')) {
      delete obj[key]
    }
  })
}
