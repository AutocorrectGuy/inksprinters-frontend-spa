import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'
import MainContentContainer from '../../../../../../Layouts/MainLayout/components/MainLayoutContainer'
import { Article } from '../../../../../../libraries/dexie/models/article.model'
import { db } from '../../../../../../libraries/dexie/db'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../../../../libraries/toast/CustomToastContainer'
import { useNavigate } from 'react-router-dom'
import PATH_CONSTANTS from '../../../../../pathConstants'
import { updateArticleAndFetchJig, updateArticleAndFetchPrimer } from '../../../Utils/UpdateAndFetch'

export type Cells2d = Array<Array<string | number | null>>
// row (string | number)[]

const AddUsingExcel = () => {
  const navigate = useNavigate()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files: File[]) => {
      if (files.length !== 1) {
        console.error('Only one file can be accepted at a time!');
        return;
      }
      const reader = new FileReader();
      reader.onabort = () => console.error('file reading was aborted');
      reader.onerror = () => console.error('file reading has failed');
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'buffer' });

          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const cells: (string | number)[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          const columnNames = cells[0]; // cells[0] contains column names

          const articles = await Promise.all(cells
            .slice(1)
            .filter(row => row[1] && row[2]) // use only rows which have something in `article_number` and `name` cells
            .map(async (row: (string | number)[]) => {
              const article: Partial<Article> = { name: '', priming_duration: 0, created_at: Date.now() };

              row.forEach((cell, index) => {
                const columnName = columnNames[index] as string;
                switch (columnName.toLowerCase()) {
                  case 'article_number':
                    article.number = cell.toString() ?? '-';
                    break;
                  case 'name':
                    article.name = cell.toString() ?? '-';
                    break;
                  case 'x':
                    article.x = Number(cell);
                    break;
                  case 'y':
                    article.y = Number(cell);
                    break;
                  case 'z':
                    article.z = Number(cell);
                    break;
                  case 'alignment':
                    article.alignment = cell.toString() ?? '-';
                    break;
                  case 'image_w':
                    article.image_w = Number(cell);
                    break;
                  case 'image_h':
                    article.image_h = Number(cell);
                    break;
                  case 'rotation':
                    article.rotation = cell.toString() ?? '-';
                    break;
                  case 'notes':
                    article.notes = cell.toString() ?? undefined;
                    break;
                  case 'priming_duration':
                    article.priming_duration = Number(cell);
                    break;
                  case 'image_name':
                    article.imported_image_name = cell.toString() ?? undefined
                    break;
                  case 'jig_name':
                    article.imported_jig_name = cell.toString() ?? null;
                    break;
                  case 'primer':
                    article.imported_primer_name = cell.toString() ?? null;
                    break;
                  // Add more cases as needed
                  default:
                    break;
                }
              })
              return article as Article;
            }))

          // add articles to db
          await db.articles.bulkAdd(articles);

          // assign jigs and primers from other db tables AFTER they are added to db
          const fetchedArticles = await db.articles.toArray()
          for (const article of fetchedArticles) {
            if (article) {
              await updateArticleAndFetchJig(article);
              await updateArticleAndFetchPrimer(article);
            }
          }
          toast.success(`${articles.length} articles added successfully!`, customToastProps);
          navigate(PATH_CONSTANTS.STORAGE.ARTICLES.SEARCH);
        } catch (error) {
          console.error('Error processing file:', error);
          toast.error('Failed to load articles', customToastProps);
        }
      };
      reader.readAsArrayBuffer(files[0]);
    },
  });

  return (
    <MainContentContainer h1="Add articles from excel file">
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
