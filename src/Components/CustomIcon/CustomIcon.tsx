// CustomIcon.tsx
import React, { FC, CSSProperties } from 'react';
import { icons } from './icons'; // Path to your icon registry file
import { twMerge } from 'tailwind-merge';

export type CustomIconType = keyof typeof icons

export type CustomIconProps = {
  icon: CustomIconType
  className?: string;
  style?: CSSProperties;
}

const CustomIcon: FC<CustomIconProps> = ({ icon, className, style }) => {
  const IconSvg = icons[icon] || null;

  return (
    <svg
      className={`${twMerge('text-[#cfcbc480] w-9 h-9', className)}`}
      style={{ ...style }}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      {IconSvg}
    </svg>
  );
};

export default CustomIcon;
