import React from 'react'
import MainContentContainer from '../../Layouts/MainLayout/components/MainLayoutContainer'
import { siderBarButtons } from '../../Layouts/MainLayout/config/SidebarNav.config'
import { SiderBarButtonProps } from '../../Layouts/MainLayout/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import CardGrid from '../../Layouts/MainLayout/components/CardGrid'

type Props = {}

const getChildrenByLabel = (buttons: SiderBarButtonProps[], label: string): SiderBarButtonProps[] | undefined => {
  const menuItem = buttons.find((button) => button.label === label)
  return menuItem?.children
}

const tools = getChildrenByLabel(siderBarButtons, 'Document tools')

const DocumentTools = (props: Props) => {
  return (
    <MainContentContainer h1="Document tools">
      <CardGrid cardsetName="Document tools" />
    </MainContentContainer>
  )
}

export default DocumentTools
