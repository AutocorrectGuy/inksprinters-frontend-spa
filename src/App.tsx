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
import PrimersView from './Routes/Printing Resources/Primers/PrimersView'
import PrimerAdd from './Routes/Printing Resources/Primers/PrimerAdd'
import PrimerView from './Routes/Printing Resources/Primers/PrimerView'
import JigsView from './Routes/Printing Resources/Jigs/JigsView'
import JigAdd from './Routes/Printing Resources/Jigs/JigAdd'
import JigView from './Routes/Printing Resources/Jigs/JigView'
import ArticlesView from './Routes/Printing Resources/Articles/ArticlesView'
import ArticleAdd from './Routes/Printing Resources/Articles/ArticleAdd'
import ArticleView from './Routes/Printing Resources/Articles/ArticleView'

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
        path: PATH_CONSTANTS.DOCUMENT_TOOLS,
        element: <DocumentTools />,
      },
      {
        path: PATH_CONSTANTS.EXCEL_CONVERTER,
        element: <ExcelToText />,
      },
      {
        path: PATH_CONSTANTS.CODE_EDITOR,
        element: <Monaco />,
      },

      /**
       * PRINTING tools
       */
      {
        path: PATH_CONSTANTS.PRINTING_TOOLS,
        element: <PrintingTools />,
      },
      {
        path: PATH_CONSTANTS.CENTER_ARTWORK,
        element: <CenterArtwork />,
      },
      {
        path: PATH_CONSTANTS.RECALIBRATE_ARTICLE_POSITION,
        element: <ArtworkCalibration />,
      },
      {
        path: PATH_CONSTANTS.CMYK_Color_PICKER,
        element: <CMYKColorPicker />,
      },

      /**
       * Printing resources archieve
       */
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES,
        element: <PrintingResources />,
      },

      // Articles
      {
        path: PATH_CONSTANTS.ARTICLES_VIEW,
        element: <ArticlesView />,
      },
      {
        path: PATH_CONSTANTS.ARTICLE_ADD,
        element: <ArticleAdd />,
      },
      {
        path: PATH_CONSTANTS.ARTICLE_VIEW,
        element: <ArticleView />,
      },

      // Jigs
      {
        path: PATH_CONSTANTS.JIGS_VIEW,
        element: <JigsView />,
      },
      {
        path: PATH_CONSTANTS.JIG_ADD,
        element: <JigAdd />,
      },
      {
        path: PATH_CONSTANTS.JIG_VIEW,
        element: <JigView />,
      },

      // Primers
      {
        path: PATH_CONSTANTS.PRIMERS_VIEW,
        element: <PrimersView />,
      },
      {
        path: PATH_CONSTANTS.PRIMER_ADD,
        element: <PrimerAdd />,
      },
      {
        path: PATH_CONSTANTS.PRIMER_VIEW,
        element: <PrimerView />,
      },

      /**
       * Development
       */
      {
        path: PATH_CONSTANTS.DEVELOPMENT,
        element: <Development />,
      },
      {
        path: PATH_CONSTANTS.CODE_RUNNER,
        element: <CodeRunner />,
      },
      {
        path: PATH_CONSTANTS.CODE_EXERCISES,
        element: <CodingExercises />,
      },
      {
        path: PATH_CONSTANTS.TODOS,
        element: <TodosList />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
