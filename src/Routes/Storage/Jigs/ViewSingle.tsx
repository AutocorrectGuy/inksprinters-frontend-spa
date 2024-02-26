import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { db } from '../../../libraries/dexie/db'
import PATH_CONSTANTS from '../../pathConstants'
import moment from 'moment'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack'
import LoadingSpinner from '../../../Layouts/MainLayout/components/DexieJsCrud/LoadingSpinner'
import { toProperCase } from '../utils'
import { JigTemplate } from '../../../libraries/dexie/models/jig.model'
import DisplayJig from './components/DisplayJig'

const ViewSingle = () => {
  const [jigTemplate, setJigTemplate] = useState<JigTemplate | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const jigId = searchParams.get('id')

  const navigateBack = () => navigate(PATH_CONSTANTS.STORAGE.JIGS.VIEW_MANY)
  useEffect(() => {
    if (!jigId) {
      navigateBack()
      return
    }

    const fetchJig = async () => {
      const fetchedJig = await db.jigs.get(parseInt(jigId))
      fetchedJig
        ? setJigTemplate(fetchedJig)
        : navigate(PATH_CONSTANTS.STORAGE.JIGS.VIEW_MANY)
    }
    fetchJig()
  }, [jigId, navigate])

  return (

    <MainContentContainer h1={jigTemplate ? jigTemplate.name : ''} fullWidth>
      {!jigTemplate
        ? <LoadingSpinner />
        : <DisplayJig jigTemplate={jigTemplate} />
      }
    </MainContentContainer>
  )
}

export default ViewSingle
