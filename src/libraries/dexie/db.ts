import Dexie from 'dexie'
import { generateDexieSchemaString } from './utils/schema'
import { primerSpecs, Primer } from './models/primer.model' // Adjust the path as needed

export class MyDatabase extends Dexie {
  // Declare tables with specific types
  primers: Dexie.Table<Primer, number>

  constructor() {
    super('MyDatabase')

    this.version(1).stores({
      primers: generateDexieSchemaString(primerSpecs),
    })

    this.primers = this.table('primers')
  }
}

// Create an instance of the database
export const db = new MyDatabase()
