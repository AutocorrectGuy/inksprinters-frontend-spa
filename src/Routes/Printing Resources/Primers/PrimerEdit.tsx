import React, { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../../Services/Dexie/db'
import { customToastProps } from '../../../Components/Toast/CustomToastContainer'
import { Primer } from '../../../Services/Dexie/db'
import { faBottleWater } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack'
import PATH_CONSTANTS from '../../pathConstants'

type Props = {
  primer: Primer
  setPrimer: Dispatch<SetStateAction<Primer | null>>
  setEditingMode: Dispatch<SetStateAction<boolean>>
}

const PrimerEdit = ({ primer, setPrimer, setEditingMode }: Props) => {
  const [editedPrimer, setEditedPrimer] = useState<Primer>(primer)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (primer.name === editedPrimer.name && primer.description !== editedPrimer.description) {
      await db.primers.update(primer.id!, { name: primer.name, description: editedPrimer.description })
      toast.success(`Primer ${editedPrimer.name} successfully updated`, customToastProps)
      setEditingMode(false)
      setPrimer(editedPrimer)
      return
    }

    const trimmedName = editedPrimer.name.trim()
    if (trimmedName.length > 100) {
      toast.error('Primer name should not be longer than 100 characters.', customToastProps)
      return
    }

    const lowerCaseName = trimmedName.toLowerCase()
    const isValidRegex = /^[A-Za-z0-9-_.\s]+$/.test(trimmedName)
    if (!isValidRegex) {
      toast.error(
        'The name of the primer must consist only of these characters: A-Z, a-z, 0-9, -, _, ., or spacebar.',
        customToastProps,
      )
      return
    }

    const existingPrimer = await db.primers.where('name').equalsIgnoreCase(lowerCaseName).first()
    if (existingPrimer) {
      toast.error('A primer with this name already exists in the storage.', customToastProps)
      return
    }

    await db.primers
      .update(primer.id!, { name: editedPrimer.name, description: editedPrimer.description })
      .then(() => {
        setEditingMode(false)
        setPrimer(editedPrimer)
        toast.success(`Primer ${editedPrimer.name} successfully updated`, customToastProps)
      })
      .catch((err) => toast.error(`Failed to update primer ${primer.name}. ${err}`, customToastProps))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-sm grow flex-col items-center justify-center gap-4 p-4 text-[#CFCBC4]"
    >
      <FontAwesomeIcon icon={faBottleWater} className="rotate-y-animation grow-[0.25] opacity-50" />
      <div className="flex flex-col gap-2">
        <label htmlFor="primerName" className="text-xl">
          Primer Name:
        </label>
        <input
          id="primerName"
          type="text"
          value={editedPrimer.name}
          onChange={(e) => setEditedPrimer({ ...editedPrimer, name: e.target.value })}
          className="input input-bordered w-full text-xl"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="primerDescription" className="text-xl">
          Description:
        </label>
        <input
          id="primerDescription"
          type="text"
          value={editedPrimer.description}
          onChange={(e) => setEditedPrimer({ ...editedPrimer, description: e.target.value })}
          className="input input-bordered w-full text-xl"
        />
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <BtnBack to={PATH_CONSTANTS.PRIMERS_VIEW} />
        <button type="submit" className="btn flex-grow justify-center bg-[#CA5160] text-xl text-white">
          Update Primer
        </button>
      </div>
    </form>
  )
}

export default PrimerEdit
