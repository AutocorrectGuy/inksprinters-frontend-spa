import React, { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'
import PATH_CONSTANTS from '../../../pathConstants'
import { Article } from '../../../../libraries/dexie/models/article.model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSearch } from '@fortawesome/free-solid-svg-icons'
import TailwindcssDropdown from '../../../../Components/Dropdowns/TailwindcssDropdown'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { db } from '../../../../libraries/dexie/db'
import { arrayBufferToImageUrl } from '../../../../Utils/ImageConversion'
import Card from './Card'
import SearchBar from './SearchBar'
import { debounce } from '../../../../Utils/debounce'

type Props = {}
export type CategoryType = keyof Article
export type PlaceHoldersType = { [K in CategoryType]?: string }

const ALL_CATEGORIES: (keyof Article)[] = ['number', 'name']
const PLACEHOLDERS: PlaceHoldersType = {
  name: 'Wooden pencil',
  number: '9876'
}
const PAGE_SIZE = 6

const Search = (props: Props) => {
  const [input, setInput] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<CategoryType>('name');
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(totalArticles / PAGE_SIZE);

  const searchArticles = useCallback(async (query: string) => {
    setLoading(true);
    const offset = (currentPage - 1) * PAGE_SIZE;

    // If the search query is empty, fetch all articles, otherwise perform a search
    if (query.length === 0) {
      try {
        const totalCount = await db.articles.count();
        const allArticles = await db.articles
          .orderBy('created_at')
          .reverse()
          .offset(offset)
          .limit(PAGE_SIZE)
          .toArray();

        setArticles(allArticles);
        setTotalArticles(totalCount);
      } catch (error) {
        console.error('Failed to fetch all articles:', error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const totalCount = await db.articles
          .filter(article => new RegExp(query, 'i').test(article[category] as string))
          .count();

        const filteredArticles = await db.articles
          .filter(article => new RegExp(query, 'i').test(article[category] as string))
          .offset(offset)
          .limit(PAGE_SIZE)
          .toArray();

        setArticles(filteredArticles);
        setTotalArticles(totalCount);
      } catch (error) {
        console.error('Failed to search articles:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [currentPage, category]);


  const debouncedSearch = useCallback(debounce(searchArticles, 50), [searchArticles]);

  useEffect(() => {
    debouncedSearch(input);
  }, [input, currentPage, debouncedSearch, category]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setSearchParams({ page: '1' }, { replace: true });
  };

  const handleCategoryChange = (newCategory: CategoryType) => {
    setCategory(newCategory);
    setSearchParams({ page: '1' }, { replace: true });
  };

  // Pagination change handler
  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const Pagination = () =>
    <div className='flex justify-center py-2'>
      <div className="join">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
          <button
            key={number}
            className={`join-item btn ${number === currentPage ? 'btn-active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>

  return (
    <MainContentContainer
      h1='Search for an article'
      linkBackTo={PATH_CONSTANTS.STORAGE.ARTICLES.MENU}>
      <div className='flex grow h-full'>
        <SearchBar
          value={input}
          category={category}
          onCategoryChange={handleCategoryChange}
          onInputChange={handleInputChange}
          placeholders={PLACEHOLDERS}
        />
        {
          !articles.length
            ? <div className='flex flex-col grow items-center justify-center text-2xl font-semibold text-white/30'>
              {!input.length ? 'No articles saved' : `Articles with ${category} "${input}" not found`}
            </div>
            : <div className='flex flex-col grow w-full items-center'>
              <div className='grid grid-cols-3 grid-rows-2 grow gap-4 w-full max-w-[700px] pt-4'>
                {articles.map((articleProps, i) => <Card key={`card-${i}`} article={articleProps} index={i} />)}
              </div>
              <Pagination />
            </div>
        }


      </div>
    </MainContentContainer>
  )
}

export default Search