import { useDropzone } from "react-dropzone";
import * as XLSX from 'xlsx'
import { Cells2d, CustomWorkBook } from "../UzturaAtskaites";
import { WORKDAY_SHEET_NAMES, WorkDaySheetName } from "../utils/readingExcel.utils";

type Props = {
  wb: CustomWorkBook
  setWb: React.Dispatch<React.SetStateAction<CustomWorkBook>>
}

const DndComponent = (props: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => {
      if (files.length !== 1) {
        console.log('Only one file can be accepted at a time!');
        return;
      }
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = (e) => {

        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'buffer' });

        let wb:{[key in WorkDaySheetName]?: Cells2d} = {}

        WORKDAY_SHEET_NAMES.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName]
          wb[sheetName] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
        })

        props.setWb(wb)
      };
      reader.readAsArrayBuffer(files[0]);
    },
  });
  return (
    <div className="flex flex-col grow w-full" {...getRootProps()}>
      <input className="flex flex-col grow w-full" {...getInputProps()} />
      {isDragActive ? (
        <div className="rounded-lg flex flex-col grow w-full bg-base-100 text-neutral-200 items-center justify-center cursor-pointer text-2xl">
          Pareizi! Velc excel failu te!
        </div>
      ) : (
        <div className="rounded-lg flex flex-col grow w-full bg-base-100 text-neutral-200 items-center justify-center cursor-pointer text-2xl">
          <p>Uzklikšķini vai ievelc <span className="text-emerald-600 font-semibold">excel</span> failu šeit</p>
        </div>
      )}
    </div>
  )
}

export default DndComponent