import { ReactNode } from 'react';

// VBA style frame
const Frame = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div className="relative text-[#CFCBC4] mt-4">
      <div className='absolute -top-2 left-0 right-0 flex items-end h-4'>
        <div className='border-t-2 border-[#434B5580] pl-4 h-full border-l-2 rounded-tl-lg' />
        <span className='px-2 bg-transparent h-8 select-none'>{label}</span>
        <div className='border-t-2 border-[#434B5580] flex-grow h-full border-r-2 rounded-tr-lg' />
      </div>
      <div className="border-[#434B5580] border-b-2 border-x-2 rounded-b-lg p-2">{children}</div>
    </div>
  );
};



export default Frame;
