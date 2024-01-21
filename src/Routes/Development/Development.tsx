import React from 'react'
import MainContentContainer from '../../Layouts/MainLayout/components/MainLayoutContainer'
import CardGrid from '../../Layouts/MainLayout/components/CardGrid'

type Props = {}

const Development = (props: Props) => {
  return (
    <MainContentContainer h1='Development'>
      <CardGrid cardsetName='Development' />
    </MainContentContainer>
  )
}

export default Development