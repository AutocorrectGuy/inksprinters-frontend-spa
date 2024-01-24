import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import { useState, useEffect } from 'react'
import { Article, db, Jig, Primer } from '../../../Services/Dexie/db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBottleWater, faPlus } from '@fortawesome/free-solid-svg-icons'
import { CARD_CLASS_NAME } from '../../../Layouts/MainLayout/components/CardGrid'
import { twMerge } from 'tailwind-merge'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toProperCase } from '../utils'
import { CONFIG, CRUDTemplateComponentProps, TableTypeMapping } from './Config'

const EntriesView = ({ tableName }: CRUDTemplateComponentProps) => {
  type CurrentTableType = TableTypeMapping[typeof tableName]
  const [dbEntries, setDbEntries] = useState<CurrentTableType[]>([])
  const [totalEntriesCount, setTotalEntriesCount] = useState<null | number>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const ITEMS_PER_PAGE = CONFIG[tableName].itemsPerPage
  const pageCount = Math.ceil((totalEntriesCount as number) / ITEMS_PER_PAGE)

  const getPageFromUrl = () => {
    const params = new URLSearchParams(location.search)
    return Math.max(parseInt(params.get('page') || '1', 10), 1)
  }

  useEffect(() => {
    const fetchAndLoadEntries = async () => {
      const totalCount = await db[tableName].count()
      setTotalEntriesCount(totalCount)

      if (totalCount === 0)
        return // No entries in the database

      const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE)
      let pageFromUrl = getPageFromUrl()

      if (pageFromUrl > pageCount) {
        pageFromUrl = pageCount
        navigate(`?page=${pageCount}`) // Redirect to the highest available page
      }

      setCurrentPage(pageFromUrl)
      const offset = (pageFromUrl - 1) * ITEMS_PER_PAGE
      const loadedEntries = await db[tableName]
        .orderBy('created_at')
        .reverse() // Newest entries first
        .offset(offset)
        .limit(ITEMS_PER_PAGE)
        .toArray()
      setDbEntries(loadedEntries)
    }

    fetchAndLoadEntries()
  }, [location.search, navigate])


  const handleSelectEntry = (entryName: string) => {
    navigate(`${CONFIG[tableName].viewEntryPath}?name=${encodeURIComponent(entryName)}`)
  }

  const Card = ({ entry }: { entry: CurrentTableType }) => {
    switch (tableName) {
      case 'articles':
        const articleEntry = entry as Article
        return (<div
          key={entry.id}
          onClick={() => handleSelectEntry(entry.name)}
          className={twMerge(CARD_CLASS_NAME, 'grow items-center justify-center')}>
          <h3 className="pt-4 text-center text-xl font-bold">{articleEntry.name}</h3>
          <h3 className="pt-4 text-center text-xl font-bold">{articleEntry.article_number}</h3>
        </div>)
      case 'jigs':
        const jigEntry = entry as Jig
        return (<div
          key={entry.id}
          onClick={() => handleSelectEntry(entry.name)}
          className={twMerge(CARD_CLASS_NAME, 'grow items-center justify-center')}>
          <h3 className="pt-4 text-center text-xl font-bold">{jigEntry.name}</h3>
          <h3 className="pt-4 text-center text-xl font-bold">{jigEntry.width}</h3>
        </div>)
      case 'primers':
        const primerEntry = entry as Primer
        return (<div
          key={entry.id}
          onClick={() => handleSelectEntry(entry.name)}
          className={twMerge(CARD_CLASS_NAME, 'grow items-center justify-center')}>
          <FontAwesomeIcon icon={faBottleWater} className="rotate-y-animation max-h-20 grow opacity-50" />
          <h3 className="pt-4 text-center text-xl font-bold">{toProperCase(primerEntry.name)}</h3>
          <p className="text-md min-h-8 text-center font-thin leading-5">{primerEntry.description}</p>
        </div>)
      default:
        return <div>Unknown entry type - Multiple entries view</div>
    }
  }

  return (
    <MainContentContainer h1={toProperCase(tableName)}>
      <div className="flex grow flex-col p-4">

        {/* Add Entry button */}
        <div className="flex justify-end pb-4">
          <Link to={CONFIG[tableName].addEntryPath} className="btn bg-[#CA5160] text-white">
            <FontAwesomeIcon icon={faPlus} className="h-6 w-6 text-white" />
            <div className="text-lg">{`Add ${toProperCase(tableName)}`}</div>
          </Link>
        </div>

        {totalEntriesCount === 0
          ? <div className="flex grow items-center justify-center rounded-md border text-3xl opacity-40">
            {`No ${tableName} stored`}
          </div>
          : (<>
            {/* Cards grid */}
            {dbEntries.length
              ? <div className={`grid ${ITEMS_PER_PAGE === 9 ? 'grid-cols-3 grid-rows-3' : 'grid-cols-2 grid-rows-2'} grow gap-4`}>
                {dbEntries.map((entry, i) => <Card key={`card-${i}`} entry={entry} />)}
              </div>
              : <div className="flex grow flex-col items-center justify-center">
                <span className="loading loading-spinner loading-lg opacity-15"></span>
              </div>
            }
            {/* Pagination */}
            <div className="flex justify-center pt-4">
              <div className="join">
                {[...Array(pageCount)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`btn join-item ${currentPage === i + 1 ? 'btn-active' : ''}`}
                    onClick={() => currentPage !== i + 1 && navigate(`?page=${i + 1}`)}
                  >{i + 1}
                  </button>
                ))}
              </div>
            </div>
          </>)
        }
      </div>
    </MainContentContainer>
  )
}

export default EntriesView
