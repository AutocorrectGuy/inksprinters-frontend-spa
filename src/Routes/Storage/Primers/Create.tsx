import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../libraries/dexie/db'; // Import your Dexie instance
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer';
import PATH_CONSTANTS from '../../pathConstants';
import { toast } from 'react-toastify';
import { customToastProps } from '../../../libraries/toast/CustomToastContainer';
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack';
import { validateData } from '../../../libraries/dexie/utils/validation';
import { Primer, primerModel } from '../../../libraries/dexie/models/primer.model';

const Create = () => {
  const [formData, setFormData] = useState<Primer>({ name: '', description: '', created_at: 0 });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const primerToAdd = {
        ...formData,
        created_at: new Date().getTime(),
      }
      validateData(primerToAdd, primerModel)
      
      await db.primers.add(primerToAdd);
      toast.success(`Primer ${formData.name} added successfully!`, customToastProps)
      navigate(PATH_CONSTANTS.STORAGE.PRIMERS.VIEW_MANY); // Redirect to viewMany component
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage, customToastProps);
    }
  };

  return (
    <MainContentContainer h1='Add Primer'>
      <div className='flex flex-col grow items-center justify-center'>
        <form onSubmit={handleSubmit} className='max-w-[300px] w-full'>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" name="name" className="input input-bordered" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered"
              value={formData.description}
              onChange={(e) => handleInputChange(e)}
              rows={2}
            />          </div>
          <div className="mt-4 flex gap-2">
            <BtnBack to={PATH_CONSTANTS.STORAGE.PRIMERS.VIEW_MANY} />
            <button type="submit" className="btn btn-primary grow text-lg">Add</button>
          </div>
        </form>
      </div>
    </MainContentContainer>
  );
};

export default Create;
