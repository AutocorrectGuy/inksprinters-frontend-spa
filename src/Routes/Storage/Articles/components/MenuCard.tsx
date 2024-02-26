import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export type CardProps = {
  text: string,
  icon: IconProp
  path: string
  index?: number
}

const MenuCard = (props: CardProps) => {
  return (
    <Link to={props.path} className={'flex flex-col grow border-4 rounded-sm border-neutral-500/20 hover:border-[#CA5160] w-full items-center justify-center'}>
      <div className='p-6'>
        <FontAwesomeIcon icon={props.icon} className='w-full max-w-[150px] h-auto aspect-square text-white/50' />
      </div>

      {/* Ensure the text is on the same baseline */}
      <div className='text-3xl font-bold uppercase text-center mt-2'> {/* Adjust margin-top as needed */}
        {props.text}
      </div>
    </Link>
  )
}

export default MenuCard
