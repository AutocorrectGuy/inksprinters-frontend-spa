import React from 'react'
import { arrayBufferToImageUrl } from '../../../../Utils/ImageConversion'
import { Article } from '../../../../libraries/dexie/models/article.model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

type Props = {
  article: Article | null
  imageLoaded: boolean
  flipCardHeight: { [key: string]: number }
}

const FrontSide = ({ article, imageLoaded, flipCardHeight }: Props) => {
  return (
    <div className='grow flex flex-col items-center justify-center'>
      {article && <div className='flex flex-col grow items-center justify-center'>
        <div className="w-[300px] rounded-xl p-4 flex flex-col grow"
          style={{ background: 'linear-gradient(105deg, #E96671 0%, #723748 100%)' }}
        >
          <div className="relative pb-1 pt-4 px-1 flex justify-center items-center rounded-t-md bg-white"
            style={{ height: flipCardHeight.image }}
          >
            {
              article.image && imageLoaded
                ? <img src={arrayBufferToImageUrl(article.image)} alt="Article image" className="z-[2] max-w-full max-h-full object-contain" />
                : <FontAwesomeIcon icon={faImage} className="z-[2] h-[80%] text-black/20" />
            }
            <div className='absolute h-8 bg-[#E96671] text-white -bottom-4 right-4 font-medium px-2 z-[3] rounded-sm'>
              {article.number}
            </div>
          </div>
          <div className="px-1 py-4 bg-white/80 rounded-b-md flex flex-col grow"
          >
            <div className={`relative font-bold text-center text-neutral-800 px-4 h-[74px] text-2xl overflow-hidden ${article.name.length > 19 ? 'leading-7' : 'leading-8'}`}
            >
              {article.name}
            </div>
            <div className='flex flex-col grow text-gray-700 leading-6'>
              <div className='flex flex-col grow justify-center'>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mx-auto py-4 w-full">
                  <div className="text-right">Horizontal</div>
                  <div className='font-bold'>{article.x} mm</div>
                  <div className="text-right">Vertical</div>
                  <div className='font-bold'>{article.y} mm</div>
                  <div className="text-right">Media Height</div>
                  <div className='font-bold'>{article.z} mm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default FrontSide