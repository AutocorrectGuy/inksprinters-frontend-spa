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
import PrimerViewMany from './Routes/Printing Resources/Primers/ViewMany'
import PrimerGenerate from './Routes/Printing Resources/Primers/Generate'
import PrimerViewSingle from './Routes/Printing Resources/Primers/ViewSingle'
import PrimerCreate from './Routes/Printing Resources/Primers/Create'
import JigViewMany from './Routes/Printing Resources/Jigs/ViewMany'
import JigViewSingle from './Routes/Printing Resources/Jigs/ViewSingle'
import JigCreate from './Routes/Printing Resources/Jigs/Create/Create'
import ArticleViewMany from './Routes/Printing Resources/Articles/ViewMany'
import ArticleViewSingle from './Routes/Printing Resources/Articles/ViewSingle'
import ArticleCreate from './Routes/Printing Resources/Articles/Create'

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

      // Primers
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.PRIMERS.VIEW_SINGLE,
        element: <PrimerViewSingle />
      },
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.PRIMERS.VIEW_MANY,
        element: <PrimerViewMany />
      },
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.PRIMERS.CREATE,
        element: <PrimerCreate />
      },
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.PRIMERS.GENERATE,
        element: <PrimerGenerate />
      },

      // Jigs
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.JIGS.VIEW_SINGLE,
        element: <JigViewSingle />
      },
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.JIGS.VIEW_MANY,
        element: <JigViewMany />
      },
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.JIGS.CREATE,
        element: <JigCreate />
      },

      // Articles
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.ARTICLES.VIEW_SINGLE,
        element: <ArticleViewSingle />
      },
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.ARTICLES.VIEW_MANY,
        element: <ArticleViewMany />
      },
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES.ARTICLES.CREATE,
        element: <ArticleCreate />
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
