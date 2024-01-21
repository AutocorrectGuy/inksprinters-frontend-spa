import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../../Services/Dexie/db';
import { customToastProps } from '../../../Components/Toast/CustomToastContainer';
import { Primer } from '../../../Services/Dexie/db';
import { faBottleWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack';
import PATH_CONSTANTS from '../../pathConstants';

type Props = {
  primer: Primer
  setPrimer: Dispatch<SetStateAction<Primer | null>>
  setEditingMode: Dispatch<SetStateAction<boolean>>
}

const PrimerEdit = ({ primer, setPrimer, setEditingMode }: Props) => {
  const [editedPrimer, setEditedPrimer] = useState<Primer>(primer);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = editedPrimer.name.trim();
    if (trimmedName.length > 100) {
      toast.error('Primer name should not be longer than 100 characters.', customToastProps);
      return;
    }

    const lowerCaseName = trimmedName.toLowerCase();
    const isValidRegex = /^[A-Za-z0-9-_.\s]+$/.test(trimmedName)
    if (!isValidRegex) {
      toast.error('The name of the primer must consist only of these characters: A-Z, a-z, 0-9, -, _, ., or spacebar.', customToastProps);
      return;
    }

    const existingPrimer = await db.primers.where('name').equalsIgnoreCase(lowerCaseName).first();
    if (existingPrimer) {
      toast.error('A primer with this name already exists in the storage.', customToastProps);
      return;
    }

    await db.primers.update(primer.id!, { name: editedPrimer.name, description: editedPrimer.description })
      .then(() => {
        setEditingMode(false)
        setPrimer(editedPrimer)
        toast.success(`Primer ${editedPrimer.name} successfully updated`, customToastProps)
      })
      .catch((err) => toast.error(`Failed to update primer ${primer.name}. ${err}`, customToastProps))
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col grow items-center justify-center gap-4 p-4 text-[#CFCBC4] max-w-sm mx-auto'>
      <FontAwesomeIcon icon={faBottleWater} className='opacity-50 grow-[0.25] rotate-y-animation' />
      <div className="flex flex-col gap-2">
        <label htmlFor="primerName" className="text-xl">Primer Name:</label>
        <input
          id="primerName"
          type="text"
          value={editedPrimer.name}
          onChange={(e) => setEditedPrimer({ ...editedPrimer, name: e.target.value })}
          className="input input-bordered w-full text-xl"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="primerDescription" className="text-xl">Description:</label>
        <input
          id="primerDescription"
          type="text"
          value={editedPrimer.description}
          onChange={(e) => setEditedPrimer({ ...editedPrimer, description: e.target.value })}
          className="input input-bordered w-full text-xl"
        />
      </div>
      <div className='flex gap-2 justify-center items-center w-full'>
        <BtnBack to={PATH_CONSTANTS.PRIMERS} />
        <button type="submit" className="btn bg-[#CA5160] text-white text-xl justify-center flex-grow">
          Update Primer
        </button>
      </div>
    </form>
  );
};

export default PrimerEdit;