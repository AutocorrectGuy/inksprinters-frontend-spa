const PATH_CONSTANTS = {
  HOME: '/',
  ABOUT: '/about',
  CHEMICALS_USAGE: {
    MAIN: '/a',
  },
  DOCUMENT_TOOLS: {
    ROOT: '/document-tools',
    EXCEL_CONVERTER: '/document-tools/excel-converter',
    CODE_EDITOR: '/document-tools/text-editor',
  },
  PRINTING_TOOLS: {
    ROOT: '/printing-tools',
    CENTER_ARTWORK: '/printing-tools/center-artwork',
    RECALIBRATE_ARTICLE_POSITION: '/printing-tools/recalibrate-article-position',
    CMYK_Color_PICKER: '/printing-tools/cmyk-color-picker',
  },
  STORAGE: {
    ROOT: '/storage',
    PRIMERS: {
      CREATE: '/storage/primers/add',
      VIEW_SINGLE: '/storage/primers/view',
      VIEW_MANY: '/storage/primers',
      UPDATE: '/storage/primers/update',
      DELETE: '/storage/primers/delete',
      GENERATE: '/storage/primers/generate',
    },
    JIGS: {
      CREATE: '/storage/jigs/add',
      CREATE_USING_XML: '/storage/jigs/add-by-using-xml',
      VIEW_SINGLE: '/storage/jigs/view',
      VIEW_MANY: '/storage/jigs',
      UPDATE: '/storage/jigs/update',
      DELETE: '/storage/jigs/delete',
    },
    ARTICLES: {
      MENU: '/storage/articles',
      SEARCH: '/storage/articles/search',
      ADD: {
        MENU: '/storage/articles/add/menu',
        MANUALLY: '/storage/articles/add/add-manually',
        FROM_FILE: {
          MENU: '/storage/articles/add/from-file/menu',
          USING_EXCEL: '/storage/articles/add/from-file/add-using-excel',
          ADD_IMAGES: '/storage/articles/add/from-file/add-images'
        }
      },
      EXPORT: {
        MENU: '/storage/articles/menu'
      },
      SETTINGS: '/storage/articles/settings',
      VIEW_SINGLE: '/storage/articles/view',
      UPDATE: '/storage/articles/update',
      DELETE: '/storage/articles/delete',
    },
  },
  DEVELOPMENT: {
    ROOT: '/development',
    CODE_RUNNER: '/development/code-runner',
    CODE_EXERCISES: '/development/code-exercises',
    TODOS: '/development/todos',
  },
}

export default PATH_CONSTANTS
