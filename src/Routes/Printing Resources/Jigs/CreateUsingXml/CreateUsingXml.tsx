import { useEffect, useState } from 'react'
import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'
import { JigTemplateAsXML, jigXMLTemplateToJigTemplate, parseXmlToTemplates } from './parseXmlToJson'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../../libraries/toast/CustomToastContainer'
import { JigTemplate } from '../../../../libraries/dexie/models/jig.model'
import DisplayJig from '../components/DisplayJig'

const CreateUsingXml = () => {
  const [fileContents, setFileContents] = useState<string>('')
  const [loadedJigTemplates, setLoadedJigTemplates] = useState<JigTemplate[]>([])

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

    const templatesFromFileContents = parseXmlToTemplates(fileContents)
    const jigModel = jigXMLTemplateToJigTemplate(templatesFromFileContents[0])
    console.log(jigModel)

    setLoadedJigTemplates(() => {
      return [jigModel]
    })
  }, [fileContents])



  return (
    <MainContentContainer h1="Add jigs using xml data" fullWidth={Boolean(loadedJigTemplates.length)}>
      <div className={`flex w-full grow flex-col ${!loadedJigTemplates.length ? 'items-center justify-center' : ''}`}>
        {
          !loadedJigTemplates.length
            ? <div {...getRootProps()} className='file-input border w-fit flex items-center justify-center p-8 text-lg'>
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
            : <DisplayJig jigTemplate={loadedJigTemplates[0]} />
        }

      </div>
    </MainContentContainer>
  )
}

export default CreateUsingXml
