import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SideBarButtonProps } from '../types'
import { sideBarButtons } from '../config/SidebarNav.config'

export type CardSetName = 'Document tools' | 'Printing tools' | 'Storage' | 'Development' | 'Rēķini'

type Props = {
  cardsetName: CardSetName;
  columnCount?: number;
  rowCount?: number;
};

const getChildrenByLabel = (buttons: SideBarButtonProps[], label: string): SideBarButtonProps[] | undefined => {
  // Helper function for recursive search
  const findRecursive = (items: SideBarButtonProps[]): SideBarButtonProps[] | undefined => {
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


const CardGrid = ({ cardsetName, columnCount = 2, rowCount = 2 }: Props) => {
  const [cards, _setCards] = useState<SideBarButtonProps[] | undefined>(
    getChildrenByLabel(sideBarButtons, cardsetName),
  )


  // Inline style for grid layout columns and rows
  const gridStyle = {
    gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
  };

  return (
    <div className="grid gap-4 p-4 grow" style={gridStyle}>
      {cards?.map((card, i) => (
        <Link to={card.href} key={`document-card-${i}`} className={twMerge(CARD_CLASS_NAME, card.cardStyles)}>
          <div className='flex flex-col grow items-center justify-center'>
            <FontAwesomeIcon icon={card.icon} className="grow max-h-[50%]" />
          </div>
          <div className="flex flex-col justify-end text-[#CFCBC4]">
            <h3 className="pt-4 text-2xl font-bold">{card.label}</h3>
            <p className="text-md min-h-12 font-thin leading-5">{card?.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CardGrid
