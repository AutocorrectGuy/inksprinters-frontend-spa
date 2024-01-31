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
    setCalculatedPosition(
      axis === 'Horizontal (x)'
        ? getPositionX(+currentPos, +margin1, +margin2).toString()
        : getPositionY(+currentPos, +margin1, +margin2).toString(),
    )
  }, [axis, currentPos, margin1, margin2])
  // Returns the adjusted position based on X axis the provided offset for ColorPRINT Server 5.0 software.
  const getPositionX = (positionX: number, marginLeft: number, marginRight: number): number => {
    const targetLeft: number = (marginLeft + marginRight) / 2
    const marginToAdd: number = marginLeft - targetLeft
    return positionX + marginToAdd
  }

  // Returns the adjusted position based on Y axis the provided offset for ColorPRINT Server 5.0 software.
  const getPositionY = (posY: number, marginTop: number, marginBottom: number): number => {
    const realPosY: number = posY * 2
    const targetMB: number = (marginTop + marginBottom) / 2
    const marginToAdd: number = marginTop - targetMB
    return (realPosY + marginToAdd) / 2
  }

  const inputIsValidNumber = (value: string) => /^\d+(\.\d*)?$/.test(value) || value === ''

  return (
    <MainContentContainer h1="Center Artwork">
      <div className="flex grow flex-col items-center justify-center border text-[#CFCBC4]">
        <div className="flex w-full max-w-72 flex-col gap-2">
          <div className="flex w-full items-center rounded-lg bg-base-300">
            <TailwindcssDropdown
              items={['Horizontal (x)', 'Vertical (y)']}
              selectedItem={axis}
              onSelect={(item) => setAxis(item as AxisType)}
              label="Axis"
            />
          </div>
          <div className="flex flex-grow items-center justify-between rounded-lg bg-base-300 p-1">
            <div className="px-3">Current position</div>
            <div className="flex items-center">
              <input
                className="input input-bordered h-10 w-16"
                value={currentPos}
                onChange={(e) => inputIsValidNumber(e.target.value) && setCurrentPos(e.target.value)}
              />
              <div className="w-9 text-center"> mm</div>
            </div>
          </div>
          <div className="flex flex-grow items-center justify-between rounded-lg bg-base-300 p-1">
            <div className="px-3">Margin {axis === 'Horizontal (x)' ? 'left' : 'top'}</div>
            <div className="flex items-center">
              <input
                className="input input-bordered h-10 w-16"
                value={margin1}
                onChange={(e) => inputIsValidNumber(e.target.value) && setMargin1(e.target.value)}
              />
              <div className="w-9 text-center">mm</div>
            </div>
          </div>
          <div className="flex flex-grow items-center justify-between rounded-lg bg-base-300 p-1">
            <div className="px-3">Margin {axis === 'Horizontal (x)' ? 'right' : 'bottom'}</div>
            <div className="flex items-center">
              <input
                className="input input-bordered h-10 w-16"
                value={margin2}
                onChange={(e) => inputIsValidNumber(e.target.value) && setMargin2(e.target.value)}
              />
              <div className="w-9 text-center">mm</div>
            </div>
          </div>
          <div className="flex flex-grow items-center justify-between rounded-lg bg-purple-900 p-1">
            <div className="px-3">Calculated position</div>
            <div className="flex items-center">
              <input className="input input-bordered h-10 w-16" value={calculatedPosition} onChange={() => {}}/>
              <div className="w-9 text-center">mm</div>
            </div>
          </div>
        </div>
      </div>
    </MainContentContainer>
  )
}

export default CenterArtwork
