import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { JigTemplate, jigModel } from '../../../../libraries/dexie/models/jig.model';
import { db } from '../../../../libraries/dexie/db';
import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer';
import moment from 'moment';
import PATH_CONSTANTS from '../../../pathConstants';
import LoadingSpinner from '../../../../Layouts/MainLayout/components/DexieJsCrud/LoadingSpinner';
import ItemNotFound from '../../../../Layouts/MainLayout/components/DexieJsCrud/ItemNotFound';
import RenderTable from '../../../../libraries/dexie/utils/rendering.utils';
import AddJigDropdown from './AddJigDropdown';
const PAGE_SIZE = 10; // Number of items per page

const LatestJigs = () => {
  const [jigs, setJigs] = useState<JigTemplate[]>([]);
  const [totalJigs, setTotalJigs] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(totalJigs / PAGE_SIZE);

  useEffect(() => {
    const fetchLatestJigs = async () => {
      setLoading(true);
      const offset = (currentPage - 1) * PAGE_SIZE;
      const totalCount = await db.jigs.count();
      if (!totalCount) {
        setLoading(false)
        return
      }

      const latestJigs = await db.jigs.orderBy('created_at').reverse().offset(offset).limit(PAGE_SIZE).toArray();
      setJigs(latestJigs);
      setTotalJigs(totalCount);
      setLoading(false);
    };

    fetchLatestJigs();
  }, [currentPage]);

  const handlePageChange = (newPage: number) =>
    setSearchParams({ page: newPage.toString() });

  const onRowClick = (jigId: number) =>
    navigate(PATH_CONSTANTS.PRINTING_RESOURCES.JIGS.VIEW_SINGLE + `?id=${jigId}`);

  const ToolbarTab = () =>
    <div className="flex justify-end p-4">
      <AddJigDropdown />
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
    <MainContentContainer h1='Jigs'>
      <ToolbarTab />
      {loading
        ? <LoadingSpinner />
        : (!jigs.length
          ? <ItemNotFound itemName='jigs' />
          : <div className='flex flex-col'>
            <RenderTable entries={jigs} entriesModel={jigModel} tableName='JIGS' />
            <Pagination />
          </div>
        )
      }
    </MainContentContainer>
  );
};

export default LatestJigs;
