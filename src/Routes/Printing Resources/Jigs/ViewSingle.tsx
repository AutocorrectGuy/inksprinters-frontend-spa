import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Jig, jigModel } from '../../../libraries/dexie/models/jig.model'
import { db } from '../../../libraries/dexie/db'
import PATH_CONSTANTS from '../../pathConstants'
import moment from 'moment'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack'
import LoadingSpinner from '../../../Layouts/MainLayout/components/DexieJsCrud/LoadingSpinner'
import { toProperCase } from '../utils'

const ViewSingle = () => {
  const [jig, setJig] = useState<Jig | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const jigId = searchParams.get('id')

  const navigateBack = () => navigate(PATH_CONSTANTS.PRINTING_RESOURCES.JIGS.VIEW_MANY)
  useEffect(() => {
    if (!jigId) {
      navigateBack()
      return
    }

    const fetchJig = async () => {
      const fetchedJig = await db.jigs.get(parseInt(jigId))
      console.log(fetchedJig)
      fetchedJig
        ? setJig(fetchedJig)
        : navigate(PATH_CONSTANTS.PRINTING_RESOURCES.JIGS.VIEW_MANY)
    }
    fetchJig()
  }, [jigId, navigate])

  const Content = ({ jig }: { jig: Jig }) =>
    <div className='grow flex flex-col items-center justify-center'>
      <table className='table w-fit text-xl'>
        <tbody>
          TODO: View Single Component
          <tr>
            <td className='text-neutral-300'>Created At:</td>
            <td className='text-white'>{moment(jig.created_at).fromNow()}</td>
          </tr>
        </tbody>
      </table>
      <div className='py-4 flex gap-2'>
        <BtnBack to={PATH_CONSTANTS.PRINTING_RESOURCES.JIGS.VIEW_MANY} />
        <button className='btn btn-primary text-lg'>Edit</button>
      </div>
    </div >

  return (

    <MainContentContainer h1={jig ? jig.name : ''}>
      {!jig
        ? <LoadingSpinner />
        : <Content jig={jig} />
      }
    </MainContentContainer>
  )
}

export default ViewSingle
