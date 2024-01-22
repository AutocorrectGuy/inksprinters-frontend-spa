import React from 'react'
import MainContentContainer from '../../Layouts/MainLayout/components/MainLayoutContainer'
import CardGrid from '../../Layouts/MainLayout/components/CardGrid'

type Props = {}

const PrintingTools = (props: Props) => {
  return (
    <MainContentContainer h1="Printing tools">
      <CardGrid cardsetName="Printing tools" />
    </MainContentContainer>
  )
}

export default PrintingTools
