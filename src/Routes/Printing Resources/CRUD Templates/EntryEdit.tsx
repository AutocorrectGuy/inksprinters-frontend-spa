import React, { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../../Services/Dexie/db'
import { customToastProps } from '../../../Components/Toast/CustomToastContainer'
import { faBottleWater } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack'
import { CONFIG, TableTypeMapping } from './Config'
import { toProperCase } from '../utils'

type EntryEditProps<T> = {
  entry: T;
  setEntry: Dispatch<SetStateAction<T | null>>;
  setEditingMode: Dispatch<SetStateAction<boolean>>;
  tableName: keyof TableTypeMapping;
}

const EntryEdit = <T extends TableTypeMapping[keyof TableTypeMapping]>(
  { entry, setEntry, setEditingMode, tableName }: EntryEditProps<T>
) => {
  type CurrentTableType = TableTypeMapping[typeof tableName]
  const [editedEntry, setEditedEntry] = useState<T>(entry)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updateData: Partial<T> = {};
    for (let i = 0; i < Object.keys(editedEntry).length; i++) {
      const key = Object.keys(editedEntry)[i]
      if (key !== 'created_at' && key !== 'id') {
        // Check if the value has changed
        const editedField = editedEntry[key as keyof T]
        if (editedField !== entry[key as keyof T] && typeof editedField === 'string') {
          const trimmed = editedField.trim()
          if (trimmed.length) {
            const isValidRegex = /^[A-Za-z0-9-_.\s]+$/.test(editedField)
            if (!isValidRegex) {
              toast.error(
                `The ${key} of the ${tableName} must consist only of these characters: A-Z, a-z, 0-9, -, _, ., or spacebar`,
                customToastProps,
              )
              return
            }
          }
          updateData[key as keyof T] = editedField;
        }
      }
    }

    if (tableName === 'jigs' || tableName === 'primers') {
      const existingEntry = await db[tableName].where('name').equalsIgnoreCase(editedEntry.name.trim()).first()
      if (existingEntry && existingEntry.id !== entry.id) {
        toast.error(`${toProperCase(tableName).slice(0, -1)} with this name already exists in the storage`, customToastProps)
        return
      }
    }

    if (Object.keys(updateData).length > 0) {
      // Perform the update
      await db.table(tableName as string).update(entry.id, updateData)
        .then(() => {
          setEditingMode(false);
          setEntry(editedEntry);
          toast.success(`Entry ${editedEntry.name} successfully updated`, customToastProps);
        })
        .catch((err) => {
          toast.error(`Failed to update entry ${entry.name}. ${err}`, customToastProps);
        });
    } else {
      toast.info('No changes to update', customToastProps);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-sm grow flex-col items-center justify-center gap-4 p-4 text-[#CFCBC4]"
    >
      {tableName === 'primers'
        && <FontAwesomeIcon icon={faBottleWater} className="rotate-y-animation grow-[0.25] opacity-50" />}

      {Object.keys(editedEntry).map((key) => {
        if (key !== 'id' && key !== 'created_at') {
          return (
            <div key={key} className="flex flex-col gap-2">
              <label htmlFor={key} className="text-xl">
                {toProperCase(key)}:
              </label>
              <input
                id={key}
                type="text"
                value={editedEntry[key as keyof CurrentTableType]}
                onChange={(e) => setEditedEntry({ ...editedEntry, [key]: e.target.value })}
                className="input input-bordered w-full text-xl"
              />
            </div>
          );
        }
        return null;
      })}

      <div className="flex w-full items-center justify-center gap-2">
        <BtnBack to={CONFIG[tableName].viewEntriesPath} />
        <button type="submit" className="btn flex-grow justify-center bg-[#CA5160] text-xl text-white">
          {`Update ${tableName}`}
        </button>
      </div>
    </form>
  )
}

export default EntryEdit
