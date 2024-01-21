import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import { useState, useEffect } from 'react';
import { db, Primer } from '../../../Services/Dexie/db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBottleWater, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CARD_CLASS_NAME } from '../../../Layouts/MainLayout/components/CardGrid';
import { twMerge } from 'tailwind-merge';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PATH_CONSTANTS from '../../pathConstants';
import { toProperCase } from '../utils';

const ITEMS_PER_PAGE = 4;

const Primers = () => {
  const [primers, setPrimers] = useState<Primer[]>([]);
  const [totalPrimersCount, setTotalPrimersCount] = useState<null | number>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const getPageFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return Math.max(parseInt(params.get('page') || '1', 10), 1);
  };

  useEffect(() => {
    const fetchAndLoadPrimers = async () => {
      const totalCount = await db.primers.count();
      setTotalPrimersCount(totalCount);

      if (totalCount === 0) {
        return; // No primers in the database
      }

      const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);
      let pageFromUrl = getPageFromUrl();

      if (pageFromUrl > pageCount) {
        pageFromUrl = pageCount;
        navigate(`?page=${pageCount}`); // Redirect to the highest available page
      }

      setCurrentPage(pageFromUrl);
      const offset = (pageFromUrl - 1) * ITEMS_PER_PAGE;
      const loadedPrimers = await db.primers.offset(offset).limit(ITEMS_PER_PAGE).toArray();
      setPrimers(loadedPrimers);
    };

    fetchAndLoadPrimers();
  }, [location.search, navigate]);

  // Calculate the number of pages just before the return statement
  const pageCount = Math.ceil(totalPrimersCount as number / ITEMS_PER_PAGE);


  const handleSelectPrimer = (primerName: string) => {
    navigate(`${PATH_CONSTANTS.PRIMERS_VIEW}?name=${encodeURIComponent(primerName)}`);
  }

  return (
    <MainContentContainer h1='Primers'>
      <div className='flex flex-col grow p-4'>

        {/* Add Primer button */}
        <div className='flex justify-end pb-4'>
          <Link to={PATH_CONSTANTS.PRIMERS_ADD} className='btn bg-[#CA5160] text-white'>
            <FontAwesomeIcon icon={faPlus} className='text-white w-6 h-6' />
            <div className='text-lg'>Add Primer</div>
          </Link>
        </div>

        {totalPrimersCount === 0 ? (
          <div className='grow flex items-center justify-center border rounded-md opacity-40 text-3xl'>
            No primers stored
          </div>
        ) : (
          <>
            {/* Cards grid */}
            {primers.length ?
              <div className='grid grid-cols-2 grid-rows-2 grow gap-4'>
                {primers.map((primer) => (
                  <div key={primer.id} onClick={() => handleSelectPrimer(primer.name)} className={twMerge(CARD_CLASS_NAME, 'grow items-center justify-center')}>
                    <FontAwesomeIcon icon={faBottleWater} className='grow max-h-20 h-full rotate-y-animation opacity-50' />
                    <h3 className="text-xl font-bold pt-4 text-center">{toProperCase(primer.name)}</h3>
                    <p className="text-md leading-5 min-h-8 font-thin text-center">{primer.description}</p>
                  </div>
                ))}
              </div>
              : <div className='flex flex-col grow items-center justify-center'>
                <span className="loading loading-spinner loading-lg opacity-15"></span>
              </div>
            }
            {/* Pagination */}
            <div className="flex justify-center pt-4">
              <div className='join'>
                {[...Array(pageCount)].map((_, i) => (
                  <button key={i + 1} className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''}`}
                    onClick={() => (currentPage !== i + 1) && navigate(`?page=${i + 1}`)}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MainContentContainer >
  )
}

export default Primers