import React, { useEffect, useRef, useState } from 'react'
import { styles } from '../config/MainLayout.config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { sidebarStyleProps } from './SidebarNav'
import { Link } from 'react-router-dom'
import { btnClass, getBorderRadiusClasses, selectedBtnStyles } from '../utils/styleUtils'
import { SideBarButtonProps } from '../types'

const SidebarNavButton: React.FC<SideBarButtonProps> = ({
  icon,
  label,
  href,
  children,
  isFirstChild,
  isLastChild,
  isMainSidebarBtn = true
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [renderFromTop, setRenderFromTop] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const borderRadiusClass = getBorderRadiusClasses(isFirstChild as boolean, isLastChild as boolean, isMainSidebarBtn)
  const hasChildren = children && children.length > 0

  useEffect(() => {
    const handleResize = () => {
      if (isOpen && dropdownRef.current) {
        const buttonRect = dropdownRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - buttonRect.bottom;
        // Use querySelector to find the first child element, which should have clientHeight
        const dropdownElement = dropdownRef.current.querySelector(':scope > div');
        const dropdownHeight = dropdownElement ? dropdownElement.clientHeight : 0;
        // If not enough space below, render from top
        setRenderFromTop(spaceBelow < dropdownHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it on mount to check initial position
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]); // Dependency array includes isOpen to re-calculate when it changes


  const handleToggleDropdown = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleToggleDropdown)
    return () => document.removeEventListener('click', handleToggleDropdown)
  }, [])

  const handleMouseEnter = () => setIsOpen(true)
  const handleMouseLeave = () => setIsOpen(false)
  const handleClick = () => setIsOpen(!isOpen)

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`${borderRadiusClass} ${selectedBtnStyles} ${btnClass} relative flex items-center justify-between border-[#242C29] py-2 hover:from-[#c8c3bb] hover:via-[#c8c3bb] hover:to-[#c8c3bb] hover:text-[#1b1b1a]`}
      style={{ width: styles.sidebarWidth }}
    >
      <Link to={href} className="flex w-full items-center px-4" style={{ height: styles.buttonHeight }}>
        <div className="flex flex-grow items-center">
          <FontAwesomeIcon icon={icon} className="mr-4 h-7 w-7" />
          <span>{label}</span>
        </div>
        {hasChildren && <FontAwesomeIcon icon={faCaretRight} className="ml-2 h-7 w-7" />}
      </Link>
      {hasChildren && isOpen && (
        <div
          className={`${btnClass} absolute left-full ml-2 rounded-[24px] outline outline-2 outline-[#afaba3] ${renderFromTop ? 'bottom-0' : 'top-0'
            }`}
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
