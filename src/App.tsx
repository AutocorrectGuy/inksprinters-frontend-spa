import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout"
import Welcome from "./Routes/Welcome/Welcome"
import PATH_CONSTANTS from "./Routes/pathConstants";
import Monaco from "./Routes/Document tools/Text Editor/Monaco";
import About from "./Routes/About/About";
import ExcelToText from "./Routes/Document tools/ExcelToText/ExcelToText";
import DocumentTools from "./Routes/Document tools/DocumentTools";
import PrintingTools from "./Routes/Printing tools/PrintingTools";
import CenterArtwork from "./Routes/Printing tools/Center Artwork/CenterArtwork";
import ArtworkCalibration from "./Routes/Printing tools/Artwork calibration/ArtworkCalibration";
import CMYKColorPicker from "./Routes/Printing tools/CMYK Color picker/CMYKColorPicker";
import Development from "./Routes/Development/Development";
import CodeRunner from "./Routes/Development/Code Runner/CodeRunner";
import TodosList from "./Routes/Development/Todos List/TodosList";
import CodingExercises from "./Routes/Development/Coding Exercises/CodingExercises";
import PrintingResources from "./Routes/Printing Resources/PrintingResources";
import Articles from "./Routes/Printing Resources/Articles/Articles";
import Jigs from "./Routes/Printing Resources/Jigs/Jigs";
import Primers from "./Routes/Printing Resources/Primers/Primers";
import PrimerAdd from "./Routes/Printing Resources/Primers/PrimerAdd";
import PrimerView from "./Routes/Printing Resources/Primers/PrimerView";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [

      // Home route
      {
        path: PATH_CONSTANTS.HOME,
        element: <Welcome />
      },

      // About route
      {
        path: PATH_CONSTANTS.ABOUT,
        element: <About />
      },

      /** 
       * Document tools
       */
      {
        path: PATH_CONSTANTS.DOCUMENT_TOOLS,
        element: <DocumentTools />
      },
      {
        path: PATH_CONSTANTS.EXCEL_CONVERTER,
        element: <ExcelToText />
      },
      {
        path: PATH_CONSTANTS.CODE_EDITOR,
        element: <Monaco />
      },

      /** 
       * PRINTING tools
       */
      {
        path: PATH_CONSTANTS.PRINTING_TOOLS,
        element: <PrintingTools />
      },
      {
        path: PATH_CONSTANTS.CENTER_ARTWORK,
        element: <CenterArtwork />
      },
      {
        path: PATH_CONSTANTS.RECALIBRATE_ARTICLE_POSITION,
        element: <ArtworkCalibration />
      },
      {
        path: PATH_CONSTANTS.CMYK_Color_PICKER,
        element: <CMYKColorPicker />
      },

      /**
       * Printing resources archieve
       */
      {
        path: PATH_CONSTANTS.PRINTING_RESOURCES,
        element: <PrintingResources />
      },
      {
        path: PATH_CONSTANTS.ARTICLES,
        element: <Articles />
      },
      {
        path: PATH_CONSTANTS.JIGS,
        element: <Jigs />
      },
      {
        path: PATH_CONSTANTS.PRIMERS,
        element: <Primers />
      },
      {
        path: PATH_CONSTANTS.PRIMERS_ADD,
        element: <PrimerAdd />
      },
      {
        path: PATH_CONSTANTS.PRIMERS_VIEW,
        element: <PrimerView />
      },

      /**
       * Development
       */
      {
        path: PATH_CONSTANTS.DEVELOPMENT,
        element: <Development />
      },
      {
        path: PATH_CONSTANTS.CODE_RUNNER,
        element: <CodeRunner />
      },
      {
        path: PATH_CONSTANTS.CODE_EXERCISES,
        element: <CodingExercises />
      },
      {
        path: PATH_CONSTANTS.TODOS,
        element: <TodosList />
      }
    ]
  },
]);


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App