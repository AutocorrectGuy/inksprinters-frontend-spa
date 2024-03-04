import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Article } from '../../../../libraries/dexie/models/article.model'
import { db } from '../../../../libraries/dexie/db'
import PATH_CONSTANTS from '../../../pathConstants'
import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'
import FlipCard from '../../../../Layouts/MainLayout/components/FlipCard/FlipCard'
import moment from 'moment'
import OptionsCog from './OptionsCog'
import { JigTemplate } from '../../../../libraries/dexie/models/jig.model'
import { Primer } from '../../../../libraries/dexie/models/primer.model'
import { updateArticleAndFetchJig, updateArticleAndFetchPrimer } from '../Utils/UpdateAndFetch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tooltip'
import ConditionalLinkWithState from './ConditionalLinkWithState'
import { twMerge } from 'tailwind-merge'

type ArticleData = { article: Article | null, jig: JigTemplate | null, primer: Primer | null }

const flipCardHeight = {
  total: 480,
  image: 192,
}

const ViewSingle = () => {
  const location = useLocation()
  const { searchTextFromCard, pageNumberFromCard } = location.state || {}

  const [articleData, setArticleData] = useState<ArticleData>({ article: null, jig: null, primer: null })
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')

  const notesModalRef = useRef<HTMLDialogElement>(null)

  const navigateBack = () => navigate(PATH_CONSTANTS.STORAGE.ARTICLES.MENU)
  useEffect(() => {
    if (!articleId) {
      navigateBack()
      return
    }

    const fetchArticle = async () => {
      const article = await db.articles.get(parseInt(articleId))
      if (!article) {
        navigate(PATH_CONSTANTS.STORAGE.ARTICLES.MENU)
        return
      }

      const jig = await updateArticleAndFetchJig(article)
      const primer = await updateArticleAndFetchPrimer(article)
      setArticleData({ article, jig: jig ? jig : null, primer: primer ? primer : null })
    }
    fetchArticle()
  }, [articleId, navigate])

  return (
    <MainContentContainer
      h1={articleData.article?.name ? articleData.article?.name : ''}
      navBackState={{
        searchTextFromCard,
        pageNumberFromCard
      }}
    >
      <div className='grow flex flex-col items-center justify-center rounded-md'>
        {/* <button className='btn btn-primary text-lg w-24 flex'>Edit</button> */}
        <div className='flex grow w-full p-4 items-center justify-center border-b-white/10'>
          <FlipCard article={articleData.article} flipCardHeight={flipCardHeight} />
          <div className='flex transition-all duration-500 pl-4'>
            {articleData.article &&
              <div className='relative flex flex-col justify-center items-start border border-white/5 rounded-xl min-w-[300px] max-w-[512px] p-8 bg-white/5'
                style={{ height: flipCardHeight.total }}
              >
                <table className="h-fit text-lg">
                  <tbody>
                    <tr className='hover:bg-white/5'>
                      <td className="text-right pr-4 whitespace-nowrap py-1 select-none">Primer</td>
                      <td className="font-bold py-1 pr-1">
                        <ConditionalLinkWithState
                          name='Primer'
                          createPath={PATH_CONSTANTS.STORAGE.PRIMERS.CREATE}
                          viewPath={PATH_CONSTANTS.STORAGE.PRIMERS.VIEW_SINGLE}
                          importedItemName={articleData.article.imported_primer_name}
                          item={{ id: articleData.primer?.id, name: articleData.primer?.name }}
                          linkBackStates={{
                            allreadyExists: { isSpecialBackNavigation: true },
                            doesNotExist: {
                              isSpecialBackNavigation: true,
                              primerName: articleData.article.imported_primer_name
                            }
                          }}
                        />
                      </td>
                    </tr>
                    <tr className='hover:bg-white/5'>
                      <td className="text-right pr-4 whitespace-nowrap py-1 select-none">Jig</td>
                      <td className="font-bold py-1 pr-1">
                        <ConditionalLinkWithState
                          name='Jig'
                          createPath={PATH_CONSTANTS.STORAGE.JIGS.CREATE}
                          viewPath={PATH_CONSTANTS.STORAGE.JIGS.VIEW_SINGLE}
                          importedItemName={articleData.article.imported_jig_name}
                          item={{ id: articleData.jig?.id, name: articleData.jig?.name }}
                          linkBackStates={{
                            allreadyExists: { isSpecialBackNavigation: true },
                            doesNotExist: {
                              isSpecialBackNavigation: true,
                              jigName: articleData.article.imported_jig_name
                            }
                          }}
                        />
                      </td>
                    </tr>
                    <tr className='hover:bg-white/5'>
                      <td className="text-right pr-4 whitespace-nowrap py-1 select-none">Copies on jig</td>
                      <td className="py-1 pr-1 font-semibold text-yellow-300">{articleData.jig?.copies ? `${articleData.jig.copies}` : 'unknown'}</td>
                    </tr>
                    <tr className='hover:bg-white/5'>
                      <td className="text-right pr-4 whitespace-nowrap py-1 select-none">Priming duration</td>
                      <td className="font-thin py-1 pr-1">{articleData.article.priming_duration} seconds</td>
                    </tr>
                    <tr className='hover:bg-white/5'>
                      <td className="text-right pr-4 whitespace-nowrap py-1 select-none">Alignment</td>
                      <td className="font-bold py-1 pr-1">{articleData.article.alignment ?? '-'}</td>
                    </tr>
                    <tr className='hover:bg-white/5'>
                      <td className="text-right pr-4 whitespace-nowrap py-1 select-none">Rotation</td>
                      <td className="font-thin py-1 pr-1">{articleData.article.rotation ?? '-'}</td>
                    </tr>
                    <tr className='hover:bg-white/5'>
                      <td className="text-right pr-4 whitespace-nowrap py-1 select-none">Image width</td>
                      <td className="font-thin py-1 pr-1">{articleData.article.image_w ? `${articleData.article.image_w} mm` : '-'}</td>
                    </tr>
                    <tr className='hover:bg-white/5'>
                      <td className="text-right pr-4 whitespace-nowrap py-1 select-none">Image height</td>
                      <td className="font-thin py-1 pr-1">{articleData.article.image_h ? `${articleData.article.image_h} mm` : '-'}</td>
                    </tr>
                    <tr className='hover:bg-white/5'>
                      <td className="text-right pr-4 whitespace-nowrap py-1 select-none">Notes</td>
                      <td className={twMerge('py-1 pr-1 flex items-center group', articleData.article.notes && 'cursor-pointer')}
                        onClick={() => articleData.article?.notes && notesModalRef.current && notesModalRef.current.showModal()}>
                        <div className="font-thin truncate max-w-[260px] h-7 pr-2 w-fit">{articleData.article.notes ?? 'None'}</div>
                        {articleData.article.notes && <FontAwesomeIcon icon={faBook} className='text-[#CFCBC4] mt-1 w-5 h-5 group-hover:text-white' />}
                        {/* Notes Modal */}
                        <dialog ref={notesModalRef} className="modal">
                          <div className="modal-box cursor-default">
                            <h3 className="font-bold text-lg">{`${articleData.article.name} notes`}</h3>
                            <p className="py-4">{articleData.article.notes}</p>
                            <form method="dialog" className="flex justify-end">
                              <button className="btn" onClick={() => notesModalRef.current?.close()}>Close</button>
                            </form>
                          </div>
                          <form method="dialog" className="modal-backdrop bg-black/80">
                            <button>close</button>
                          </form>
                        </dialog>
                      </td>
                    </tr>
                    <tr className='hover:bg-white/5'>
                      <td className="text-right pr-4 whitespace-nowrap py-1 select-none">Created</td>
                      <td className='font-thin py-1 pr-1'>{moment(articleData.article.created_at).fromNow()}</td>
                    </tr>
                  </tbody>
                </table>
                <div className='absolute top-2 right-2'>
                  {articleData.article.id && <OptionsCog article={articleData.article} />}
                </div>
              </div>
            }
          </div>
        </div>
      </div >
    </MainContentContainer >
  )
}

export default ViewSingle
