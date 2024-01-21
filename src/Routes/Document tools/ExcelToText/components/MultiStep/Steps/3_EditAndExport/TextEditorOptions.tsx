import { faCopy, faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  LineSpacingType,
  TextEncodingType,
  TextWrapType,
  textEditorInitialOptions,
} from '../../../../config/TextEditorSettings'
import { useExcelToTextContext } from '../../../../contexts/ExcelToTextContext'
import { collectForeignCharacters } from '../../../../utils/Encoding/collectForeignCharacters'
import TailwindcssCheckbox from '../../../../../../../Components/Checkboxes/TailwindcssCheckbox'
import TailwindcssDropdown from '../../../../../../../Components/Dropdowns/TailwindcssDropdown'

type Props = {
  handleCopy: () => void
  handleDownload: () => void
}

const TextEditorOptions = ({ handleCopy, handleDownload }: Props) => {
  const { appSettings, setAppSettings, foreignChars, setForeignChars, editorText } = useExcelToTextContext()

  const handleTextWrapChange = () =>
    setAppSettings((prevState) => ({ ...appSettings, textWrap: !prevState.textWrap as TextWrapType }))

  const handleLineSpacingSelect = (val: string) =>
    setAppSettings({ ...appSettings, lineSpacing: val as LineSpacingType })

  const handleTextEncodingSelect = (val: string) => {
    setAppSettings({ ...appSettings, textEncoding: val as TextEncodingType })
    setForeignChars(collectForeignCharacters(editorText as string, val as TextEncodingType))
  }

  return (
    <div className="col-span-2 flex h-full w-60 flex-col justify-between gap-2 border-r-2 border-r-base-200 p-1 text-sm">
      {/* Top options*/}
      <div className="flex flex-col gap-2">
        {/* Text wrap checkbox */}
        <TailwindcssCheckbox
          defaultChecked={appSettings.textWrap}
          onChange={handleTextWrapChange}
          labelText="Wrap text"
          width={`100%`}
        />
        {/* Line spacing dropdown */}
        <TailwindcssDropdown
          label="Line spacing"
          items={textEditorInitialOptions.lineSpacing as string[]}
          selectedItem={appSettings.lineSpacing}
          onSelect={(selected) => handleLineSpacingSelect(selected)}
        />
        {/* Text encoding dropdown */}
        <TailwindcssDropdown
          label="Encoding"
          items={textEditorInitialOptions.textEncoding as string[]}
          selectedItem={appSettings.textEncoding}
          onSelect={(selected) => handleTextEncodingSelect(selected)}
        />
      </div>
      {/* Bottom options */}
      <div className="flex flex-col gap-2">
        {/* Copy button */}
        <button className="btn btn-md" tabIndex={5} onClick={handleCopy}>
          <p className="pr-2">Copy to clipboard</p>
          <FontAwesomeIcon icon={faCopy} className="h-5 w-5 text-gray-400"></FontAwesomeIcon>
        </button>
        {/* Save file button */}

        {/* Download button */}
        {Object.keys(foreignChars).length ? (
          <button className="btn btn-disabled btn-md text-gray-300" disabled>
            Download not available due to foreign characters
          </button>
        ) : (
          <button
            className="btn btn-md"
            tabIndex={6}
            onClick={!Object.keys(foreignChars).length ? handleDownload : () => {}}
          >
            <div className="pr-2">Download .txt file</div>
            <FontAwesomeIcon icon={faDownload} className="h-5 w-5 text-gray-400"></FontAwesomeIcon>
          </button>
        )}
      </div>
    </div>
  )
}

export default TextEditorOptions
