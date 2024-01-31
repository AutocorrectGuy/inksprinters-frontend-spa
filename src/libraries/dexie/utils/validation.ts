/**
 *  Validation functions
 */

import { DexieJsTable, DexieJsTableColumn } from './schema'

export const isAlphaValidation = (value: string): boolean => /^[A-Za-z]+$/.test(value)

export const isNumericValidation = (value: any): boolean => !isNaN(parseFloat(value)) && isFinite(value)

export const isOptionalValidation = (value: any): boolean => value === null || value === undefined || value === ''

export const isRequiredValidation = (value: any): boolean => value !== null && value !== undefined && value !== ''

/**
 * Validation functions usage
 */
type ValidationFunction = (value: any) => boolean

// Define a map where the key is a string representing the function
interface ValidationFunctionMap {
  isAlpha?: ValidationFunction
  isNumeric?: ValidationFunction
  isOptional?: ValidationFunction
  isRequired?: ValidationFunction
  // Add more validation functions as needed
}

export type ValidationFunctionKey = keyof ValidationFunctionMap

const validationFunctions: ValidationFunctionMap = {
  isAlpha: isAlphaValidation,
  isNumeric: isNumericValidation,
  isOptional: isOptionalValidation,
  isRequired: isRequiredValidation,
}

export const validateData = <T>(value: T, specs: DexieJsTable<T>): void => {
  let errors: string[] = []

  Object.keys(specs).forEach((key) => {
    const fieldSpec = specs[key as keyof T]
    const fieldValue = value[key as keyof T]

    fieldSpec.validation?.forEach((validationKey) => {
      const validate = validationFunctions[validationKey as keyof ValidationFunctionMap]
      if (validate && !validate(fieldValue)) {
        errors.push(`Validation failed for '${validationKey}' in field '${key}' with value '${fieldValue}'.`)
      }
    })
  })

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }
}
