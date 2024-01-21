import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  to: string
}

const BtnBack = ({ to }: Props) => {
  return (
    <Link to={to} className='flex text-[#CFCBC4] items-center btn bg-neutral-500/10 border border-[#CA5160] hover:bg-[#CA5160] hover:text-white'>
      <FontAwesomeIcon icon={faCaretLeft} className='h-6' />
      <div className='text-lg'>Back</div>
    </Link>
  )
}

export default BtnBack