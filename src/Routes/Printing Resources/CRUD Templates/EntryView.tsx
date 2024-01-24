import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBottleWater, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer';
import { Article, Jig, Primer, db } from '../../../Services/Dexie/db';
import { toProperCase } from '../utils';
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack';
import { toast } from 'react-toastify';
import { customToastProps } from '../../../Components/Toast/CustomToastContainer';
import { CONFIG, CRUDTemplateComponentProps, TableTypeMapping } from './Config'
import EntryEdit from './EntryEdit';

const EntryView = ({ tableName }: CRUDTemplateComponentProps) => {
  type CurrentTableType = TableTypeMapping[typeof tableName]

  const [searchParams] = useSearchParams();
  const queryParam = CONFIG[tableName].queryParam
  const entryIdentificator = searchParams.get(queryParam);
  const navigate = useNavigate();
  const [entry, setEntry] = useState<CurrentTableType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [editingMode, setEditingMode] = useState<boolean>(false)

  useEffect(() => {
    const fetchEntry = async () => {
      if (entryIdentificator) {
        const foundPrimer = await db[tableName]
          .where(queryParam)
          .equals(decodeURIComponent(entryIdentificator))
          .first()
        setEntry(foundPrimer ? foundPrimer : null);
      }
      setLoading(false);
    };

    fetchEntry();
  }, [entryIdentificator]);

  const handleDeletePrimer = async () => {
    if (entry && entry.id) {
      await db[tableName].delete(entry.id);
      toast.success(`${toProperCase(tableName)} successfully deleted`, customToastProps);
      navigate(CONFIG[tableName].viewEntriesPath);
    }
  };

  const DisplayEntryData = () => {
    switch (tableName) {
      case 'articles':
        const articleEntry = entry as Article
        return (<div>Show article</div>)
      case 'jigs':
        const jig = entry as Jig
        return (editingMode
          ? <EntryEdit entry={jig} setEntry={setEntry as Dispatch<SetStateAction<Jig | null>>} tableName={tableName} setEditingMode={setEditingMode} />
          : <div className='flex flex-col grow items-center justify-center border border-neutral-600 rounded-md'>
            <div className='flex flex-col grow-[0.5] text-[#CFCBC4] p-4 items-center'>
              <FontAwesomeIcon icon={faBottleWater} className='grow opacity-30 rotate-y-animation' />
              <h2 className='text-5xl font-bold px-4 pt-4 text-center'>{toProperCase(jig.name)}</h2>
              <p className='font-thin text-2xl px-4 py-2 text-center'>{jig.cellHeight}</p>
              <p className='font-thin text-2xl px-4 py-2 text-center'>{jig.cellWidth}</p>
              <BtnBack to={CONFIG[tableName].viewEntriesPath} />
            </div>
          </div>)
      case 'primers':
        const primer = entry as Primer
        return (editingMode
          ? <EntryEdit entry={primer} setEntry={setEntry as Dispatch<SetStateAction<Primer | null>>} tableName={tableName} setEditingMode={setEditingMode} />
          : <div className='flex flex-col grow items-center justify-center border border-neutral-600 rounded-md'>
            <div className='flex flex-col grow-[0.5] text-[#CFCBC4] p-4 items-center'>
              <FontAwesomeIcon icon={faBottleWater} className='grow opacity-30 rotate-y-animation' />
              <h2 className='text-5xl font-bold px-4 pt-4 text-center'>{toProperCase(primer.name)}</h2>
              <p className='font-thin text-2xl px-4 py-2 text-center'>{primer.description}</p>
              <BtnBack to={CONFIG[tableName].viewEntriesPath} />
            </div>
          </div>)
      default:
        return <div>Unknown entry type - Single entry view</div>
    }
  }

  return (
    <MainContentContainer displayQueryParam='name' h1={loading ? '' : entry
      ? toProperCase(entry.name)
      : `${toProperCase(tableName).slice(0, -1)} not found`}>
      <div className='flex flex-col grow items-center justify-center'>
        {loading
          ? <div className="skeleton grow w-full opacity-40"></div>
          : (entry
            ? <div className='flex flex-col grow p-4 w-full'>
              {/* Option buttons */}
              <div className='flex justify-end pb-4 gap-2'>
                <button className='btn bg-rose-600 text-white' onClick={() => setShowDeleteModal(true)}>
                  <FontAwesomeIcon icon={faTrash} className='text-white w-6 h-6' />
                  <div className='text-lg'>Delete</div>
                </button>
                {!editingMode && <button onClick={() => setEditingMode(true)} className='btn bg-emerald-600 text-white'>
                  <FontAwesomeIcon icon={faEdit} className='text-white w-6 h-6' />
                  <div className='text-lg'>Edit</div>
                </button>}
              </div>

              {/* Display Entry data */}
              <DisplayEntryData />
            </div>

            // Entry not found
            : <div className='grow flex flex-col w-full items-center justify-center border rounded-md text-3xl'>
              <div className='opacity-50 py-4'>{`${toProperCase(tableName)} not found`}</div>
              <BtnBack to={CONFIG[tableName].viewEntriesPath} />
            </div>)
        }

        {/* Delete Confirmation Modal */}
        {showDeleteModal && entry && (
          <dialog id="deletePrimerModal" className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Are you sure you want to delete primer <span className='text-[#E96671]'>{toProperCase(entry.name)}</span>?</h3>
              <div className="modal-action">
                <button className="btn bg-rose-600 text-white" onClick={handleDeletePrimer}>Delete</button>
                <button className="btn btn-ghost" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop bg-black/75" onClick={() => setShowDeleteModal(false)}></form>
          </dialog>
        )}
      </div>
    </MainContentContainer>
  );
};

export default EntryView;
