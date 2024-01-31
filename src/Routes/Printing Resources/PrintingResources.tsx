import React from 'react'
import CardGrid from '../../Layouts/MainLayout/components/CardGrid'
import MainContentContainer from '../../Layouts/MainLayout/components/MainLayoutContainer'

type Props = {}

const PrintingResources = (props: Props) => {
  return (
    <MainContentContainer h1="Printing Resources">
      <CardGrid cardsetName="Printing Resources" columnCount={2} rowCount={2} />
    </MainContentContainer>
  )
}

export default PrintingResources
