import {
  faAdd,
  faBottleWater,
  faCalculator,
  faCode,
  faDatabase,
  faEdit,
  faFileText,
  faGamepad,
  faList,
  faListUl,
  faLocationPin,
  faRunning,
  faSearch,
  faTable,
  faTools,
  faUpDownLeftRight,
  faWrench,
} from '@fortawesome/free-solid-svg-icons'
import PATH_CONSTANTS from '../../../Routes/pathConstants'
import { faBookmark, faFileExcel, faBuilding } from '@fortawesome/free-regular-svg-icons'
import { SiderBarButtonProps } from '../types'
import { faArtstation } from '@fortawesome/free-brands-svg-icons'

export const siderBarButtons: SiderBarButtonProps[] = [
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

  /**
   * PRINTING TOOLS
   */
  {
    icon: faTools,
    label: 'Printing tools',
    href: PATH_CONSTANTS.PRINTING_TOOLS,
    children: [
      {
        icon: faUpDownLeftRight,
        label: 'Center artwork',
        description: 'Calculates and returns the perfect centering values for input into RIP software.',
        href: PATH_CONSTANTS.CENTER_ARTWORK,
      },
      {
        icon: faCalculator,
        label: 'Artwork Recalibration',
        description:
          'Adjust the new position based on previous sizes and positions of your artwork if it has been resized.',
        href: PATH_CONSTANTS.RECALIBRATE_ARTICLE_POSITION,
      },
      {
        icon: faLocationPin,
        label: 'CMYK Color Picker',
        description: 'Select CMYK color for your designs from the color picker.',
        href: PATH_CONSTANTS.CMYK_Color_PICKER,
      },
    ],
  },

  /**
   * PRINTING RESOURCES ARCHIEVE
   */
  {
    icon: faDatabase,
    label: 'Printing Resources',
    href: PATH_CONSTANTS.PRINTING_RESOURCES,
    children: [
      {
        icon: faArtstation,
        label: 'Articles',
        description: 'Find, add, edit and remove articles',
        href: PATH_CONSTANTS.ARTICLES,
      },
      {
        icon: faTable,
        label: 'Jigs',
        description: 'Find, add, edit and remove jigs',
        href: PATH_CONSTANTS.JIGS,
      },
      {
        icon: faBottleWater,
        label: 'Primers',
        description: 'Find, add, edit and remove primers',
        href: PATH_CONSTANTS.PRIMERS,
      },
    ],
  },

  /**
   * DOCUMENT TOOLS
   */
  {
    icon: faFileText,
    label: 'Document tools',
    href: PATH_CONSTANTS.DOCUMENT_TOOLS,
    children: [
      {
        icon: faFileExcel,
        label: 'Excel file encoder',
        description:
          'Identifies non-Windows-1252 encoded characters in Excel files, offering various text-related functionalities.',
        href: PATH_CONSTANTS.EXCEL_CONVERTER,
      },
      {
        icon: faCode,
        label: 'Text/code editor',
        description: 'A straightforward and efficient Monaco-based text-code editor for seamless coding and editing.',
        href: PATH_CONSTANTS.CODE_EDITOR,
      },
    ],
  },

  /**
   * DEVELOPMENT
   */
  {
    icon: faCode,
    label: 'Development',
    href: PATH_CONSTANTS.DEVELOPMENT,
    children: [
      {
        icon: faRunning,
        label: 'JS Code Runner',
        description: 'Write and execute JavaScript code snippets in a user-friendly environment',
        href: PATH_CONSTANTS.CODE_RUNNER,
      },
      {
        icon: faGamepad,
        label: 'Exercises',
        description: 'Up your game. Last updates: 19.01.2024',
        href: PATH_CONSTANTS.CODE_EXERCISES,
      },
      {
        icon: faWrench,
        label: 'Todos list',
        description:
          'Help devs to organize, prioritize, and track pending development tasks and features for this app.',
        href: PATH_CONSTANTS.TODOS,
      },
    ],
  },
]
