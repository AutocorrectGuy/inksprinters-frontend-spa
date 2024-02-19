import { toast } from "react-toastify"
import { db } from "../../../../libraries/dexie/db"
import { JigTemplate, jigModel } from "../../../../libraries/dexie/models/jig.model"
import { validateData } from "../../../../libraries/dexie/utils/validation"
import PATH_CONSTANTS from "../../../pathConstants"
import { customToastProps } from "../../../../libraries/toast/CustomToastContainer"
import { NavigateFunction } from "react-router-dom"
import { ChangeEvent, Dispatch, FormEvent, MutableRefObject, SetStateAction } from "react"
import { carveOutNumberValue, clampNumber } from "./utils/numberSanitaze"

type InputEventType = { e: ChangeEvent<HTMLInputElement> }
type FromEventType = { e: FormEvent<HTMLFormElement> }
type HandleInputType = {
  setFormData: Dispatch<SetStateAction<JigTemplate>>
  displayValueRef: MutableRefObject<{ [key: string]: string }>
  clamp?: { min: number, max: number }
}
type HandleSubmitType = {
  formData: JigTemplate
  navigate: NavigateFunction
} & FromEventType


export const handleOnChangeNumber = ({ e, setFormData, displayValueRef, clamp }: HandleInputType & InputEventType) => {
  const name = e.target.name as keyof JigTemplate
  const carvedNumber = carveOutNumberValue(e.target.value)
  const clampedNumber = clampNumber(carvedNumber, clamp)

  displayValueRef.current[name] = e.target.value
  setFormData((formData) => ({ ...formData, [name]: clampedNumber }));
}

export const handleOnBlurNumber = ({ e, setFormData, displayValueRef, addMm }: HandleInputType & InputEventType & { addMm?: boolean }) => {
  const name = e.target.name as keyof JigTemplate

  // force reremder on losing focus of the inputfield
  setFormData((formData) => {
    const displayNumber = `${formData[name]}`
    displayValueRef.current[name] = addMm ? `${displayNumber} mm` : displayNumber
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