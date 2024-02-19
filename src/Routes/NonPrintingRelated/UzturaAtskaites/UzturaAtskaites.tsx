import { useEffect, useState } from 'react'
import DndComponent from './components/DndComponent';
import { PrintableMealsWithFoods } from './utils/food.utils';
import { PrintableNutritions } from './utils/totalNutrition.utils';
import { WorkDaySheetName, generatePrintableData } from './utils/readingExcel.utils';
import { createAndDownloadDocument } from './utils/generateDocx.utils';


export type Cells2d = Array<Array<string | number | null>>
export type CustomWorkBook = { [key in WorkDaySheetName]?: Cells2d }
export type PrintableData = { [key in WorkDaySheetName]?: { printableFoods: PrintableMealsWithFoods, nutrition: PrintableNutritions } }

const UzturaAtskaites = () => {
  const [wb, setWb] = useState<CustomWorkBook>({});
  const [printableData, setPrintableData] = useState<PrintableData>({})

  // reads the the excel file and generates JSON object that will be used for .docx file
  useEffect(() => {
    if (!Object.keys(wb).length)
      return

    generatePrintableData(wb, setPrintableData)
  }, [wb])

  // When JSON object is generated, creates .docx file
  useEffect(() => {
    if (!Object.keys(printableData).length)
      return

    createAndDownloadDocument(printableData)
  }, [printableData])

  return (
    <div className='min-h-screen bg-base-300 flex justify-center'>
      <div className='flex flex-col grow max-w-7xl w-full'>
        <div className='text-3xl text-neutral-200 font-semibold py-8'>
          Ģenerē uztura atskaites
        </div>
        <div className='flex flex-col grow w-full border border-base-100 p-4 rounded-lg'>
          {!Object.keys(wb).length
            ? <DndComponent wb={wb} setWb={setWb} />
            : <div className='flex flex-col grow w-full items-center justify-center'>
              {`Atskaite uzģenerēta sekmīgi. Word (.docx) fails tika lejupielādēts!`}
            </div>
            
          }
        </div>
      </div>

    </div>
  );
};

export default UzturaAtskaites

{/* <pre className='flex flex-col grow w-full whitespace-pre-wrap break-words'>
              {JSON.stringify(printableData, null, 2)}</pre> */}