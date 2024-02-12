import { toast } from 'react-toastify'
import { customToastProps } from '../../../../../libraries/toast/CustomToastContainer'

export const handleCopy = (inputText: string) => {
  navigator.clipboard
    .writeText(inputText)
    .then(() => toast.success('Text copied to clipboard!'))
    .catch((err) => toast.error(`Failed to copy text: \n${err}`, customToastProps))
}
