import { useEffect, useState } from 'react'
import BackSideWithLogo from './BackSideWithLogo';
import { Article } from '../../../../libraries/dexie/models/article.model';
import { arrayBufferToImageUrl } from '../../../../Utils/ImageConversion';
import FrontSide from './FrontSide';


type Props = {
  article: Article | null
  flipCardHeight: { [key: string]: number }
}

const FlipCard = ({ article, flipCardHeight }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false); // Start with the back side showing
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (!article)
      return

    if (!article.image) {
      setImageLoaded(true) // set imageLoaded to true if there is no image for simplicity
      return
    }

    const img = new Image();
    img.src = arrayBufferToImageUrl(article.image);
    img.onload = () => {
      setImageLoaded(true)
    };
  }, [article]);

  useEffect(() => {
    if (!imageLoaded)
      return

    // flip the card
    setTimeout(() => { setIsFlipped(true) }, 50)
    console.log('asdasasd')
  }, [imageLoaded])

  return (
    <div className='flex flex-col h-full min-w-[300px]'
      style={{ height: flipCardHeight.total }}
    >
      <div className={`relative w-full transition-transform duration-500 ease-out flex flex-col grow`}
        style={{ transform: `rotateY(${isFlipped ? '180' : 0}deg)`, transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute w-full flex flex-col grow bottom-0 top-0"
          style={{ transform: `rotateY(0deg)`, backfaceVisibility: 'hidden' }}
        > 
          <BackSideWithLogo backSideText={'Article'} />
        </div>
        <div
          className='absolute w-full flex flex-col grow bottom-0 top-0'
          style={{ transform: `rotateY(180deg)`, backfaceVisibility: 'hidden', maxHeight: flipCardHeight.total }}
        >
          <FrontSide article={article} imageLoaded={imageLoaded} flipCardHeight={flipCardHeight} />
        </div>
      </div>
    </div>
  );
};

export default FlipCard