import React, { useEffect, useRef } from 'react'
import { Article } from '../../../../libraries/dexie/models/article.model'
import PATH_CONSTANTS from '../../../pathConstants'
import { Link } from 'react-router-dom'
import { arrayBufferToImageUrl } from '../../../../Utils/ImageConversion'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

const Card = (props: { article: Partial<Article>, index: number }) => {
  return (
    <Link to={PATH_CONSTANTS.STORAGE.ARTICLES.VIEW_SINGLE + `?id=${props.article.id}`}
      className={twMerge('flex flex-col w-full p-3 rounded-lg shadow-md shadow-neutral-700 hover:shadow-none hover:scale-105 transition-transform duration-150',
      props.index === 2 || props.index === 5 ? 'hover:-translate-x-[3%]' : ''
      )}
      style={{
        background: 'linear-gradient(105deg, #E96671 0%, #723748 100%)'
      }}
    >
      <div className='flex flex-col grow rounded-md'>
        <div className='flex flex-col grow w-full rounded-t-md relative p-2 items-center justify-center bg-white/90'>
          {
            props.article.image ?
              <img src={arrayBufferToImageUrl(props.article.image)} alt={`article-${props.article.number}-${props.article.name}`} className="w-full max-h-40 object-contain" />
              : <div className='flex justify-center items-center w-full flex-col grow p-10'>
                <FontAwesomeIcon icon={faImage} className="text-black/20 grow w-auto" />
              </div>
          }
          <div className='absolute h-8 bg-[#E96671] text-white top-2 right-2 w-fit font-medium px-2 z-[3] rounded-sm'>
            {props.article.number}
          </div>

        </div>
        <div className='py-1 bg-white/80 rounded-b-md'>
          <div className='flex justify-center leading-5 text-center font-semibold h-[60px] px-2 text-neutral-700 text-lg overflow-hidden'>
            {props.article.name}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card