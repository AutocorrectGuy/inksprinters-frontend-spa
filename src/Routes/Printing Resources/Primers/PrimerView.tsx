import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBottleWater, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PATH_CONSTANTS from '../../pathConstants'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import { Primer, db } from '../../../Services/Dexie/db'
import { toProperCase } from '../utils'
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../Components/Toast/CustomToastContainer'
import PrimersEdit from './PrimerEdit'

const PrimerView = () => {
  const [searchParams] = useSearchParams()
  const primerName = searchParams.get('name')
  const navigate = useNavigate()
  const [primer, setPrimer] = useState<Primer | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [editingMode, setEditingMode] = useState<boolean>(false)

  useEffect(() => {
    const fetchPrimer = async () => {
      if (primerName) {
        const decodedName = decodeURIComponent(primerName)
        const foundPrimer = await db.primers.where('name').equals(decodedName).first()
        setPrimer(foundPrimer ? foundPrimer : null)
      }
      setLoading(false)
    }

    fetchPrimer()
  }, [primerName])

  const handleDeletePrimer = async () => {
    if (primer && primer.id) {
      await db.primers.delete(primer.id)
      toast.success(`Primer ${primer.name} successfully deleted`, customToastProps)
      navigate(PATH_CONSTANTS.PRIMERS_VIEW)
    }
  }

  return (
    <MainContentContainer displayQueryParam="name" h1={loading ? '' : primer ? primer.name : 'Primer not found'}>
      <div className="flex grow flex-col items-center justify-center">
        {loading ? (
          <div className="skeleton w-full grow opacity-40"></div>
        ) : primer ? (
          <div className="flex w-full grow flex-col p-4">
            {/* Option buttons */}
            <div className="flex justify-end gap-2 pb-4">
              <button className="btn bg-rose-600 text-white" onClick={() => setShowDeleteModal(true)}>
                <FontAwesomeIcon icon={faTrash} className="h-6 w-6 text-white" />
                <div className="text-lg">Delete</div>
              </button>
              {!editingMode && (
                <button onClick={() => setEditingMode(true)} className="btn bg-emerald-600 text-white">
                  <FontAwesomeIcon icon={faEdit} className="h-6 w-6 text-white" />
                  <div className="text-lg">Edit</div>
                </button>
              )}
            </div>

            {/* Display Primer data */}
            {editingMode ? (
              <PrimersEdit primer={primer} setPrimer={setPrimer} setEditingMode={setEditingMode} />
            ) : (
              <div className="flex grow flex-col items-center justify-center rounded-md border border-neutral-600">
                <div className="flex grow-[0.5] flex-col items-center p-4 text-[#CFCBC4]">
                  <FontAwesomeIcon icon={faBottleWater} className="rotate-y-animation grow opacity-30" />
                  <h2 className="px-4 pt-4 text-center text-5xl font-bold">{toProperCase(primer.name)}</h2>
                  <p className="px-4 py-2 text-center text-2xl font-thin">{primer.description}</p>
                  <BtnBack to={PATH_CONSTANTS.PRIMERS_VIEW} />
                </div>
              </div>
            )}
          </div>
        ) : (
          // 404 not found
          <div className="flex w-full grow flex-col items-center justify-center rounded-md border text-3xl">
            <div className="py-4 opacity-50">Primer not found</div>
            <BtnBack to={PATH_CONSTANTS.PRIMERS_VIEW} />
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && primer && (
          <dialog id="deletePrimerModal" className="modal modal-open">
            <div className="modal-box">
              <h3 className="text-lg font-bold">
                Are you sure you want to delete primer{' '}
                <span className="text-[#E96671]">{toProperCase(primer.name)}</span>?
              </h3>
              <div className="modal-action">
                <button className="btn bg-rose-600 text-white" onClick={handleDeletePrimer}>
                  Delete
                </button>
                <button className="btn btn-ghost" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
            <form
              method="dialog"
              className="modal-backdrop bg-black/75"
              onClick={() => setShowDeleteModal(false)}
            ></form>
          </dialog>
        )}
      </div>
    </MainContentContainer>
  )
}

export default PrimerView
