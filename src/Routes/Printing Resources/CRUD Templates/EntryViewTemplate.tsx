// import { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBottleWater, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer';
// import { Primer, db } from '../../../Services/Dexie/db';
// import { toProperCase } from '../utils';
// import BtnBack from '../../../Layouts/MainLayout/components/BtnBack';
// import { toast } from 'react-toastify';
// import { customToastProps } from '../../../Components/Toast/CustomToastContainer';

// const EntryViewTemplate = () => {
//   const [searchParams] = useSearchParams();
//   const primerName = searchParams.get('name');
//   const navigate = useNavigate();
//   const [primer, setPrimer] = useState<Primer | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
//   const [editingMode, setEditingMode] = useState<boolean>(false)

//   useEffect(() => {
//     const fetchPrimer = async () => {
//       if (primerName) {
//         const decodedName = decodeURIComponent(primerName);
//         const foundPrimer = await db.primers.where('name').equals(decodedName).first();
//         setPrimer(foundPrimer ? foundPrimer : null);
//       }
//       setLoading(false);
//     };

//     fetchPrimer();
//   }, [primerName]);

//   const handleDeletePrimer = async () => {
//     if (primer && primer.id) {
//       await db.primers.delete(primer.id);
//       toast.success(`Primer ${primer.name} successfully deleted`, customToastProps);
//       navigate(PATH_CONSTANTS.PRIMERS_VIEW);
//     }
//   };

//   return (
//     <MainContentContainer displayQueryParam='name' h1={loading ? '' : primer ? primer.name : 'Primer not found'}>
//       <div className='flex flex-col grow items-center justify-center'>
//         {loading
//           ? <div className="skeleton grow w-full opacity-40"></div>
//           : primer
//             ? <div className='flex flex-col grow p-4 w-full'>

//               {/* Option buttons */}
//               <div className='flex justify-end pb-4 gap-2'>
//                 <button className='btn bg-rose-600 text-white' onClick={() => setShowDeleteModal(true)}>
//                   <FontAwesomeIcon icon={faTrash} className='text-white w-6 h-6' />
//                   <div className='text-lg'>Delete</div>
//                 </button>
//                 {!editingMode && <button onClick={() => setEditingMode(true)} className='btn bg-emerald-600 text-white'>
//                   <FontAwesomeIcon icon={faEdit} className='text-white w-6 h-6' />
//                   <div className='text-lg'>Edit</div>
//                 </button>}
//               </div>

//               {/* Display Primer data */}
//               {editingMode ?
//                 <PrimersEdit primer={primer} setPrimer={setPrimer} setEditingMode={setEditingMode} />
//                 : <div className='flex flex-col grow items-center justify-center border border-neutral-600 rounded-md'>
//                   <div className='flex flex-col grow-[0.5] text-[#CFCBC4] p-4 items-center'>
//                     <FontAwesomeIcon icon={faBottleWater} className='grow opacity-30 rotate-y-animation' />
//                     <h2 className='text-5xl font-bold px-4 pt-4 text-center'>{toProperCase(primer.name)}</h2>
//                     <p className='font-thin text-2xl px-4 py-2 text-center'>{primer.description}</p>
//                     <BtnBack to={PATH_CONSTANTS.PRIMERS_VIEW} />
//                   </div>
//                 </div>
//               }
//             </div>

//             // 404 not found
//             : <div className='grow flex flex-col w-full items-center justify-center border rounded-md text-3xl'>
//               <div className='opacity-50 py-4'>Primer not found</div>
//               <BtnBack to={PATH_CONSTANTS.PRIMERS_VIEW} />
//             </div>
//         }

//         {/* Delete Confirmation Modal */}
//         {showDeleteModal && primer && (
//           <dialog id="deletePrimerModal" className="modal modal-open">
//             <div className="modal-box">
//               <h3 className="font-bold text-lg">Are you sure you want to delete primer <span className='text-[#E96671]'>{toProperCase(primer.name)}</span>?</h3>
//               <div className="modal-action">
//                 <button className="btn bg-rose-600 text-white" onClick={handleDeletePrimer}>Delete</button>
//                 <button className="btn btn-ghost" onClick={() => setShowDeleteModal(false)}>Cancel</button>
//               </div>
//             </div>
//             <form method="dialog" className="modal-backdrop bg-black/75" onClick={() => setShowDeleteModal(false)}></form>
//           </dialog>
//         )}
//       </div>
//     </MainContentContainer>
//   );
// };

// export default EntryViewTemplate;

import React from 'react'

type Props = {}

const EntryViewTemplate = (props: Props) => {
  return <div>EntryViewTemplate</div>
}

export default EntryViewTemplate
