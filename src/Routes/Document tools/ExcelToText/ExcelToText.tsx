import ExcelToTextTrigger from './components/ExcelToTextTrigger'
import { ExcelToTextContextProvider } from './contexts/ExcelToTextContext'

const ExcelToText = () => {
  return (
    <ExcelToTextContextProvider>
      <ExcelToTextTrigger />
    </ExcelToTextContextProvider>
  )
}

export default ExcelToText
