import RUNNER_SVG from '../../Resources/images/Pages/Welcome/inksprinters-runner.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const boxShadow = {
  boxShadow: 'inset 0 0 14px rgba(0, 0, 0, 0.6)',
  WebkitBoxShadow: 'inset 0 0 14px rgba(0, 0, 0, 0.6)', // for Safari and older Chrome browsers
  MozBoxShadow: 'inset 0 0 14px rgba(0, 0, 0, 0.6)', // for Firefox
}

const HeroInputField = () => {
  const [inputText, setInputText] = useState<string>('')

  return (
    <div className="relative flex w-full max-w-[750px] items-center">
      <img src={RUNNER_SVG} className="absolute right-0 -z-10 translate-x-1/2 overflow-hidden h-[512px]" />

      <div
        className="flex h-40 w-full items-center rounded-[16px] bg-[#262626] text-[#C7C3BB] outline outline-2 outline-[#666666] focus:border-[#C7C3BB] focus:outline-[#C7C3BB] focus:ring-[#C7C3BB] italic"
        style={{ ...boxShadow }}
      >
        <div className="flex h-full w-40 items-center justify-center rounded-[16px]">
          <FontAwesomeIcon icon={faSearch} className="h-12 w-12 -scale-x-100 text-[#C7C3BB]" />
        </div>
        <div className="relative mr-8 w-full">
          <input
            onChange={(e) => setInputText(e.target.value)}
            defaultValue={''}
            type="text"
            autoFocus
            placeholder="Type keywords here"
            className={`input m-0 w-full bg-transparent ${inputText.length > 0 ? 'pt-12' : 'pt-4'
              } rounded-t-[16px] border-0 pb-12 pl-3 text-5xl placeholder:-translate-x-1 
                font-medium text-white outline-none ring-0 placeholder:text-neutral-400 focus:border-0 focus:outline-none focus:ring-0 placeholder:italic`}
          />
          {inputText.length === 0 && (
            <div className="absolute -bottom-4 left-4 text-xl font-medium text-neutral-400">
              e.g.: "Excel Converter"
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Welcome = () => {

  return (
    <div className="flex grow flex-col items-center justify-center overflow-hidden pb-40 pr-20">
      <div className="flex w-full items-center justify-center">
        <HeroInputField />
      </div>
    </div>
  )
}

export default Welcome