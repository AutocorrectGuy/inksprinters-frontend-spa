import Dexie from 'dexie'
import { generateDexieSchemaString } from './utils/schema'
import { Primer, primerModel } from './models/primer.model' // Adjust the path as needed
import { JigTemplate, jigModel } from './models/jig.model'
import { Article, articleModel } from './models/article.model'

export class MyDatabase extends Dexie {
  // Declare tables with specific types
  primers: Dexie.Table<Primer, number>
  jigs: Dexie.Table<JigTemplate, number>
  articles: Dexie.Table<Article, number>

  constructor() {
    super('MyDatabase')

    console.log(generateDexieSchemaString(articleModel))
    this.version(1).stores({
      primers: generateDexieSchemaString(primerModel),
      jigs: generateDexieSchemaString(jigModel),
      articles: generateDexieSchemaString(articleModel),
    })

    this.primers = this.table('primers')
    this.jigs = this.table('jigs')
    this.articles = this.table('articles')
  }
}

// Create an instance of the database
export const db = new MyDatabase()
