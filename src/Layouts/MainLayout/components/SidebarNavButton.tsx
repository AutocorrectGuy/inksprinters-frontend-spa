import React, { useEffect, useRef, useState } from 'react'
import { styles } from '../config/MainLayout.config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { sidebarStyleProps } from './SidebarNav'
import { Link } from 'react-router-dom'
import { btnClass, getBorderRadiusClasses, selectedBtnStyles } from '../utils/styleUtils'
import { SiderBarButtonProps } from '../types'

const SidebarNavButton: React.FC<SiderBarButtonProps> = ({
  icon,
  label,
  href,
  children,
  isFirstChild,
  isLastChild,
  isMainSidebarBtn = true,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const borderRadiusClass = getBorderRadiusClasses(isFirstChild as boolean, isLastChild as boolean, isMainSidebarBtn)
  const hasChildren = children && children.length > 0

  const handleToggleDropdown = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleToggleDropdown)
    return () => document.removeEventListener('click', handleToggleDropdown)
  }, [])

  const handleMouseEnter = () => setIsOpen(true)
  const handleMouseLeave = () => setIsOpen(false)
  const handleClick = () => setIsOpen(false)

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`${borderRadiusClass} ${selectedBtnStyles} ${btnClass} relative flex items-center justify-between border-[#242C29] py-2 hover:from-[#c8c3bb] hover:via-[#c8c3bb] hover:to-[#c8c3bb] hover:text-[#1b1b1a]`}
      style={{ width: styles.sidebarWidth }}
    >
      <Link to={href} className="flex w-full items-center px-4 py-2">
        <div className="flex flex-grow items-center">
          <FontAwesomeIcon icon={icon} className="mr-4 h-7 w-7" />
          <span>{label}</span>
        </div>
        {hasChildren && <FontAwesomeIcon icon={faCaretRight} className="ml-2 h-7 w-7" />}
      </Link>
      {hasChildren && isOpen && (
        <div
          className={`${btnClass} absolute left-full top-0 ml-2 rounded-[24px] outline outline-2 outline-[#afaba3]`}
          style={{
            ...sidebarStyleProps,
            height: `${children.length * 100 + (children.length <= 1 ? 0 : (children.length - 1) * 10)}%`,
          }}
        >
          <div className="absolute -left-2 h-full bg-transparent pl-6" />
          <ul className="rounded-[24px] shadow-lg shadow-[#00000054]">
            {children.map((child, index) => (
              <SidebarNavButton
                key={index}
                icon={child.icon}
                label={child.label}
                href={child.href}
                isFirstChild={index === 0}
                isLastChild={index === children.length - 1}
                children={child.children}
                isMainSidebarBtn={false}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SidebarNavButton
