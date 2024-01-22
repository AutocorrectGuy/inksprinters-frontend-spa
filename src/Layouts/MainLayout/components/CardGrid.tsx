import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { SiderBarButtonProps } from '../types'
import { siderBarButtons } from '../config/SidebarNav.config'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type CardSetName = 'Document tools' | 'Printing tools' | 'Printing Resources' | 'Development'

type Props = {
  cardsetName: CardSetName
}

const getChildrenByLabel = (buttons: SiderBarButtonProps[], label: string): SiderBarButtonProps[] | undefined => {
  // Helper function for recursive search
  const findRecursive = (items: SiderBarButtonProps[]): SiderBarButtonProps[] | undefined => {
    for (const item of items) {
      if (item.label === label) {
        return item.children
      }
      if (item.children) {
        const found = findRecursive(item.children)
        if (found) return found
      }
    }
    return undefined
  }

  // Start the recursive search
  return findRecursive(buttons)
}

export const CARD_CLASS_NAME =
  'flex flex-col bg-white/5 hover:bg-white/10 hover:shadow-none shadow-2xl rounded-lg border border-[#cfcbc41a] flex-grow p-4 cursor-pointer'
const CardGrid = ({ cardsetName }: Props) => {
  const [cards, _setCards] = useState<SiderBarButtonProps[] | undefined>(
    getChildrenByLabel(siderBarButtons, cardsetName),
  )

  return (
    <div className="grid grow grid-cols-3 grid-rows-3 gap-4 p-4">
      {cards?.map((card, i) => (
        <Link to={card.href} key={`document-card-card-${i}`} className={twMerge(CARD_CLASS_NAME, card.cardStyles)}>
          <FontAwesomeIcon icon={card.icon} className="max-h-20 grow" />
          <div className="flex flex-col justify-end text-[#CFCBC4]">
            <h3 className="pt-4 text-xl font-bold">{card.label}</h3>
            <p className="text-md min-h-12 font-thin leading-5">{card?.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CardGrid