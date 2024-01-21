import { useEffect, useState } from 'react'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import TailwindcssDropdown from '../../../Components/Dropdowns/TailwindcssDropdown'

type Props = {}

type AxisType = 'Horizontal (x)' | 'Vertical (y)'

const CenterArtwork = (props: Props) => {
  const [axis, setAxis] = useState<AxisType>('Horizontal (x)')
  const [currentPos, setCurrentPos] = useState<string>('')
  const [margin1, setMargin1] = useState<string>('')
  const [margin2, setMargin2] = useState<string>('')
  const [calculatedPosition, setCalculatedPosition] = useState<string>('')

  useEffect(() => {
    setCalculatedPosition(axis === 'Horizontal (x)'
      ? getPositionX(+currentPos, +margin1, +margin2).toString()
      : getPositionY(+currentPos, +margin1, +margin2).toString()
    )
  }, [axis, currentPos, margin1, margin2])
  // Returns the adjusted position based on X axis the provided offset for ColorPRINT Server 5.0 software.
  const getPositionX = (positionX: number, marginLeft: number, marginRight: number): number => {
    const targetLeft: number = (marginLeft + marginRight) / 2;
    const marginToAdd: number = marginLeft - targetLeft;
    return positionX + marginToAdd;
  }

  // Returns the adjusted position based on Y axis the provided offset for ColorPRINT Server 5.0 software.
  const getPositionY = (posY: number, marginTop: number, marginBottom: number): number => {
    const realPosY: number = posY * 2;
    const targetMB: number = (marginTop + marginBottom) / 2;
    const marginToAdd: number = marginTop - targetMB;
    return (realPosY + marginToAdd) / 2;
  }

  const inputIsValidNumber = (value: string) => (/^\d+(\.\d*)?$/.test(value) || value === "")

  return (
    <MainContentContainer h1='Center Artwork'>
      <div className='grow border flex flex-col items-center justify-center text-[#CFCBC4]'>
        <div className='max-w-72 w-full flex flex-col gap-2'>
          <div className='flex w-full items-center bg-base-300 rounded-lg'>
            <TailwindcssDropdown items={['Horizontal (x)', 'Vertical (y)']}
              selectedItem={axis}
              onSelect={(item) => setAxis(item as AxisType)}
              label='Axis'
            />
          </div>
          <div className='flex flex-grow justify-between items-center bg-base-300 rounded-lg p-1'>
            <div className='px-3'>Current position</div>
            <div className='flex items-center'>
              <input className='input input-bordered w-16 h-10'
                value={currentPos}
                onChange={(e) => inputIsValidNumber(e.target.value) && setCurrentPos(e.target.value)}
              />
              < div className='w-9 text-center' > mm</div>
            </div>
          </div>
          <div className='flex flex-grow justify-between items-center bg-base-300 rounded-lg p-1'>
            <div className='px-3'>Margin {axis === 'Horizontal (x)' ? 'left' : 'top'}</div>
            <div className='flex items-center'>
              <input className='input input-bordered w-16 h-10'
                value={margin1}
                onChange={(e) => inputIsValidNumber(e.target.value) && setMargin1(e.target.value)}

              />
              <div className='w-9 text-center'>mm</div>
            </div>
          </div>
          <div className='flex flex-grow justify-between items-center bg-base-300 rounded-lg p-1'>
            <div className='px-3'>Margin {axis === 'Horizontal (x)' ? 'right' : 'bottom'}</div>
            <div className='flex items-center'>
              <input className='input input-bordered w-16 h-10'
                value={margin2}
                onChange={(e) => inputIsValidNumber(e.target.value) && setMargin2(e.target.value)}

              />
              <div className='w-9 text-center'>mm</div>
            </div>
          </div>
          <div className='flex flex-grow justify-between items-center bg-purple-900 rounded-lg p-1'>
            <div className='px-3'>Calculated position</div>
            <div className='flex items-center'>
              <input className='input input-bordered w-16 h-10'
                value={calculatedPosition}
              />
              <div className='w-9 text-center'>mm</div>
            </div>
          </div>
        </div>

      </div>
    </MainContentContainer >
  )
}

export default CenterArtwork