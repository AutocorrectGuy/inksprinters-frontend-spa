import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Article, articleModel } from '../../../libraries/dexie/models/article.model';
import { db } from '../../../libraries/dexie/db';
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer';
import PATH_CONSTANTS from '../../pathConstants';
import LoadingSpinner from '../../../Layouts/MainLayout/components/DexieJsCrud/LoadingSpinner';
import ItemNotFound from '../../../Layouts/MainLayout/components/DexieJsCrud/ItemNotFound';
import RenderTable from '../../../libraries/dexie/utils/rendering.utils';
const PAGE_SIZE = 10; // Number of items per page

const LatestArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(totalArticles / PAGE_SIZE);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      setLoading(true);
      const offset = (currentPage - 1) * PAGE_SIZE;
      const totalCount = await db.articles.count();
      if (!totalCount) {
        setLoading(false)
        return
      }

      const latestArticles = await db.articles.orderBy('created_at').reverse().offset(offset).limit(PAGE_SIZE).toArray();
      setArticles(latestArticles);
      setTotalArticles(totalCount);
      setLoading(false);
    };

    fetchLatestArticles();
  }, [currentPage]);

  const handlePageChange = (newPage: number) =>
    setSearchParams({ page: newPage.toString() });

  const ToolbarTab = () =>
    <div className="flex justify-end p-4">
      <button className="btn btn-primary" onClick={() => navigate(PATH_CONSTANTS.PRINTING_RESOURCES.ARTICLES.CREATE)}>
        Add Article
      </button>
    </div>

  const Pagination = () =>
    <div className='flex justify-center'>
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
    <MainContentContainer h1='Articles'>
      <ToolbarTab />
      {loading
        ? <LoadingSpinner />
        : (!articles.length
          ? <ItemNotFound itemName='articles' />
          : <div className='flex flex-col'>
            <RenderTable entries={articles} entriesModel={articleModel} tableName='ARTICLES' />
            <Pagination />
          </div>
        )
      }
    </MainContentContainer>
  );
};

export default LatestArticles;
