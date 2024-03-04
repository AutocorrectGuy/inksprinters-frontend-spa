import { DexieJsTable } from '../utils/schema'

export type Article = {
  id?: number
  name: string
  colors?: string
  number?: string
  x?: number
  y?: number
  z?: number
  jig_id?: number
  primer_id?: number
  alignment?: string
  image?: ArrayBuffer
  image_w?: number
  image_h?: number
  rotation?: string
  notes?: string
  priming_duration: number
  created_at: number
  // for joining images: if article is loaded from excel file, images have to be loaded separately.
  // We can store the image name from the `image_name` column to this articles column
  imported_image_name?: string
  imported_jig_name?: string
  imported_primer_name?: string
}

// Define the DexieJsTable for Primer
export const articleModel: DexieJsTable<Article> = {
  id: { type: 'number', validation: [], autoIncrement: true },
  name: { type: 'string', validation: ['isValidText', 'isRequired'] },
  colors: { type: 'string' },
  number: { type: 'string' },
  x: { type: 'number' },
  y: { type: 'number' },
  z: { type: 'number' },
  jig_id: { type: 'number' },
  primer_id: { type: 'number' },
  alignment: { type: 'string' },
  image: { type: 'image' },
  image_w: { type: 'number' },
  image_h: { type: 'number' },
  rotation: { type: 'number' },
  notes: { type: 'string' },
  priming_duration: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  created_at: { type: 'number', validation: ['isNumeric'] },
  // for joining images
  imported_image_name: { type: 'string' },
  imported_jig_name: { type: 'string' },
  imported_primer_name: { type: 'string' },
}
