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
  isMainSidebarBtn = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const borderRadiusClass = getBorderRadiusClasses(isFirstChild as boolean, isLastChild as boolean, isMainSidebarBtn)
  const hasChildren = children && children.length > 0;

  const handleToggleDropdown = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) 
      setIsOpen(false);
  }

  useEffect(() => {
    document.addEventListener('click', handleToggleDropdown);
    return () => document.removeEventListener('click', handleToggleDropdown);
  }, []);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  const handleClick = () => setIsOpen(false);
  

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`${borderRadiusClass} ${selectedBtnStyles} ${btnClass} flex items-center justify-between border-[#242C29] py-2 hover:from-[#c8c3bb] hover:via-[#c8c3bb] hover:to-[#c8c3bb] hover:text-[#1b1b1a] relative`}
      style={{ width: styles.sidebarWidth }}
    >
      <Link to={href} className="flex items-center py-2 px-4 w-full" >
        <div className="flex-grow flex items-center">
          <FontAwesomeIcon icon={icon} className="h-7 w-7 mr-4" />
          <span>{label}</span>
        </div>
        {hasChildren && <FontAwesomeIcon icon={faCaretRight} className="ml-2 h-7 w-7" />}
      </Link>
      {hasChildren && isOpen && (
        <div className={`${btnClass} ml-2 absolute left-full top-0 outline outline-2 outline-[#afaba3] rounded-[24px]`}
          style={{ ...sidebarStyleProps, height: `${children.length * 100 + (children.length <= 1 ? 0 : (children.length - 1) * 10)}%` }}
        >
          <div className='absolute -left-2 pl-6 bg-transparent h-full' />
          <ul className='shadow-lg shadow-[#00000054] rounded-[24px]'>
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
  );
};

export default SidebarNavButton
