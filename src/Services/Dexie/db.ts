import Dexie, { Table } from 'dexie'

export type Article = {
  id?: number
  name: string
  jig_id: string
  primer_id: number
  article_number: string // could be some something like `w330` or `3310`
  x: number
  y: number
  z: number
  alignment: number
  image_name: number
  img_w: number
  img_h: number
  rotation: number
  notes: number
  image: ArrayBuffer
  created_at: number
}

export type Jig = {
  id?: number
  name: string
  width: number
  height: number
  cellWidth: number
  cellHeight: number
  offsetX: number
  offsetY: number
  gapX: number
  gapY: number
  cell_count: number
  created_at: number
}

export type Primer = {
  id?: number
  name: string
  description: string
  created_at: number
}
export type ArticleWorkspaceTableNames = 'articles' | 'jigs' | 'primers'

export class ArticleWorkspaceDexie extends Dexie {
  articles!: Table<Article>
  jigs!: Table<Jig>
  primers!: Table<Primer>

  constructor() {
    super('article_workspace')
    this.version(1).stores({
      articles:
        '++id, jig_id, primer_id, article_number, name, x, y, z, alignment, image_name, img_w, img_h, rotation, notes, image, created_at, [&jig_id], [&primer_id]',
      jigs: '++id, &name, width, height, cellWidth, cellHeight, offsetX, offsetY, gapX, gapY, cell_count, created_at',
      primers: '++id, &name, description, created_at',
    })
  }
}

export const db = new ArticleWorkspaceDexie()
