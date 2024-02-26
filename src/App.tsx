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
import Storage from './Routes/Storage/Storage'
import PrimerViewMany from './Routes/Storage/Primers/ViewMany'
import PrimerGenerate from './Routes/Storage/Primers/Generate'
import PrimerViewSingle from './Routes/Storage/Primers/ViewSingle'
import PrimerCreate from './Routes/Storage/Primers/Create'
import JigViewMany from './Routes/Storage/Jigs/ViewMany/ViewMany'
import JigViewSingle from './Routes/Storage/Jigs/ViewSingle'
import JigCreate from './Routes/Storage/Jigs/Create/Create'
import ArticleViewSingle from './Routes/Storage/Articles/ViewSingle/ViewSingle'
import JigCreateUsingXml from './Routes/Storage/Jigs/CreateUsingXml/CreateUsingXml'
import UzturaAtskaites from './Routes/NonPrintingRelated/UzturaAtskaites/UzturaAtskaites'
import ChemicalsUsageMain from './Routes/ChemicalsUsage/Main/Main'
import ArticleAddUsingExcel from './Routes/Storage/Articles/Add/FromFile/UsingExcel/AddUsingExcel'
import ArticlesMenu from './Routes/Storage/Articles/Menu/Menu'
import ArticlesSearch from './Routes/Storage/Articles/Search/Search'
import ArticlesSettings from './Routes/Storage/Articles/Settings/Settings'
import ArticlesAddManually from './Routes/Storage/Articles/Add/Manually/AddManually'
import ArticlesAddMenu from './Routes/Storage/Articles/Add/Menu/Menu'
import ArticlesAddFromFileMenu from './Routes/Storage/Articles/Add/FromFile/Menu'
import ArticlesAddImages from './Routes/Storage/Articles/Add/FromFile/AddImages/AddImages'
import ArticlesExportMenu from './Routes/Storage/Articles/Export/ExportMenu'

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

      // Chemicals
      {
        path: PATH_CONSTANTS.CHEMICALS_USAGE.MAIN,
        element: <ChemicalsUsageMain />
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
        path: PATH_CONSTANTS.STORAGE.ROOT,
        element: <Storage />,
      },

      // Primers
      {
        path: PATH_CONSTANTS.STORAGE.PRIMERS.VIEW_SINGLE,
        element: <PrimerViewSingle />
      },
      {
        path: PATH_CONSTANTS.STORAGE.PRIMERS.VIEW_MANY,
        element: <PrimerViewMany />
      },
      {
        path: PATH_CONSTANTS.STORAGE.PRIMERS.CREATE,
        element: <PrimerCreate />
      },
      {
        path: PATH_CONSTANTS.STORAGE.PRIMERS.GENERATE,
        element: <PrimerGenerate />
      },

      // Jigs
      {
        path: PATH_CONSTANTS.STORAGE.JIGS.VIEW_SINGLE,
        element: <JigViewSingle />
      },
      {
        path: PATH_CONSTANTS.STORAGE.JIGS.VIEW_MANY,
        element: <JigViewMany />
      },
      {
        path: PATH_CONSTANTS.STORAGE.JIGS.CREATE,
        element: <JigCreate />
      },
      {
        path: PATH_CONSTANTS.STORAGE.JIGS.CREATE_USING_XML,
        element: <JigCreateUsingXml />
      },

      /**
       * ARTICLES
       */
      {
        path: PATH_CONSTANTS.STORAGE.ARTICLES.MENU,
        element: <ArticlesMenu />
      },
      // Search articles
      {
        path: PATH_CONSTANTS.STORAGE.ARTICLES.SEARCH,
        element: <ArticlesSearch />
      },
      // Add articles
      {
        path: PATH_CONSTANTS.STORAGE.ARTICLES.ADD.MENU,
        element: <ArticlesAddMenu />
      },
      {
        path: PATH_CONSTANTS.STORAGE.ARTICLES.ADD.MANUALLY,
        element: <ArticlesAddManually />
      },
      {
        path: PATH_CONSTANTS.STORAGE.ARTICLES.ADD.FROM_FILE.MENU,
        element: <ArticlesAddFromFileMenu />
      },
      {
        path: PATH_CONSTANTS.STORAGE.ARTICLES.ADD.FROM_FILE.ADD_IMAGES,
        element: <ArticlesAddImages />
      },
      {
        path: PATH_CONSTANTS.STORAGE.ARTICLES.ADD.FROM_FILE.USING_EXCEL,
        element: <ArticleAddUsingExcel />
      },
      // Export Articles
      {
        path: PATH_CONSTANTS.STORAGE.ARTICLES.EXPORT.MENU,
        element: <ArticlesExportMenu />
      },
      // Articles settings
      {
        path: PATH_CONSTANTS.STORAGE.ARTICLES.SETTINGS,
        element: <ArticlesSettings />
      },
      // View single article
      {
        path: PATH_CONSTANTS.STORAGE.ARTICLES.VIEW_SINGLE,
        element: <ArticleViewSingle />
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
  },
  {
    path: '/uzturs',
    element: <UzturaAtskaites />
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
