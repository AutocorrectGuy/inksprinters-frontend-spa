const PATH_CONSTANTS = {
  HOME: '/',
  ABOUT: '/about',
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
  PRINTING_RESOURCES: {
    ROOT: '/printing-resources',
    PRIMERS: {
      CREATE: '/printing-resources/primers/add',
      VIEW_SINGLE: '/printing-resources/primers/view',
      VIEW_MANY: '/printing-resources/primers',
      UPDATE: '/printing-resources/primers/update',
      DELETE: '/printing-resources/primers/delete',
      GENERATE: '/printing-resources/primers/generate',
    },
    JIGS: {
      CREATE: '/printing-resources/jigs/add',
      VIEW_SINGLE: '/printing-resources/jigs/view',
      VIEW_MANY: '/printing-resources/jigs',
      UPDATE: '/printing-resources/jigs/update',
      DELETE: '/printing-resources/jigs/delete',
    },
    ARTICLES: {
      CREATE: '/printing-resources/articles/add',
      VIEW_SINGLE: '/printing-resources/articles/view',
      VIEW_MANY: '/printing-resources/articles',
      UPDATE: '/printing-resources/articles/update',
      DELETE: '/printing-resources/articles/delete',
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
