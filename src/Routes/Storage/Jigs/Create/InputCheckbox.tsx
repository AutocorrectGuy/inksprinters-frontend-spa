import React from 'react'

type Props = {
  onClickCallback: () => void
  isChecked: boolean
  label: string
}

const InputCheckbox = ({ isChecked, onClickCallback, label }: Props) => {
  return (
    <div className="flex cursor-pointer items-center" onClick={onClickCallback}>
      <input type="checkbox" checked={isChecked} readOnly className="checkbox" />
      <span className="pl-2 select-none">{label}</span>
    </div >
  )
}

export default InputCheckbox