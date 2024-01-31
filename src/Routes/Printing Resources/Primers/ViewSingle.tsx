import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Primer } from '../../../libraries/dexie/models/primer.model'
import { db } from '../../../libraries/dexie/db'
import PATH_CONSTANTS from '../../pathConstants'
import moment from 'moment'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack'
import LoadingSpinner from '../../../Layouts/MainLayout/components/DexieJsCrud/LoadingSpinner'

const ViewSingle = () => {
  const [primer, setPrimer] = useState<Primer | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const primerId = searchParams.get('id')

  const navigateBack = () => navigate(PATH_CONSTANTS.PRINTING_RESOURCES.PRIMERS.VIEW_MANY)
  useEffect(() => {
    if (!primerId) {
      navigateBack()
      return
    }

    const fetchPrimer = async () => {
      const fetchedPrimer = await db.primers.get(parseInt(primerId))
      fetchedPrimer
        ? setPrimer(fetchedPrimer)
        : navigate(PATH_CONSTANTS.PRINTING_RESOURCES.PRIMERS.VIEW_MANY)
    }
    fetchPrimer()
  }, [primerId, navigate])

  const Content = ({ primer }: { primer: Primer }) =>
    <div className='grow flex flex-col items-center justify-center'>
      <table className='table w-fit text-xl'>
        <tbody>
          <tr>
            <td className='text-neutral-300'>Id:</td>
            <td className='text-white'>{primer.id}</td>
          </tr>
          <tr>
            <td className='text-neutral-300'>Name:</td>
            <td className='text-white'>{primer.name}</td>
          </tr>
          <tr>
            <td className='text-neutral-300'>Description:</td>
            <td className='text-white'>{primer.description}</td>
          </tr>
          <tr>
            <td className='text-neutral-300'>Created At:</td>
            <td className='text-white'>{moment(primer.created_at).fromNow()}</td>
          </tr>
        </tbody>
      </table>
      <div className='py-4 flex gap-2'>
        <BtnBack to={PATH_CONSTANTS.PRINTING_RESOURCES.PRIMERS.VIEW_MANY} />
        <button className='btn btn-primary text-lg'>Edit</button>
      </div>
    </div >

  return (

    <MainContentContainer h1={primer ? primer.name : ''}>
      {!primer
        ? <LoadingSpinner />
        : <Content primer={primer} />
      }
    </MainContentContainer>
  )
}

export default ViewSingle
