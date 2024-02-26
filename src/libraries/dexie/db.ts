import Dexie from 'dexie'
import { generateDexieSchemaString } from './utils/schema'
import { Primer, primerModel } from './models/primer.model' // Adjust the path as needed
import { JigTemplate, jigModel } from './models/jig.model'
import { Article, articleModel } from './models/article.model'
import { Setting, settingModel } from './models/settings.model'

export class MyDatabase extends Dexie {
  primers: Dexie.Table<Primer, number>
  jigs: Dexie.Table<JigTemplate, number>
  articles: Dexie.Table<Article, number>
  settings: Dexie.Table<Setting, number>

  constructor() {
    super('MyDatabase')

    this.version(1).stores({
      primers: generateDexieSchemaString(primerModel),
      jigs: generateDexieSchemaString(jigModel),
      articles: generateDexieSchemaString(articleModel),
      settings: generateDexieSchemaString(settingModel),
    })

    this.primers = this.table('primers')
    this.jigs = this.table('jigs')
    this.articles = this.table('articles')
    this.settings = this.table('settings')
  }
}

// Create an instance of the database
export const db = new MyDatabase()
