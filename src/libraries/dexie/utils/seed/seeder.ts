import { faker } from '@faker-js/faker';
import Dexie from 'dexie';
import { DexieJsTable } from '../schema';

type GenericModel = Record<string, any>;

export const insertMockData = async <T extends GenericModel>(
  dbTable: Dexie.Table<T, number>, 
  specs: DexieJsTable<T>, 
  entryCount: number
): Promise<void> => {
  const mockDataArray = await Promise.all(
    Array.from({ length: entryCount }, async () => {
      const record: GenericModel = {};
      for (const key in specs) {
        const fieldSpec = specs[key];
        switch (fieldSpec.type) {
          case 'string':
            record[key] = faker.lorem.words(3);
            break;
          case 'number':
            if (key === 'id') break;
            if(key === 'created_at') {
              record[key] = Date.now()
              break;
            }
            record[key] = faker.datatype.number();
            break;
          case 'image':
            const imageUrl = faker.image.imageUrl();
            const response = await fetch(imageUrl);
            record[key] = await response.arrayBuffer();
            break;
          // Handle other types as needed
        }
      }
      return record as T;
    })
  );

  await dbTable.bulkAdd(mockDataArray);
};