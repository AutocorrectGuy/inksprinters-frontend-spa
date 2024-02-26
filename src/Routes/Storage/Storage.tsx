import React from 'react'
import CardGrid from '../../Layouts/MainLayout/components/CardGrid'
import MainContentContainer from '../../Layouts/MainLayout/components/MainLayoutContainer'
import PATH_CONSTANTS from '../pathConstants'

type Props = {}

const Storage = (props: Props) => {
  return (
    <MainContentContainer h1="Storage" linkBackTo={PATH_CONSTANTS.HOME}>
      <CardGrid cardsetName="Storage" columnCount={2} rowCount={2} />
    </MainContentContainer>
  )
}

export default Storage
