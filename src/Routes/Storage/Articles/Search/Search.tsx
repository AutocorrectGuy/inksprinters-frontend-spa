import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'
import { Article } from '../../../../libraries/dexie/models/article.model'
import { useLocation, useSearchParams } from 'react-router-dom'
import { db } from '../../../../libraries/dexie/db'
import Card from './Card'
import SearchBar from './SearchBar'
import { debounce } from '../../../../Utils/debounce'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import CustomPagination from '../../../../Components/Pagination/CustomPagination'

export type CategoryType = keyof Article
export type PlaceHoldersType = { [K in CategoryType]?: string }

const PLACEHOLDERS: PlaceHoldersType = {
  name: 'Wooden pencil',
  number: '9876',
}
const PAGE_SIZE = 6
const MAX_BUTTONS_INBETWEEN_PAGINATION = 3


const Search = () => {
  const location = useLocation()
  const { searchTextFromCard, pageNumberFromCard } = location.state || {}

  const [input, setInput] = useState<string>(searchTextFromCard ?? '')
  const [articles, setArticles] = useState<Article[]>([])
  const [category, setCategory] = useState<CategoryType>('name')
  const [searchParams, setSearchParams] = useSearchParams()
  const [totalArticles, setTotalArticles] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  const currentPage = pageNumberFromCard ?? parseInt(searchParams.get('page') || '1', 10)
  const totalPages = Math.ceil(totalArticles / PAGE_SIZE)

  const searchArticles = useCallback(
    async (query: string) => {
      setLoading(true)
      const offset = (currentPage - 1) * PAGE_SIZE

      // If the search query is empty, fetch all articles, otherwise perform a search
      if (query.length === 0) {
        try {
          const totalCount = await db.articles.count()
          const allArticles = await db.articles
            .orderBy('created_at')
            .reverse()
            .offset(offset)
            .limit(PAGE_SIZE)
            .toArray()

          setArticles(allArticles)
          setTotalArticles(totalCount)
        } catch (error) {
          console.error('Failed to fetch all articles:', error)
        } finally {
          setLoading(false)
        }
      } else {
        try {
          const totalCount = await db.articles
            .filter((article) => new RegExp(query, 'i').test(article[category] as string))
            .count()

          const filteredArticles = await db.articles
            .filter((article) => new RegExp(query, 'i').test(article[category] as string))
            .offset(offset)
            .limit(PAGE_SIZE)
            .toArray()

          setArticles(filteredArticles)
          setTotalArticles(totalCount)
        } catch (error) {
          console.error('Failed to search articles:', error)
        } finally {
          setLoading(false)
        }
      }
    },
    [currentPage, category],
  )

  const debouncedSearch = useCallback(debounce(searchArticles, 50), [searchArticles])

  useEffect(() => {
    debouncedSearch(input)
  }, [input, currentPage, debouncedSearch, category])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setSearchParams({ page: '1' }, { replace: true })
  }

  const handleCategoryChange = (newCategory: CategoryType) => {
    setCategory(newCategory)
    setSearchParams({ page: '1' }, { replace: true })
  }

  return (
    <MainContentContainer h1="Search for an article">
      <div className="flex h-full grow">
        <SearchBar
          value={input}
          category={category}
          onCategoryChange={handleCategoryChange}
          onInputChange={handleInputChange}
          placeholders={PLACEHOLDERS}
        />
        {!articles.length ? (
          <div className="flex grow flex-col items-center justify-center text-2xl font-semibold text-white/30">
            {!input.length ? 'No articles saved' : `Articles with ${category} "${input}" not found`}
          </div>
        ) : (
          <div className="flex w-full grow flex-col items-center">
            <div className="grid w-full max-w-[700px] grow grid-cols-3 grid-rows-2 gap-4 pt-4">
              {articles.map((articleProps, i) => (
                <Card
                  key={`card-${i}`}
                  article={articleProps}
                  index={i}
                  inputFieldText={input}
                  currentPage={currentPage}
                />
              ))}
            </div>
            <div className='flex py-2'>
              <CustomPagination currentPage={currentPage} totalPages={totalPages} />

            </div>
          </div>
        )}
      </div>
    </MainContentContainer>
  )
}

export default Search
