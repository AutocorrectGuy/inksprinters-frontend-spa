import { db } from '../../../../libraries/dexie/db'

const requiredPrimers = [
  { name: 'primer-p2', description: '', created_at: Date.now() },
  { name: 'alcohool', description: '', created_at: Date.now() },
  { name: 'metal-primer', description: '', created_at: Date.now() },
]

export const seedPrimers = async () => {
  // Check if the database already contains at least 3 primers
  const primerCount = await db.primers.count()
  if (primerCount >= 3) return

  // Proceed with seeding missing primers if there are less than 3 primers in the database
  for (const primer of requiredPrimers) {
    const nameLowerCase = primer.name.toLowerCase().trim()
    const exists = await db.primers.where('name').equalsIgnoreCase(nameLowerCase).count()
    if (!exists) await db.primers.add({ ...primer, name: nameLowerCase })
  }
}
