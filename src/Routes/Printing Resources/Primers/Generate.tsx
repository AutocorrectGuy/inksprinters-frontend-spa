import { useState } from 'react';
import { Primer, primerModel,  } from '../../../libraries/dexie/models/primer.model';
import { insertMockData } from '../../../libraries/dexie/utils/seed/seeder';
import { db } from '../../../libraries/dexie/db';

const Generate = () => {
  const [entryCount, setEntryCount] = useState(0);
  const [primers, setPrimers] = useState<Primer[]>([]);

  const handleGenerate = async () => {
    await insertMockData(db.primers, primerModel, entryCount);

    const allPrimers = await db.primers.toArray();
    setPrimers(allPrimers);
  };

  const handleDelete = async (id: number) => {
    await db.primers.delete(id);
    setPrimers(primers.filter(primer => primer.id !== id));
  };

  const handleDeleteAll = async () => {
    await db.primers.clear();
    setPrimers([]);
  };

  return (
    <div className="p-4">
      <input
        type="number"
        className="input input-bordered w-full max-w-xs"
        value={entryCount}
        onChange={(e) => setEntryCount(Number(e.target.value))}
      />
      <button
        className="btn btn-primary mt-2"
        onClick={handleGenerate}
      >
        Generate Data
      </button>
      <div>
        <button
          className="btn btn-error mt-2"
          onClick={handleDeleteAll}
        >
          Delete All Data
        </button>

        <div className="grid grid-cols-3 gap-4">
          {primers.map(primer => (
            <div key={primer.id} className="p-2 border m-2 relative">
              <button
                className="btn btn-ghost text-red-500 absolute right-0 top-0 btn-sm text-xl"
                onClick={() => handleDelete(primer.id!)}
              >
                X
              </button>
              <div><strong>Name:</strong> {primer.name}</div>
              <div><strong>Description:</strong> {primer.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Generate;
