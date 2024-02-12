import { toast } from "react-toastify"
import { db } from "../../../../libraries/dexie/db"
import { Jig, jigModel } from "../../../../libraries/dexie/models/jig.model"
import { validateData } from "../../../../libraries/dexie/utils/validation"
import PATH_CONSTANTS from "../../../pathConstants"
import { customToastProps } from "../../../../libraries/toast/CustomToastContainer"
import { NavigateFunction } from "react-router-dom"
import { ChangeEvent, Dispatch, FormEvent, MutableRefObject, SetStateAction } from "react"

type InputEventType = { e: ChangeEvent<HTMLInputElement> }
type FromEventType = { e: FormEvent<HTMLFormElement> }

type HandleInputType = {
  setFormData: Dispatch<SetStateAction<Jig>>
  displayValueRef: MutableRefObject<{ [key: string]: string }>
}

type HandleSubmitType = {
  formData: Jig
  navigate: NavigateFunction
} & FromEventType

// Returns then number from string with regex
export const sanitizeStringToNumberAsString = (input: string) => {
  if (!input.trim())
    return 0

  const match = /-?\d*\.?\d+/.exec(input)
  if (!match)
    return 0

  const num = parseFloat(match[0])
  if (!isNaN(num) && isFinite(num))
    return num.toString()

  return 0
}

export const handleOnChangeNumber = ({ e, setFormData, displayValueRef }: HandleInputType & InputEventType) => {
  const name = e.target.name as keyof Jig
  const value = sanitizeStringToNumberAsString(e.target.value)

  displayValueRef.current[name] = e.target.value
  setFormData((formData) => ({ ...formData, [name]: value }));
}

export const handleOnBlur = ({ e, setFormData, displayValueRef }: HandleInputType & InputEventType) => {
  const name = e.target.name as keyof Jig

  // force reremder on losing focus of the inputfield
  setFormData((formData) => {
    displayValueRef.current[name] = `${formData[name]} mm`
    return ({ ...formData })
  })
};

export const handleSubmit = async ({ e, formData, setFormData, displayValueRef, navigate }: HandleInputType & HandleSubmitType) => {
  e.preventDefault()

  try {
    let jigToAdd = { ...formData, created_at: new Date().getTime() }
    validateData(jigToAdd, jigModel)
    await db.jigs.add(jigToAdd)
    toast.success(`jig ${formData.name} added successfully!`, customToastProps)
    navigate(PATH_CONSTANTS.PRINTING_RESOURCES.JIGS.VIEW_MANY) // Redirect to viewMany component
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    toast.error(errorMessage, customToastProps)
  }
}