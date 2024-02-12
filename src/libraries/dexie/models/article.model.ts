import { DexieJsTable } from '../utils/schema'

export type ArticleRotationType = 'top' | 'right' | 'down' | 'left'

export type Article = {
  id?: number
  name: string
  colors?: string,
  number?: string
  x?: number
  y?: number
  z?: number
  jig_id?: number
  primer_id?: number
  alignment?: number
  image?: ArrayBuffer
  image_w?: number
  image_h?: number
  rotation?: ArticleRotationType
  notes?: string
  created_at: number
}

// Define the DexieJsTable for Primer
export const articleModel: DexieJsTable<Article> = {
  id: { type: 'number', validation: [], autoIncrement: true },
  name: { type: 'string', validation: ['isValidText', 'isRequired'] },
  colors: { type: 'string' },
  number: { type: 'number' },
  x: { type: 'number' },
  y: { type: 'number' },
  z: { type: 'number' },
  jig_id: { type: 'number' },
  primer_id: { type: 'number' },
  alignment: { type: 'number' },
  image: { type: 'image' },
  image_w: { type: 'number' },
  image_h: { type: 'number' },
  rotation: { type: 'number' },
  notes: { type: 'string' },
  created_at: { type: 'number', validation: ['isNumeric'] },
}
