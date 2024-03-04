import React, { useEffect, useRef } from 'react'
import { Article } from '../../../../libraries/dexie/models/article.model'
import PATH_CONSTANTS from '../../../pathConstants'
import { Link } from 'react-router-dom'
import { arrayBufferToImageUrl } from '../../../../Utils/ImageConversion'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

type Props = {
  article: Partial<Article>
  index: number
  inputFieldText: string
  currentPage: number
}

const Card = (props: Props) => {
  return (
    <Link
      to={PATH_CONSTANTS.STORAGE.ARTICLES.VIEW_SINGLE + `?id=${props.article.id}`}
      state={{
        searchTextFromCard: props.inputFieldText,
        pageNumberFromCard: props.currentPage
      }}
      className={twMerge(
        'flex w-full flex-col rounded-lg p-3 shadow-md shadow-neutral-700 transition-transform duration-150 hover:scale-105 hover:shadow-none',
        props.index === 2 || props.index === 5 ? 'hover:-translate-x-[3%]' : '',
      )}
      style={{ background: 'linear-gradient(105deg, #E96671 0%, #723748 100%)' }}
    >
      <div className="flex grow flex-col rounded-md">
        <div className="relative flex w-full grow flex-col items-center justify-center rounded-t-md bg-white p-2">
          {props.article.image ? (
            <img
              src={arrayBufferToImageUrl(props.article.image)}
              alt={`article-${props.article.number}-${props.article.name}`}
              className="max-h-40 w-full object-contain"
            />
          ) : (
            <div className="flex w-full grow flex-col items-center justify-center p-10">
              <FontAwesomeIcon icon={faImage} className="w-auto grow text-black/20" />
            </div>
          )}
          <div className="absolute right-2 top-2 z-[3] h-8 w-fit rounded-sm bg-[#E96671] px-2 font-medium text-white">
            {props.article.number}
          </div>
        </div>
        <div className="rounded-b-md bg-white/80 py-1">
          <div className="flex h-[60px] justify-center overflow-hidden px-2 text-center text-lg font-semibold leading-5 text-neutral-700">
            {props.article.name}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
