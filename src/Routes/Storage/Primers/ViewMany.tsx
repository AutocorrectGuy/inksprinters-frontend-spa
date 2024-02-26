import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Primer } from '../../../libraries/dexie/models/primer.model';
import { db } from '../../../libraries/dexie/db';
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer';
import moment from 'moment';
import PATH_CONSTANTS from '../../pathConstants';
import LoadingSpinner from '../../../Layouts/MainLayout/components/DexieJsCrud/LoadingSpinner';
import ItemNotFound from '../../../Layouts/MainLayout/components/DexieJsCrud/ItemNotFound';
const PAGE_SIZE = 10; // Number of items per page

const LatestPrimers = () => {
  const [primers, setPrimers] = useState<Primer[]>([]);
  const [totalPrimers, setTotalPrimers] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(totalPrimers / PAGE_SIZE);

  useEffect(() => {
    const fetchLatestPrimers = async () => {
      setLoading(true);
      const offset = (currentPage - 1) * PAGE_SIZE;
      const totalCount = await db.primers.count();
      if (!totalCount) {
        setLoading(false)
        return
      }

      const latestPrimers = await db.primers.orderBy('created_at').reverse().offset(offset).limit(PAGE_SIZE).toArray();
      setPrimers(latestPrimers);
      setTotalPrimers(totalCount);
      setLoading(false);
    };

    fetchLatestPrimers();
  }, [currentPage]);

  const handlePageChange = (newPage: number) =>
    setSearchParams({ page: newPage.toString() });

  const onRowClick = (primerId: number) =>
    navigate(PATH_CONSTANTS.STORAGE.PRIMERS.VIEW_SINGLE + `?id=${primerId}`);

  const ToolbarTab = () =>
    <div className="flex justify-end p-4">
      <button className="btn btn-primary" onClick={() => navigate(PATH_CONSTANTS.STORAGE.PRIMERS.CREATE)}>
        Add Primer
      </button>
    </div>

  const PrimersTable = ({ primers }: { primers: Primer[] }) =>
    <table className="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        {primers.map((primer, i) => (
          <tr key={`table-row-${i}`} onClick={() => onRowClick(primer.id!)} className="cursor-pointer hover:bg-white/10">
            <td>{primer.name}</td>
            <td className="max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap">
              {primer.description}
            </td>
            <td>{moment(primer.created_at).fromNow()}</td>
          </tr>
        ))}
      </tbody>
    </table>

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
    <MainContentContainer h1='Primers'>
      <ToolbarTab />
      {loading
        ? <LoadingSpinner />
        : (!primers.length
          ? <ItemNotFound itemName='primers' />
          : <div className='flex flex-col'>
            <PrimersTable primers={primers} />
            <Pagination />
          </div>
        )
      }
    </MainContentContainer>
  );
};

export default LatestPrimers;
