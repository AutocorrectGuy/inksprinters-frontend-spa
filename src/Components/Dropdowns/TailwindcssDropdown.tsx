import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { twMerge } from 'tailwind-merge'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type Props = {
  items: string[]
  selectedItem: string
  onSelect: (item: string) => void
  label?: string
  labelClassName?: string
  btnClassName?: string
  menuClassName?: string
  optionClassName?: string
  icon?: IconProp
  iconClassName?: string
}

const TailwindcssDropdown = ({
  items,
  selectedItem,
  onSelect,
  label,
  labelClassName,
  btnClassName,
  menuClassName,
  optionClassName,
  icon,
  iconClassName
}: Props) => {
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
      className={`${label ? 'group flex w-full flex-grow cursor-pointer items-center justify-between rounded-lg bg-base-300' : ''}`}
      onClick={toggleDropdown}
    >
      {/* Label */}
      {label && <div className={twMerge('grow px-3 py-2', labelClassName)}>{label}</div>}

      {/* Button */}
      <div className="relative inline-block text-left cursor-pointer">
        <button
          type='button'
          className={twMerge(
            'flex items-center h-12 rounded-lg justify-center whitespace-nowrap px-3 text-xs hover:bg-base-100 gap-3',
            btnClassName,
          )}
        >
          <p className="whitespace-nowrap">{selectedItem}</p>
          <FontAwesomeIcon icon={icon ?? faChevronDown} className={twMerge("h-3 w-3", iconClassName)} />
        </button>

        {/* Selection menu */}
        {isOpen && (
          <ul
            className={twMerge('py-2 text-sm absolute right-0 z-10 mt-1 rounded-md bg-base-200 shadow-lg shadow-neutral-900', menuClassName)}
            style={{ width: dropdownRef.current?.offsetWidth }}
          >
            {items.map((item, i) => (
              <li
                key={`tailwindcss-dropdown-item-${i}`}
                onClick={() => {
                  onSelect(item)
                  setIsOpen(false)
                }}
                className={twMerge('block p-2 hover:bg-base-100', optionClassName)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default TailwindcssDropdown
