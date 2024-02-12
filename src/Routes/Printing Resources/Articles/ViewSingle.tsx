import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Article, articleModel } from '../../../libraries/dexie/models/article.model'
import { db } from '../../../libraries/dexie/db'
import PATH_CONSTANTS from '../../pathConstants'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack'
import LoadingSpinner from '../../../Layouts/MainLayout/components/DexieJsCrud/LoadingSpinner'
import FlipCard from '../../../Layouts/MainLayout/components/FlipCard/FlipCard'
import moment from 'moment'

const flipCardHeight = {
  total: 480,
  image: 192,
}

const ViewSingle = () => {
  const [article, setArticle] = useState<Article | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')

  const navigateBack = () => navigate(PATH_CONSTANTS.PRINTING_RESOURCES.ARTICLES.VIEW_MANY)
  useEffect(() => {
    if (!articleId) {
      navigateBack()
      return
    }

    const fetchArticle = async () => {
      const fetchedArticle = await db.articles.get(parseInt(articleId))
      fetchedArticle
        ? setArticle(fetchedArticle)
        : navigate(PATH_CONSTANTS.PRINTING_RESOURCES.ARTICLES.VIEW_MANY)
    }
    fetchArticle()
  }, [articleId, navigate])


  return (
    <MainContentContainer h1={article ? article.name : ''}>
      <div className='grow flex flex-col items-center justify-center'>
        {/* <button className='btn btn-primary text-lg w-24 flex'>Edit</button> */}
        <div className='flex grow w-full p-4 items-center'>
          <FlipCard article={article} flipCardHeight={flipCardHeight} />
          <div className='flex pl-4 grow transition-all duration-500'>
            {article &&
              <div className='flex flex-col grow justify-center items-start'>
                <div className='text-neutral-100 text-2xl font-semibold pb-12 text-center w-full'>Article overview</div>
                <table className="h-fit text-lg">
                  <tbody>
                    <tr>
                      <td className="text-right px-4 py-1">Jig</td>
                      <td className="font-bold">{article.jig_id}</td>
                    </tr>
                    <tr>
                      <td className="text-right px-4 py-1">Primer</td>
                      <td className="font-bold">{article.primer_id}</td>
                    </tr>
                    <tr>
                      <td className="text-right px-4 py-1">Alignment</td>
                      <td className="font-bold">{article.alignment}</td>
                    </tr>
                    <tr>
                      <td className="text-right px-4 py-1">Rotation</td>
                      <td className="font-thin">{article.rotation}</td>
                    </tr>
                    <tr>
                      <td className="text-right px-4 py-1">Image width</td>
                      <td className="font-thin">{article.image_w} mm</td>
                    </tr>
                    <tr>
                      <td className="text-right px-4 py-1">Image height</td>
                      <td className="font-thin">{article.image_w} mm</td>
                    </tr>
                    <tr>
                      <td className="text-right px-4 py-1">Notes</td>
                      <td className="font-thin text-yellow-400">{article.notes ?? 'none'}</td>
                    </tr>
                    <tr>
                      <td className="text-right px-4 py-1">Created</td>
                      <td className='font-thin'>{moment(article.created_at).fromNow()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
        <div className='flex w-full justify-end p-2'>
          <BtnBack to={PATH_CONSTANTS.PRINTING_RESOURCES.ARTICLES.VIEW_MANY} />
        </div>
      </div >
    </MainContentContainer>
  )
}

export default ViewSingle
