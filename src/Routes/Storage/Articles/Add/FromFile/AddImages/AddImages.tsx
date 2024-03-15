import React from 'react'
import { useNavigate } from 'react-router-dom'
import MainContentContainer from '../../../../../../Layouts/MainLayout/components/MainLayoutContainer'
import PATH_CONSTANTS from '../../../../../pathConstants'
import { useDropzone } from 'react-dropzone'
import { db } from '../../../../../../libraries/dexie/db'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../../../../libraries/toast/CustomToastContainer'

type Props = {}

const AddImages = (props: Props) => {
  const navigate = useNavigate()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDrop: async (files: File[]) => {
      
      if(!files || !files.length) {
        toast.error('No images have been added!', customToastProps)
        return
      }

      // Loop through each file and count how many images have been added
      let imagesAddedCount = 0
      for (const file of files) {
        // Read the file name without extension
        const fileName = file.name.replace(/\.[^/.]+$/, "");

        try {
          // Check if the file name matches any article image name in the database
          const matchingArticle = await db.articles
            .where('imported_image_name')
            .equalsIgnoreCase(fileName)
            .first();

          if (matchingArticle) {
            // Convert file to ArrayBuffer and update the article
            const arrayBuffer = await file.arrayBuffer();
            matchingArticle.image = arrayBuffer;
            delete matchingArticle.imported_image_name
            await db.articles.put(matchingArticle);
            imagesAddedCount++
          } else {
            console.error(`No matching article for image "${fileName}"`);
          }
        } catch (error) {
          console.error('Error updating image for article:', error);
        }
      }

      imagesAddedCount 
        ? toast.success(`${imagesAddedCount} images have been added successfully!`, customToastProps)
        : toast.error('No images were added', customToastProps)
      
      navigate(PATH_CONSTANTS.STORAGE.ARTICLES.SEARCH)
    },
  });

  return (
    <MainContentContainer h1='Import images for articles'>
      <div className='flex flex-col grow w-full p-8'>
        <div {...getRootProps()} className="flex flex-col grow w-full file-input items-center justify-center border-4 border-dashed border-[#878D8D] p-8 text-2xl rounded-lg bg-transparent cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive
            ? <p className="flex flex-col grow w-full">Drop the images here ...</p>
            : <p className="flex flex-col grow w-full items-center justify-center">
              Drag and drop or click to upload images
            </p>
          }
        </div>
      </div>
    </MainContentContainer>
  )
}

export default AddImages