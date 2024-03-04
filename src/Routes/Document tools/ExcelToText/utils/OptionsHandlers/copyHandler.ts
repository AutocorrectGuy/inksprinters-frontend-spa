import { toast } from 'react-toastify'
import { customToastProps } from '../../../../../libraries/toast/CustomToastContainer'

export const handleCopy = (inputText: string, successMessage = 'Text copied to clipboard!') => {
  navigator.clipboard
    .writeText(inputText)
    .then(() => toast.success(successMessage))
    .catch((err) => toast.error(`Failed to copy text: \n${err}`, customToastProps))
}
