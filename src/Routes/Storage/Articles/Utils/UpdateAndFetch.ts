import { MyDatabase, db } from '../../../../libraries/dexie/db'
import { Article } from '../../../../libraries/dexie/models/article.model'
import { JigTemplate } from '../../../../libraries/dexie/models/jig.model'
import { Primer } from '../../../../libraries/dexie/models/primer.model'

export const updateArticleAndFetchJig = async (article: Article): Promise<JigTemplate | null> => {
  if (article.imported_jig_name) {
    const foundJig = await db.jigs.where('name').equalsIgnoreCase(article.imported_jig_name).first()
    if (foundJig) {
      await db.articles.update(article.id!, { imported_jig_name: undefined, jig_id: foundJig.id })
      article.jig_id = foundJig.id // Update the local article object to reflect the change
    }
  }
  const jig = article.jig_id ? await db.jigs.get(article.jig_id) : null
  return jig ?? null
}

// Example function to update an article based on imported_primer_name and fetch the associated primer
export const updateArticleAndFetchPrimer = async (article: Article): Promise<Primer | null> => {
  if (article.imported_primer_name) {
    const foundPrimer = await db.primers.where('name').equalsIgnoreCase(article.imported_primer_name).first()
    if (foundPrimer) {
      await db.articles.update(article.id!, { imported_primer_name: undefined, primer_id: foundPrimer.id })
      article.primer_id = foundPrimer.id // Update the local article object to reflect the change
    }
  }
  const primer = article.primer_id ? await db.primers.get(article.primer_id) : null
  return primer ?? null
}
