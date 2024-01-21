import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  items: string[]
  selectedItem: string
  onSelect: (item: string) => void
  label?: string
  labelClassName?: string
}

const TailwindcssDropdown = ({ items, selectedItem, onSelect, label, labelClassName }: Props) => {
  const [uuid, _uuid] = useState(uuidv4())
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={dropdownRef}
      className={`${label ? 'group flex flex-grow cursor-pointer items-center justify-between rounded-lg bg-base-300' : ''}`}
      onClick={toggleDropdown}
    >
      {/* Label */}
      {label && <div className={`${labelClassName ?? "px-3 py-2 grow"}`}>{label}</div>}

      {/* Button */}
      <div className="relative inline-block text-left">
        <button className="btn flex items-center justify-center whitespace-nowrap px-3 text-xs hover:bg-base-100 group-hover:bg-base-100">
          <p className="whitespace-nowrap pr-1">{selectedItem}</p>
          <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
        </button>

        {/* Selection menu */}
        {isOpen && (
          <div
            className="absolute right-0 z-10 mt-1 rounded-md bg-base-200 shadow-lg shadow-neutral-900"
            style={{ width: dropdownRef.current?.offsetWidth }}
          >
            <ul className="py-2 text-sm">
              {items.map((item, i) => (
                <li
                  key={`tailwindcss-dropdown-item-${i}`}
                  onClick={() => {
                    onSelect(item)
                    setIsOpen(false)
                  }}
                  className="block p-2 hover:bg-base-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default TailwindcssDropdown
