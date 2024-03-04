import React, { useEffect, useRef, useState } from 'react'
import { arrayBufferToImageUrl } from '../../../../Utils/ImageConversion'
import { Article } from '../../../../libraries/dexie/models/article.model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faImage } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../../libraries/toast/CustomToastContainer'
import { handleCopy } from '../../../../Routes/Document tools/ExcelToText/utils/OptionsHandlers/copyHandler'

type Props = {
  article: Article | null
  imageLoaded: boolean
  flipCardHeight: { [key: string]: number }
}

const DESIRED_NAME_REF_HEIGHT = 120
const COPY_SUCCESS_TEXT = 'Position copied successfully!'

const FrontSide = ({ article, imageLoaded, flipCardHeight }: Props) => {
  const handleCopyClick = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success('Position copied successfully!', customToastProps))
      .catch((err) => toast.error(`Failed to copy positions. Error: \n${err}`, customToastProps))
  }

  return (
    <div className="flex grow flex-col items-center justify-center">
      {article && (
        <div className="flex grow flex-col items-center justify-center">
          <div
            className="flex w-[300px] grow flex-col rounded-xl p-4"
            style={{ background: 'linear-gradient(105deg, #E96671 0%, #723748 100%)' }}
          >
            <div
              className="relative flex items-center justify-center rounded-t-md bg-white px-1 pb-1 pt-4"
              style={{ height: flipCardHeight.image }}
            >
              {article.image && imageLoaded ? (
                <img
                  src={arrayBufferToImageUrl(article.image)}
                  alt="Article image"
                  className="z-[2] max-h-full max-w-full object-contain"
                />
              ) : (
                <FontAwesomeIcon icon={faImage} className="z-[2] h-[80%] text-black/20" />
              )}
              <div className="absolute -bottom-4 right-4 z-[3] h-8 rounded-sm bg-[#E96671] px-2 font-medium text-white">
                {article.number}
              </div>
            </div>
            <div className="flex grow flex-col rounded-b-md bg-white/80 px-1 py-3">
              <div
                className={`flex items-center justify-center px-4 py-1 text-center text-2xl font-bold leading-7 text-neutral-800`}
                style={{ height: DESIRED_NAME_REF_HEIGHT }}
              >
                {article.name}
              </div>
              <div className="flex grow flex-col leading-6 text-gray-700">
                <div className="flex grow flex-col justify-center">
                  <div className="mx-auto grid w-full grid-cols-2 gap-x-2 py-2">
                    <div className="select-none py-1 text-right">Horizontal</div>
                    <div
                      onClick={() => article.x && handleCopy(article.x?.toString() || '', COPY_SUCCESS_TEXT)}
                      className="flex w-fit cursor-pointer items-center rounded-lg px-2 py-1 font-bold hover:bg-black/5"
                    >
                      <span className="pr-2">{article.x ? `${article.x} mm` : 'none'}</span>
                      {article.x && <FontAwesomeIcon className="text-neutral-400" icon={faCopy} />}
                    </div>
                    <div className="select-none py-1 text-right">Vertical</div>
                    <div
                      onClick={() => article.y && handleCopy(article.y?.toString() || '', COPY_SUCCESS_TEXT)}
                      className="flex w-fit cursor-pointer items-center rounded-lg px-2 py-1 font-bold hover:bg-black/5"
                    >
                      <span className="pr-2">{article.y ? `${article.y} mm` : 'none'}</span>
                      {article.y && <FontAwesomeIcon className="text-neutral-400" icon={faCopy} />}
                    </div>
                    <div className="select-none py-1 text-right">Media Height</div>
                    <div
                      onClick={() => article.z && handleCopy(article.z?.toString() || '', COPY_SUCCESS_TEXT)}
                      className="flex w-fit cursor-pointer items-center rounded-lg px-2 py-1 font-bold hover:bg-black/5"
                    >
                      <span className="pr-2">{article.z ? `${article.z} mm` : 'none'}</span>
                      {article.z && <FontAwesomeIcon className="text-neutral-400" icon={faCopy} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FrontSide
