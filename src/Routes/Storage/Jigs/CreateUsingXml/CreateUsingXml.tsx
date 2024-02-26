import { useEffect, useState } from 'react'
import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'
import { JigTemplateAsXML, jigXMLTemplateToJigTemplate, parseXmlToTemplates } from './parseXmlToJson'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../../libraries/toast/CustomToastContainer'
import { JigTemplate } from '../../../../libraries/dexie/models/jig.model'
import DisplayJig from '../components/DisplayJig'
import { db } from '../../../../libraries/dexie/db'
import { useNavigate } from 'react-router-dom'
import PATH_CONSTANTS from '../../../pathConstants'

const CreateUsingXml = () => {
  const [fileContents, setFileContents] = useState<string>('')
  const [loadedJigTemplates, setLoadedJigTemplates] = useState<JigTemplate[]>([])
  const navigate = useNavigate()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => {
      const reader = new FileReader()
      if (!files.length)
        return

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result
        if (!result || typeof result !== 'string') {
          toast.error('Error while loading reading the file!', customToastProps)
          return
        }
        setFileContents(result)
      }
      reader.readAsText(files[0])
    }
  })

  useEffect(() => {
    // Try to convert the file content (as text) to an array of `Template` objects
    if (!fileContents.length)
      return

    const loadedXmlTemplates = parseXmlToTemplates(fileContents)
    if (!loadedXmlTemplates.length) {
      toast.error('Failed to read jig data from file!', customToastProps)
      return
    }

    const jigModelsToInsert: JigTemplate[] = loadedXmlTemplates.map(xmlTemplate => jigXMLTemplateToJigTemplate(xmlTemplate))
    db.jigs.bulkAdd(jigModelsToInsert)
      .then(() => {
        navigate(PATH_CONSTANTS.STORAGE.JIGS.VIEW_MANY)
        toast.success(`${jigModelsToInsert.length} jigs added successfully!`)
      })
      .catch((err) => toast.error(err.message.replace('jigs.bulkAdd(): ', ''), customToastProps))

  }, [fileContents])



  return (
    <MainContentContainer h1="Add jigs using xml data" fullWidth={Boolean(loadedJigTemplates.length)}>
      <div className={`flex w-full grow flex-col ${!loadedJigTemplates.length ? 'items-center justify-center' : ''}`}>
        <div {...getRootProps()} className='file-input border w-fit flex items-center justify-center p-8 text-lg'>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p className=''>Drop the files here ...</p> :
              <p className=''>Drag 'n' drop
                <span className='px-1 mx-1 bg-[#CA5160] rounded-md text-base-300 font-semibold'>
                  .ach
                </span>
                or
                <span className='px-1 mx-1 bg-[#CA5160] rounded-md text-base-300 font-semibold'>
                  .xml
                </span>
                file here, or click to select files</p>
          }
        </div>

      </div>
    </MainContentContainer>
  )
}

export default CreateUsingXml
