import { Article, ArticleWorkspaceTableNames, Jig, Primer } from '../../../Services/Dexie/db'
import PATH_CONSTANTS from '../../pathConstants'

export type CRUDTemplateComponentProps = {
  tableName: ArticleWorkspaceTableNames
}

export type TableTypeMapping = {
  articles: Article
  primers: Primer
  jigs: Jig
}

export type ConfigEntry = {
  itemsPerPage: number
  viewEntryPath: string
  viewEntriesPath: string
  addEntryPath: string
  queryParam: string
}

export const CONFIG: { [key in ArticleWorkspaceTableNames]: ConfigEntry } = {
  articles: {
    itemsPerPage: 9,
    queryParam: 'id',
    viewEntryPath: PATH_CONSTANTS.ARTICLE_VIEW,
    viewEntriesPath: PATH_CONSTANTS.ARTICLES_VIEW,
    addEntryPath: PATH_CONSTANTS.ARTICLE_ADD,
  },
  jigs: {
    itemsPerPage: 9,
    queryParam: 'name',
    viewEntryPath: PATH_CONSTANTS.JIG_VIEW,
    viewEntriesPath: PATH_CONSTANTS.JIGS_VIEW,
    addEntryPath: PATH_CONSTANTS.JIG_ADD,
  },
  primers: {
    itemsPerPage: 4,
    queryParam: 'name',
    viewEntryPath: PATH_CONSTANTS.PRIMER_VIEW,
    viewEntriesPath: PATH_CONSTANTS.PRIMERS_VIEW,
    addEntryPath: PATH_CONSTANTS.PRIMER_ADD,
  },
}
