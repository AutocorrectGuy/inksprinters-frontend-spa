import { useEffect, useState } from 'react';
import LOGO_WITH_TEXT from '../../../../Resources/images/Pages/Welcome/logo-with-text.svg'

type Props = { 
  backSideText?: string, 
}

const BackSideWithLogo = ({ backSideText }: Props) => {
  const [logoLoaded, setLogoLoaded] = useState(false); // Tracks if the logo is loaded

  useEffect(() => {
    const img = new Image();
    img.src = LOGO_WITH_TEXT;
    img.onload = () => {
      setLogoLoaded(true);
    }

    return () => {
      img.onload = null; // Clean up onload listener
    };
  }, []);

  // Use the custom hook to preload images
  return (<div className='flex flex-col grow' >{
    logoLoaded && <div className='flex flex-col grow items-center justify-center'>
      <div className='grow flex flex-col items-center justify-center rounded-xl max-w-[360px] w-full p-6 bg-gradient-to-br from-[#2e2e2e] to-[#1b1b1b] border border-[#2e2e2e]'>
        <img src={LOGO_WITH_TEXT} className='w-2/3' />
        {backSideText && <div className='text-4xl text-[#CFCBC4] font-bold pt-2 uppercase'>
          {backSideText}
        </div>}
      </div>
    </div>
  }</div>)
}

export default BackSideWithLogo