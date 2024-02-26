import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'
import MainContentContainer from '../../../../../../Layouts/MainLayout/components/MainLayoutContainer'
import { Article } from '../../../../../../libraries/dexie/models/article.model'
import { db } from '../../../../../../libraries/dexie/db'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../../../../libraries/toast/CustomToastContainer'
import { useNavigate } from 'react-router-dom'
import PATH_CONSTANTS from '../../../../../pathConstants'

export type Cells2d = Array<Array<string | number | null>>

const AddUsingExcel = () => {
  const navigate = useNavigate()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => {
      if (files.length !== 1) {
        console.log('Only one file can be accepted at a time!')
        return
      }
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = (e) => {
        try {
          const data = e.target?.result
          const workbook = XLSX.read(data, { type: 'buffer' })

          const worksheet = workbook.Sheets[workbook.SheetNames[0]]
          const cells: (string | number)[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

          // Assuming cells[0] contains column names
          const columnNames = cells[0]

          const articles = cells
            .slice(1)
            .map((row) => {
              const article: Article = { name: '', priming_duration: 0, created_at: Date.now() }
              row.forEach((cell, index) => {
                const columnName = columnNames[index] as string
                // Map the Excel columns to your Article model properties
                switch (columnName.toLowerCase()) {
                  case 'article_number':
                    article.number = cell as string ?? '-'
                    break
                  case 'name':
                    article.name = cell as string ?? '-'
                    break
                  case 'x':
                    article.x = Number(cell)
                    break
                  case 'y':
                    article.y = Number(cell)
                    break
                  case 'z':
                    article.z = Number(cell)
                    break
                  // TODO: MAL NAME
                  case 'alignment':
                    article.alignment = cell as string ?? '-'
                    break
                  case 'image_name':
                    article.image_name = cell as string ?? null
                    break
                  case 'image_w':
                    article.image_w = Number(cell) ?? 0
                    break
                  case 'image_h':
                    article.image_h = Number(cell) ?? 0
                    break
                  case 'rotation':
                    article.rotation = cell as string ?? '-'
                    break
                  case 'notes':
                    article.notes = cell as string
                    break
                  // TODO: PRIMERS
                  case 'priming_duration':
                    article.priming_duration = Number(cell) ?? 0
                    break
                  default:
                    break
                }
              })
              return article
            })
            .filter((article) => article.name) // Filter out rows where the name (or another key field) is empty

          // Bulk save the articles to Dexie.js
          // Assuming db is your Dexie database instance and articles is the table name
          db.articles
            .bulkAdd(articles)
            .then(() => {
              toast.success(`${articles.length} articles added successfully!`, customToastProps)
              navigate(PATH_CONSTANTS.STORAGE.ARTICLES.SEARCH)
            })
            .catch(() => {
              toast.error('Failed to load articles', customToastProps)
            })
        } catch (error) {
          console.error('Error processing file:', error)
        }
      }
      reader.readAsArrayBuffer(files[0])
    },
  })

  return (
    <MainContentContainer h1="Add articles from excel file" linkBackTo={PATH_CONSTANTS.STORAGE.ARTICLES.ADD.FROM_FILE.MENU}>
      <div className='flex flex-col grow w-full p-8'>
        <div {...getRootProps()} className="flex flex-col grow w-full file-input items-center justify-center border-4 border-dashed border-emerald-500 p-8 text-2xl rounded-lg bg-transparent cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive
            ? <p className="flex flex-col grow w-full">Drop the files here ...</p>
            : <p className="flex flex-col grow w-full items-center justify-center">
              <span className=''>
                <span>Drag and drop or click to upload</span>
                <span className="mx-1 rounded-md bg-emerald-600 px-1 font-semibold text-base-300">excel</span>
                <span>file</span>
              </span>
            </p>
          }
        </div>
      </div>
    </MainContentContainer>
  )
}

export default AddUsingExcel
