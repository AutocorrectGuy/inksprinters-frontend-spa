import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../../Services/Dexie/db';
import { customToastProps } from '../../../Components/Toast/CustomToastContainer';
import { faBottleWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack';
import { CONFIG, TableTypeMapping } from './Config';
import { toProperCase } from '../utils';
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer';
import { useNavigate } from 'react-router-dom';
import { getDefaultValuesForTable } from './Defaults';

type EntryAddProps<T> = {
  tableName: keyof TableTypeMapping;
}

const EntryAdd = <T extends TableTypeMapping[keyof TableTypeMapping]>({ tableName }: EntryAddProps<T>) => {
  type CurrentTableType = TableTypeMapping[typeof tableName];
  const [entry, setEntry] = useState<Partial<CurrentTableType>>(getDefaultValuesForTable<CurrentTableType>(tableName));
  const navigate = useNavigate()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare new entry data
    const newEntryData = { ...entry, created_at: Date.now() } as Partial<T>;

    try {
      // Add the new entry to the database
      await db.table(tableName as string).add(newEntryData);
      toast.success(`New entry added successfully`, customToastProps);
      navigate(CONFIG[tableName].viewEntriesPath)
      
    } catch (err) {
      toast.error(`Failed to add new entry. ${err}`, customToastProps);
    }
  }

  return (
    <MainContentContainer h1={`Add ${toProperCase(tableName).slice(0, -1)}`}>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-sm grow flex-col items-center justify-center gap-4 p-4 text-[#CFCBC4]"
      >
        {tableName === 'primers' &&
          <FontAwesomeIcon icon={faBottleWater} className="rotate-y-animation grow-[0.25] opacity-50" />}

        {Object.keys(entry).map(key => {
          return (
            <div key={key} className="flex flex-col gap-2">
              <label htmlFor={key} className="text-xl">
                {toProperCase(key)}:
              </label>
              <input
                id={key}
                type="text"
                value={entry[key as keyof CurrentTableType] ?? ''}
                onChange={(e) => setEntry({ ...entry, [key]: e.target.value })}
                className="input input-bordered w-full text-xl"
              />
            </div>
          );
        })}

        <div className="flex w-full items-center justify-center gap-2">
          <BtnBack to={CONFIG[tableName].viewEntriesPath} />
          <button type="submit" className="btn flex-grow justify-center bg-[#CA5160] text-xl text-white">
            {`Add New ${tableName}`}
          </button>
        </div>
      </form>
    </MainContentContainer>
  )
}

export default EntryAdd;
