import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Article } from '../../../../libraries/dexie/models/article.model'
import { db } from '../../../../libraries/dexie/db'
import PATH_CONSTANTS from '../../../pathConstants'
import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'
import FlipCard from '../../../../Layouts/MainLayout/components/FlipCard/FlipCard'
import moment from 'moment'
import OptionsCog from './OptionsCog'

const flipCardHeight = {
  total: 480,
  image: 192,
}

const ViewSingle = () => {
  const [article, setArticle] = useState<Article | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')

  const navigateBack = () => navigate(PATH_CONSTANTS.STORAGE.ARTICLES.MENU)
  useEffect(() => {
    if (!articleId) {
      navigateBack()
      return
    }

    const fetchArticle = async () => {
      const fetchedArticle = await db.articles.get(parseInt(articleId))
      fetchedArticle
        ? setArticle(fetchedArticle)
        : navigate(PATH_CONSTANTS.STORAGE.ARTICLES.MENU)
    }
    fetchArticle()
  }, [articleId, navigate])

  return (
    <MainContentContainer h1={article ? article.name : ''} linkBackTo={PATH_CONSTANTS.STORAGE.ARTICLES.SEARCH}>
      <div className='grow flex flex-col items-center justify-center'>
        {/* <button className='btn btn-primary text-lg w-24 flex'>Edit</button> */}
        <div className='flex grow w-full p-4 items-center justify-center border-b-white/10'>
          <FlipCard article={article} flipCardHeight={flipCardHeight} />
          <div className='flex transition-all duration-500 pl-4'>
            {article &&
              <div className='relative flex flex-col justify-center items-start border border-white/5 rounded-xl min-w-[300px] max-w-[512px] p-8 bg-white/5'
                style={{ height: flipCardHeight.total }}
              >
                <table className="h-fit text-lg">
                  <tbody>
                    <tr className='align-top'>
                      <td className="text-right pr-4 whitespace-nowrap py-1">Jig</td>
                      <td className="font-bold py-1">{article.jig_id}</td>
                    </tr>
                    <tr className='align-top'>
                      <td className="text-right pr-4 whitespace-nowrap py-1">Primer</td>
                      <td className="font-bold py-1">{article.primer_id}</td>
                    </tr>
                    <tr className='align-top'>
                      <td className="text-right pr-4 whitespace-nowrap py-1">Priming duration</td>
                      <td className="font-thin py-1">{article.priming_duration} seconds</td>
                    </tr>
                    <tr className='align-top'>
                      <td className="text-right pr-4 whitespace-nowrap py-1">Alignment</td>
                      <td className="font-bold py-1">{article.alignment}</td>
                    </tr>
                    <tr className='align-top'>
                      <td className="text-right pr-4 whitespace-nowrap py-1">Rotation</td>
                      <td className="font-thin py-1">{article.rotation}</td>
                    </tr>
                    <tr className='align-top'>
                      <td className="text-right pr-4 whitespace-nowrap">Image width</td>
                      <td className="font-thin">{article.image_w} mm</td>
                    </tr>
                    <tr className='align-top'>
                      <td className="text-right pr-4 whitespace-nowrap py-1">Image height</td>
                      <td className="font-thin py-1">{article.image_w} mm</td>
                    </tr>
                    <tr className='align-top'>
                      <td className="text-right pr-4 whitespace-nowrap py-1">Notes</td>
                      <td className="font-thin text-yellow-400 py-1">{article.notes ?? 'none'}</td>
                    </tr>
                    <tr className='align-top'>
                      <td className="text-right pr-4 whitespace-nowrap py-1">Created</td>
                      <td className='font-thin py-1'>{moment(article.created_at).fromNow()}</td>
                    </tr>
                  </tbody>
                </table>
                <div className='absolute top-2 right-2'>
                  {article.id && <OptionsCog article={article} />}
                </div>
              </div>
            }
          </div>
        </div>
      </div >
    </MainContentContainer>
  )
}

export default ViewSingle
