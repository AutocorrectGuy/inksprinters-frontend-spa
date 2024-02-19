import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../libraries/dexie/db';
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer';
import PATH_CONSTANTS from '../../pathConstants';
import { toast } from 'react-toastify';
import { customToastProps } from '../../../libraries/toast/CustomToastContainer';
import BtnBack from '../../../Layouts/MainLayout/components/BtnBack';
import { validateData } from '../../../libraries/dexie/utils/validation';
import { Article, articleModel } from '../../../libraries/dexie/models/article.model';
import { JigTemplate } from '../../../libraries/dexie/models/jig.model';
import { Primer } from '../../../libraries/dexie/models/primer.model';
import TailwindcssDropdown from '../../../Components/Dropdowns/TailwindcssDropdown';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { CSSObjectWithLabel, GroupBase, OptionProps } from 'react-select';


type EntryType = { id: number, name: string }
type LoadedData = {
  jigs: EntryType[]
  primers: EntryType[]
}

const returnIdsAndNames = (items: JigTemplate[] | Primer[]) => items.map(({ id, name }) => ({ value: id, label: name }))

const loadOptions = (inputValue: any, callback: any) => {
  db.jigs.toArray()
    .then(returnIdsAndNames)
    .then(options => callback(options))
    .catch(error => {
      console.error('Error loading options:', error);
      callback([]);
    });
};

// ((base: CSSObjectWithLabel, props: OptionProps<unknown, false, GroupBase<unknown>>)
const reactSelectStyles = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: '#1D232A',
    borderColor: '#383F47',
    color: '#fff',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.7)',
    }
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: '#1D232A',
    boxShadow: '0px 0px 18px 3px #203b39'
  }),
  option: (provided: CSSObjectWithLabel, state:OptionProps<unknown, false, GroupBase<unknown>>) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    }
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#fff',
  }),
  input: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#fff',
  }),
  placeholder: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.5)',
  }),
}
const Create = () => {
  const [formData, setFormData] = useState<Article>({ name: '', created_at: 0 });
  const [loadedData, setLoadedData] = useState<LoadedData>({ jigs: [], primers: [] })
  const [selectedJig, setSelectedJig] = useState<string>('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const promises = {
        primers: db.primers.toArray().then(returnIdsAndNames),
        jigs: db.jigs.toArray().then(returnIdsAndNames)
      }

      const entries = await Promise.all(Object.entries(promises).map(async ([key, promise]) => {
        return [key, await promise]
      }))
      console.log(Object.fromEntries(entries))
      setLoadedData(Object.fromEntries(entries))
    }

    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((state) => ({
          ...state,
          image: reader.result as ArrayBuffer,
        }));
      };
      reader.readAsArrayBuffer(file);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let articleToAdd = {
        ...formData,
        created_at: new Date().getTime(),
      }

      validateData(articleToAdd, articleModel)

      await db.articles.add(articleToAdd);
      toast.success(`article ${formData.name} added successfully!`, customToastProps)
      navigate(PATH_CONSTANTS.PRINTING_RESOURCES.ARTICLES.VIEW_MANY); // Redirect to viewMany component
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage, customToastProps);
    }
  };

  return (
    <MainContentContainer h1='Add article'>
      <div className='flex flex-col grow items-center justify-center'>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-8 gap-y-2'>

          {/* Name */}
          <div className="form-control">
            <span className='label-text'>Name</span>
            <input type="text" name="name" className="input input-bordered" value={formData.name} onChange={handleInputChange} />
          </div>
          {/* Image Upload Input */}
          <div className="form-control">
            <span className='label-text'>Image</span>
            <input type="file" name="image" className="file-input file-input-bordered" onChange={handleFileChange} />
          </div>
          <div className="form-control">
            <span className='label-text'>Article Number</span>
            <input type="text" name="number" className="input input-bordered" value={formData.number ?? ''} onChange={handleInputChange} />
          </div>

          <div className="form-control">
            <span className='label-text'>x - horizontal position</span>
            <input type="text" name="x" className="input input-bordered" value={formData.x ?? ''} onChange={handleInputChange} />
          </div>

          <div className="form-control">
            <span className='label-text'>y - vertical position</span>
            <input type="text" name="y" className="input input-bordered" value={formData.y ?? ''} onChange={handleInputChange} />
          </div>

          <div className="form-control">
            <span className='label-text'>z - media height</span>
            <input type="text" name="z" className="input input-bordered" value={formData.z ?? ''} onChange={handleInputChange} />
          </div>

          <div className="form-control w-full">
            <span className='label-text'>Jig</span>
            {/* <input type="text" name="jig_id" className="input input-bordered" value={formData.jig_id ?? ''} onChange={handleInputChange} /> */}
            {
              <AsyncCreatableSelect
                cacheOptions
                defaultOptions
                placeholder={'Choose or add Jig'}
                loadOptions={loadOptions}
                styles={reactSelectStyles}
              />}
          </div>

          <div className="form-control">
            <span className='label-text'>Primer</span>
            <input type="text" name="primer_id" className="input input-bordered" value={formData.primer_id ?? ''} onChange={handleInputChange} />
          </div>

          <div className="form-control">
            <span className='label-text'>Alignment</span>
            <input type="text" name="alignment" className="input input-bordered" value={formData.alignment ?? ''} onChange={handleInputChange} />
          </div>

          <div className="form-control">
            <span className='label-text'>Image Width</span>
            <input type="text" name="image_w" className="input input-bordered" value={formData.image_w ?? ''} onChange={handleInputChange} />
          </div>

          <div className="form-control">
            <span className='label-text'>Image Height</span>
            <input type="text" name="image_h" className="input input-bordered" value={formData.image_h ?? ''} onChange={handleInputChange} />
          </div>

          <div className="form-control">
            <span className='label-text'>Image Rotation</span>
            <input type="text" name="rotation" className="input input-bordered" value={formData.rotation ?? ''} onChange={handleInputChange} />
          </div>

          <div className="form-control">
            <span className='label-text'>Additional notes</span>
            <input type="text" name="notes" className="input input-bordered" value={formData.notes ?? ''} onChange={handleInputChange} />
          </div>


          <div className="flex gap-2 items-end">
            <BtnBack to={PATH_CONSTANTS.PRINTING_RESOURCES.ARTICLES.VIEW_MANY} />
            <button type="submit" className="btn btn-primary grow text-lg">Add</button>
          </div>
        </form>
      </div>
    </MainContentContainer>
  );
};

export default Create;
