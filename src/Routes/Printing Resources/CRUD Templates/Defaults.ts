import { Article, Jig, Primer } from "../../../Services/Dexie/db"
import { TableTypeMapping } from "./Config"

export const defaultArticle: Partial<Article> = {
  name: '',
  jig_id: '',
  primer_id: 0,
  article_number: '',
  x: 0,
  y: 0,
  z: 0,
  alignment: 0,
  image_name: 0,
  img_w: 0,
  img_h: 0,
  rotation: 0,
  notes: 0,
  image: new ArrayBuffer(0), // empty ArrayBuffer
}

export const defaultJig: Partial<Jig> = {
  name: '',
  width: 0,
  height: 0,
  cellWidth: 0,
  cellHeight: 0,
  offsetX: 0,
  offsetY: 0,
  gapX: 0,
  gapY: 0,
  cell_count: 0,
}

export const defaultPrimer: Partial<Primer> = {
  name: '',
  description: '',
}

export const getDefaultValuesForTable = <T>(tableName: keyof TableTypeMapping): Partial<T> => {
  switch (tableName) {
    case 'articles':
      return defaultArticle as Partial<T>
    case 'primers':
      return defaultPrimer as Partial<T>
    case 'jigs':
      return defaultJig as Partial<T>
    default:
      return {}
  }
}
