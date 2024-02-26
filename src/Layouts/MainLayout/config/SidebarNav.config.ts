import {
  faBottleWater,
  faCalculator,
  faCode,
  faDatabase,
  faFileText,
  faFlask,
  faGamepad,
  faLocationPin,
  faRunning,
  faTable,
  faTools,
  faUpDownLeftRight,
  faWrench,
} from '@fortawesome/free-solid-svg-icons'
import PATH_CONSTANTS from '../../../Routes/pathConstants'
import { faBookmark, faFileExcel, faBuilding } from '@fortawesome/free-regular-svg-icons'
import { faArtstation } from '@fortawesome/free-brands-svg-icons'
import { SideBarButtonProps } from '../types'

export const sideBarButtons: SideBarButtonProps[] = [
  {
    icon: faBuilding,
    label: 'Home',
    href: PATH_CONSTANTS.HOME,
  },
  {
    icon: faBookmark,
    label: 'About',
    href: PATH_CONSTANTS.ABOUT,
  },
  {
    icon: faFlask,
    label: 'Chemicals usage',
    href: PATH_CONSTANTS.CHEMICALS_USAGE.MAIN,
  },
  /**
   * PRINTING TOOLS
   */
  {
    icon: faTools,
    label: 'Printing tools',
    href: PATH_CONSTANTS.PRINTING_TOOLS.ROOT,
    children: [
      {
        icon: faUpDownLeftRight,
        label: 'Center artwork',
        description: 'Calculates and returns the perfect centering values for input into RIP software.',
        href: PATH_CONSTANTS.PRINTING_TOOLS.CENTER_ARTWORK,
      },
      {
        icon: faCalculator,
        label: 'Artwork Recalibration',
        description:
          'Adjust the new position based on previous sizes and positions of your artwork if it has been resized.',
        href: PATH_CONSTANTS.PRINTING_TOOLS.RECALIBRATE_ARTICLE_POSITION,
      },
      {
        icon: faLocationPin,
        label: 'CMYK Color Picker',
        description: 'Select CMYK color for your designs from the color picker.',
        href: PATH_CONSTANTS.PRINTING_TOOLS.CMYK_Color_PICKER,
      },
    ],
  },
  /**
   * PRINTING RESOURCES ARCHIEVE
   */
  {
    icon: faDatabase,
    label: 'Storage',
    href: PATH_CONSTANTS.STORAGE.ROOT,
    children: [
      {
        icon: faArtstation,
        label: 'Articles',
        description: 'Find, add, edit and remove articles',
        href: PATH_CONSTANTS.STORAGE.ARTICLES.MENU,
      },
      {
        icon: faTable,
        label: 'Jigs',
        description: 'Find, add, edit and remove jigs',
        href: PATH_CONSTANTS.STORAGE.JIGS.VIEW_MANY,
      },
      {
        icon: faBottleWater,
        label: 'Primers',
        description: 'Find, add, edit and remove primers',
        href: PATH_CONSTANTS.STORAGE.PRIMERS.VIEW_MANY
      },
    ],
  },
  /**
   * DOCUMENT TOOLS
   */
  {
    icon: faFileText,
    label: 'Document tools',
    href: PATH_CONSTANTS.DOCUMENT_TOOLS.ROOT,
    children: [
      {
        icon: faFileExcel,
        label: 'Excel file encoder',
        description:
          'Identifies non-Windows-1252 encoded characters in Excel files, offering various text-related functionalities.',
        href: PATH_CONSTANTS.DOCUMENT_TOOLS.EXCEL_CONVERTER,
      },
      {
        icon: faCode,
        label: 'Text/code editor',
        description: 'A straightforward and efficient Monaco-based text-code editor for seamless coding and editing.',
        href: PATH_CONSTANTS.DOCUMENT_TOOLS.CODE_EDITOR,
      },
    ],
  },
  /**
   * DEVELOPMENT
   */
  {
    icon: faCode,
    label: 'Development',
    href: PATH_CONSTANTS.DEVELOPMENT.ROOT,
    children: [
      {
        icon: faRunning,
        label: 'JS Code Runner',
        description: 'Write and execute JavaScript code snippets in a user-friendly environment',
        href: PATH_CONSTANTS.DEVELOPMENT.CODE_RUNNER,
      },
      {
        icon: faGamepad,
        label: 'Exercises',
        description: 'Up your game. Last updates: 19.01.2024',
        href: PATH_CONSTANTS.DEVELOPMENT.CODE_EXERCISES,
      },
      {
        icon: faWrench,
        label: 'Todos list',
        description:
          'Help devs to organize, prioritize, and track pending development tasks and features for this app.',
        href: PATH_CONSTANTS.DEVELOPMENT.TODOS,
      },
    ],
  }
]
