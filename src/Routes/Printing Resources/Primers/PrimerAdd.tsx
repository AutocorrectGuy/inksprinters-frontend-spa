import { useState, FormEvent, useEffect } from 'react'
import { toast } from 'react-toastify';
import { customToastProps } from '../../../Components/Toast/CustomToastContainer';
import { db } from '../../../Services/Dexie/db';
import { useNavigate } from 'react-router-dom';
import PATH_CONSTANTS from '../../pathConstants';
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBottleWater } from '@fortawesome/free-solid-svg-icons';
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack';

const PrimerAdd = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Step 3: Set focus when the component mounts
    const firstInputField = document.getElementById('primerName')
    if (firstInputField) {
      firstInputField.focus()
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
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

    await db.primers.add({ name: lowerCaseName, description })
      .then(() => navigate(PATH_CONSTANTS.PRIMERS))
      .catch((error) => toast.error(`An error occurred while adding the primer. Error: ${error}`, customToastProps));
  };

  return (
    <MainContentContainer h1='Add Primer'>
      <form onSubmit={handleSubmit} className='flex flex-col grow items-center justify-center gap-4 p-4 text-[#CFCBC4] max-w-sm mx-auto'>
        <FontAwesomeIcon icon={faBottleWater} className='opacity-50 grow-[0.25] rotate-y-animation' />
        <div className="flex flex-col gap-2">
          <label htmlFor="primerName" className="text-xl">Primer Name:</label>
          <input
            id="primerName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter primer name"
            className="input input-bordered w-full text-xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="primerDescription" className="text-xl">Description:</label>
          <input
            id="primerDescription"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="input input-bordered w-full text-xl"
          />
        </div>
        <div className='flex gap-2 justify-center items-center w-full'>
          <BtnBack to={PATH_CONSTANTS.PRIMERS} />
          <button type="submit" className="btn bg-[#CA5160] text-white text-xl justify-center flex-grow">
            Add Primer
          </button>
        </div>
      </form>
    </MainContentContainer>
  );
};

export default PrimerAdd