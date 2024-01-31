import React from 'react'
import MainContentContainer from '../../Layouts/MainLayout/components/MainLayoutContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import CardGrid from '../../Layouts/MainLayout/components/CardGrid'
import { SideBarButtonProps } from '../../Layouts/MainLayout/types'
import { sideBarButtons } from '../../Layouts/MainLayout/config/SidebarNav.config'

type Props = {}

const getChildrenByLabel = (buttons: SideBarButtonProps[], label: string): SideBarButtonProps[] | undefined => {
  const menuItem = buttons.find((button) => button.label === label)
  return menuItem?.children
}

const tools = getChildrenByLabel(sideBarButtons, 'Document tools')

const DocumentTools = (props: Props) => {
  return (
    <MainContentContainer h1="Document tools">
      <CardGrid cardsetName="Document tools" />
    </MainContentContainer>
  )
}

export default DocumentTools
