import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout/MainLayout'
import Welcome from './Routes/Welcome/Welcome'
import PATH_CONSTANTS from './Routes/pathConstants'
import Monaco from './Routes/Document tools/Text Editor/Monaco'
import About from './Routes/About/About'
import ExcelToText from './Routes/Document tools/ExcelToText/ExcelToText'
import DocumentTools from './Routes/Document tools/DocumentTools'
import PrintingTools from './Routes/Printing tools/PrintingTools'
import CenterArtwork from './Routes/Printing tools/Center Artwork/CenterArtwork'
import ArtworkCalibration from './Routes/Printing tools/Artwork calibration/ArtworkCalibration'
import CMYKColorPicker from './Routes/Printing tools/CMYK Color picker/CMYKColorPicker'
import Development from './Routes/Development/Development'
import CodeRunner from './Routes/Development/Code Runner/CodeRunner'
import TodosList from './Routes/Development/Todos List/TodosList'
import CodingExercises from './Routes/Development/Coding Exercises/CodingExercises'
import PrintingResources from './Routes/Printing Resources/PrintingResources'
import ViewMany from './Routes/Printing Resources/Primers/ViewMany'
import Generate from './Routes/Printing Resources/Primers/Generate'
import ViewSingle from './Routes/Printing Resources/Primers/ViewSingle'
import Create from './Routes/Printing Resources/Primers/Create'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // Home route
      {
        path: PATH_CONSTANTS.HOME,
        element: <Welcome />,
      },

      // About route
      {
        path: PATH_CONSTANTS.ABOUT,
        element: <About />,
      },

      /**
       * Document tools
       */
      {
        path: PATH_CONSTANTS.DOCUMENT_TOOLS.ROOT,
        element: <DocumentTools />,
      },
      {
        path: PATH_CONSTANTS.DOCUMENT_TOOLS.EXCEL_CONVERTER,
        element: <ExcelToText />,
      },
      {
        path: PATH_CONSTANTS.DOCUMENT_TOOLS.CODE_EDITOR,
        element: <Monaco />,
      },

      /**
       * PRINTING tools
       */
      {
        path: PATH_CONSTANTS.PRINTING_TOOLS.ROOT,
        element: <PrintingTools />,
      },
      {
        path: PATH_CONSTANTS.PRINTING_TOOLS.CENTER_ARTWORK,
        element: <CenterArtwork />,
      },
      {
        path: PATH_CONSTANTS.PRINTING_TOOLS.RECALIBRATE_ARTICLE_POSITION,
        element: <ArtworkCalibration />,
      },
      {
        path: PATH_CONSTANTS.PRINTING_TOOLS.CMYK_Color_PICKER,
        element: <CMYKColorPicker />,
      },

      /**
       * Printing resources archive
       */
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.ROOT,
        element: <PrintingResources />,
      },
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.PRIMERS.VIEW_SINGLE,
        element: <ViewSingle />
      },
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.PRIMERS.VIEW_MANY,
        element: <ViewMany />
      },
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.PRIMERS.CREATE,
        element: <Create />
      },
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.PRIMERS.GENERATE,
        element: <Generate />
      },
      /**
      * Development
      */
      {
        path: PATH_CONSTANTS.DEVELOPMENT.ROOT,
        element: <Development />,
      },
      {
        path: PATH_CONSTANTS.DEVELOPMENT.CODE_RUNNER,
        element: <CodeRunner />,
      },
      {
        path: PATH_CONSTANTS.DEVELOPMENT.CODE_EXERCISES,
        element: <CodingExercises />,
      },
      {
        path: PATH_CONSTANTS.DEVELOPMENT.TODOS,
        element: <TodosList />,
      },
    ],
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
