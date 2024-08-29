import React, { useEffect, useRef, useState } from 'react'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import tvSvg from './tv.svg'
import pixelBtnSvg from './pixel-btn-1.svg'
import { calculateConeProperties, CalculatedType } from './calculateConeProperties'
import Bouncer from './Bouncer'
import { toast } from 'react-toastify'
import { customToastProps } from '../../../libraries/toast/CustomToastContainer'

type InputType = {
  dTop: string
  dBot: string
  h: string
}

const IMG_ASPECT_RATIO = 1.144
const SCALE = 0.8

const ConeCrafter = () => {
  const tvImgRef = useRef<HTMLDivElement>(null)
  const [tvSize, setTvSize] = useState({ w: 0, h: 0 })
  const [input, setInput] = useState<InputType>({ dTop: '', dBot: '', h: '' })
  const [calculated, setCalculated] = useState<CalculatedType>({ coneHeight: null, apexAngle: null })

  useEffect(() => {
    if (!tvImgRef.current) return

    let newWidth, newHeight

    if (tvImgRef.current.clientWidth < tvImgRef.current.clientHeight) {
      // Base calculations on clientWidth because it's smaller
      newWidth = tvImgRef.current.clientWidth * SCALE
      newHeight = (tvImgRef.current.clientWidth / IMG_ASPECT_RATIO) * SCALE
    } else {
      // Base calculations on clientHeight because clientWidth is not smaller
      newWidth = tvImgRef.current.clientHeight * IMG_ASPECT_RATIO * SCALE
      newHeight = tvImgRef.current.clientHeight * SCALE
    }

    setTvSize({ w: newWidth, h: newHeight })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput((input) => ({ ...input, [e.target.name]: e.target.value }))

  const onCalculate = () => {
    const result = calculateConeProperties(Number(input.dTop), Number(input.dBot), Number(input.h))
    console.log(result)

    if (!result.apexAngle || !result.coneHeight) {
      toast.error(
        'Error: Unable to calculate the apex angle or cone height with the current inputs. Please check the values and try again.',
        customToastProps,
      )
      return
    }
    setCalculated(result)
  }

  const calculationsDone = calculated.coneHeight && calculated.apexAngle

  return (
    <div className="flex grow flex-col bg-gradient-to-b from-transparent to-[#000000D0] font-PressStart2P ">
      <div
        ref={tvImgRef}
        className="relative grow"
        style={{
          backgroundImage: `url(${tvSvg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain', // Adjust this as necessary
        }}
      >
        {tvSize && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="mx-auto flex flex-col items-center justify-evenly  px-[4%] py-[3%]"
              style={{ width: tvSize.w, height: tvSize.h }}
            >
              <div className="border-4 border-white/25 p-1">
                <div className="1px solid red grid grid-cols-3 grid-rows-2 items-center border-2 bg-white/10 p-4 text-xl hover:bg-white/20">
                  <div className="text-stroke pb-2 text-orange-400">Diameter Top</div>
                  <div className="text-stroke pb-2 text-orange-300">Diameter Bottom</div>
                  <div className="text-stroke pb-2 text-orange-200">Available Height</div>
                  <input
                    name="dTop"
                    value={input.dTop}
                    className="w-40 border-2 border-black bg-white px-4 py-2 text-xl tracking-[0.1em] text-black caret-black outline-2 outline-offset-4 outline-black/50"
                    placeholder="0.00"
                    onChange={handleInputChange}
                  />
                  <input
                    name="dBot"
                    value={input.dBot}
                    className="w-40 border-2 border-black bg-white px-4 py-2 text-xl tracking-[0.1em] text-black caret-black outline-2 outline-offset-4 outline-black/50"
                    placeholder="0.00"
                    onChange={handleInputChange}
                  />
                  <input
                    name="h"
                    value={input.h}
                    className="w-40 border-2 border-black bg-white px-4 py-2 text-xl tracking-[0.1em] text-black caret-black outline-2 outline-offset-4 outline-black/50"
                    placeholder="0.00"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button className="group hover:cursor-pointer focus:outline-offset-4" onClick={() => onCalculate()}>
                <svg
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 106.34 22"
                  className="h-[88px] group-active:translate-x-2 group-active:translate-y-2"
                >
                  <rect className="fill-black group-active:fill-none" x="2.45" y="3.06" width="103.89" height="18.94" />
                  <g className="opacity-50">
                    <path className="fill-black" d="M1.83,17.11V1.83h100.83v15.28H1.83M104.5,0H0v18.94h104.5V0" />
                  </g>
                  <rect className="fill-white" x="1.22" y="1.22" width="102.06" height="16.5" />
                  <path
                    className="fill-black"
                    d="M103.89,18.33H.61V.61h103.28v17.72ZM1.83,17.11h100.83V1.83H1.83v15.28Z"
                  />
                  <rect className="fill-gray-300" x="8.56" y="2.86" width="87.39" height="1" />
                  <rect className="fill-gray-300" x="8.56" y="15.08" width="87.39" height="1" />
                  <rect className="fill-gray-300" x="98.39" y="3.67" width="2.44" height="2.44" />
                  <path
                    className="fill-gray-300"
                    d="M101.33,6.61h-3.44v-3.44h3.44v3.44ZM98.89,5.61h1.44v-1.44h-1.44v1.44Z"
                  />
                  <rect className="fill-gray-300" x="98.39" y="12.83" width="2.44" height="2.44" />
                  <path
                    className="fill-gray-300"
                    d="M101.33,15.78h-3.44v-3.44h3.44v3.44ZM98.89,14.78h1.44v-1.44h-1.44v1.44Z"
                  />
                  <rect className="fill-gray-300" x="3.67" y="3.67" width="2.44" height="2.44" />
                  <path
                    className="fill-gray-300"
                    d="M6.61,6.61h-3.44v-3.44h3.44v3.44ZM4.17,5.61h1.44v-1.44h-1.44v1.44Z"
                  />
                  <rect className="fill-gray-300" x="3.67" y="12.83" width="2.44" height="2.44" />
                  <path
                    className="fill-gray-300"
                    d="M6.61,15.78h-3.44v-3.44h3.44v3.44ZM4.17,14.78h1.44v-1.44h-1.44v1.44Z"
                  />
                  <path
                    className="fill-orange-500 group-hover:fill-orange-600"
                    d="M22.03,12.74v-.93h-.93v-.93h-.93v-2.8h.93v-.93h.93v-.93h3.73v.93h.93v.93h-1.87v-.93h-1.87v.93h-.93v2.8h.93v.93h1.87v-.93h1.87v.93h-.93v.93h-3.73Z"
                  />
                  <path
                    className="fill-orange-500 group-hover:fill-orange-600"
                    d="M28.57,12.74v-.93h-.93v-.93h.93v-.93h3.73v-.93h-3.73v-.93h4.67v.93h.93v3.73h-5.6ZM29.5,11.8h2.8v-.93h-2.8v.93Z"
                  />
                  <path
                    className="fill-orange-500 group-hover:fill-orange-600"
                    d="M36.03,12.74v-.93h1.87v-4.67h-.93v-.93h2.8v5.6h1.87v.93h-5.6Z"
                  />
                  <path
                    className="fill-orange-500 group-hover:fill-orange-600"
                    d="M43.5,12.74v-.93h-.93v-2.8h.93v-.93h5.6v.93h-4.67v2.8h4.67v.93h-5.6Z"
                  />
                  <path
                    className="fill-orange-500 group-hover:fill-orange-600"
                    d="M50.96,12.74v-.93h-.93v-3.73h1.87v3.73h2.8v-3.73h1.87v4.67h-5.6Z"
                  />
                  <path
                    className="fill-orange-500 group-hover:fill-orange-600"
                    d="M58.43,12.74v-.93h1.87v-4.67h-.93v-.93h2.8v5.6h1.87v.93h-5.6Z"
                  />
                  <path
                    className="fill-orange-500 group-hover:fill-orange-600"
                    d="M65.89,12.74v-.93h-.93v-.93h.93v-.93h3.73v-.93h-3.73v-.93h4.67v.93h.93v3.73h-5.6ZM66.82,11.8h2.8v-.93h-2.8v.93Z"
                  />
                  <path
                    className="fill-orange-500 group-hover:fill-orange-600"
                    d="M75.22,12.74v-3.73h-1.87v-.93h1.87v-1.87h1.87v1.87h1.87v.93h-1.87v3.73h-1.87Z"
                  />
                  <path
                    className="fill-orange-500 group-hover:fill-orange-600"
                    d="M80.82,12.74v-.93h-.93v-2.8h.93v-.93h4.67v.93h.93v1.87h-4.67v.93h3.73v.93h-4.67ZM81.75,9.94h2.8v-.93h-2.8v.93Z"
                  />
                </svg>
              </button>
              <div className="border-4 border-white/25 p-1">
                <div className="grid w-fit grid-cols-2 grid-rows-2 items-center border-2 bg-white/10 p-4 text-xl hover:bg-white/20">
                  <div className="text-stroke select-none pr-4 text-center text-orange-400">Apex Angle</div>
                  <div className="text-stroke select-none text-center text-orange-300">Cone Height</div>
                  {calculationsDone ? (
                    <input
                      value={calculated.apexAngle ?? 'error'}
                      className="mx-auto w-44 border-2 border-black bg-white px-4 py-2 text-xl tracking-[0.1em] text-black caret-black outline-2 outline-offset-4 outline-black/50"
                      onChange={() => {}}
                    />
                  ) : (
                    <Bouncer />
                  )}
                  {calculationsDone ? (
                    <input
                      value={calculated.coneHeight ?? 'error'}
                      className="mx-auto w-44 border-2 border-black bg-white px-4 py-2 text-xl tracking-[0.1em] text-black caret-black outline-2 outline-offset-4 outline-black/50"
                      placeholder="0.00"
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Bouncer />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConeCrafter

// light:
// #a990c8
// dark:
// #a74e83
