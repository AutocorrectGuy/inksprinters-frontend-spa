import React, { FormEvent, useEffect, useState } from 'react';
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer';
import TailwindcssDropdown from '../../../Components/Dropdowns/TailwindcssDropdown';

const articles = [...Array(5)].map((_x, i) => `Article no: ${i + 1}`)
const Main = () => {

  const [formData, setFormData] = useState<{ article: string, orderSize: string | number }>({
    article: articles[0],
    orderSize: 1000
  })

  const handleFormChange = (key: keyof typeof formData, value: string | number) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <MainContentContainer h1='Daily chemicals usage'>
      <div className='flex grow items-center justify-center'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col grow items-center justify-center max-w-[200px] w-full'>
          <div className='py-4 text-neutral-200 text-xl text-center'>
            <div className='pb-2'>Select article</div>
            <TailwindcssDropdown
              items={articles}
              onSelect={(item) => handleFormChange('article', item)}
              selectedItem={articles[0]}
              btnClassName='min-w-[200px] justify-end text-lg'
              optionClassName='flex justify-end text-lg pr-9'
            />
          </div>

          <div className='py-4 text-neutral-200 text-xl text-center'>
            <div className='pb-2'>Order size</div>
            <input className='input bg-base-200 text-neutral-200 text-right' onChange={(e) => handleFormChange('orderSize', e.target.value)} value={formData.orderSize} />
          </div>
          <div className='flex py-4 w-full'>
            <button className='btn btn-primary w-full'>Add</button>
          </div>
        </form>
      </div>

    </MainContentContainer >);
}

export default Main;


