import React, { CSSProperties, ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../../libraries/dexie/db' // Import your Dexie instance
import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'
import PATH_CONSTANTS from '../../../pathConstants'
import { Jig } from '../../../../libraries/dexie/models/jig.model'
import Frame from '../../../../Components/Input/Frame'
import CustomIcon from '../../../../Components/CustomIcon/CustomIcon'
import { handleOnBlur, handleOnChangeNumber, handleSubmit } from './validateAndSubmit'
import { Input } from './Input'
import InputCheckbox from './InputCheckbox'
import { generateGrid } from './GenerateGrid'

const DEFAULT_JIG_STATE: Jig = {
  name: '',
  width: 800,
  height: 640,
  offset_x: 0,
  offset_y: 0,
  cell_width: 0,
  cell_height: 0,
  gap_x: 0,
  gap_y: 0,
  count: 0,
  is_origin_lower_right: false,
  created_at: 0,
}

const DEFAULT_DISPLAY_JIG_STATE = Object.entries(DEFAULT_JIG_STATE).reduce(
  (acc, [currName, currVal]) => ({
    ...acc,
    [currName]: typeof currVal === 'number' && currName !== 'count' ? `${currVal} mm` : currVal,
  }),
  {},
)

const determineCellStyles = (isOriginLowerRight: boolean) =>
  isOriginLowerRight ? ['bottom', 'right'] : ['top', 'left']

const Create = () => {
  const [formData, setFormData] = useState<Jig>(DEFAULT_JIG_STATE)
  const displayValueRef = useRef<{ [key: string]: string }>(DEFAULT_DISPLAY_JIG_STATE)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const cellStyles = determineCellStyles(Boolean(formData.is_origin_lower_right))
  const navigate = useNavigate()
  const memoizedGrid = useMemo(
    () => generateGrid(formData),
    [
      formData.width,
      formData.height,
      formData.offset_x,
      formData.offset_y,
      formData.cell_width,
      formData.cell_height,
      formData.gap_x,
      formData.gap_y,
      formData.count,
      formData.is_origin_lower_right,
    ],
  )
  // TODO
  const [hasErrors, setHasErrors] = useState([])

  useEffect(() => {
    nameInputRef.current && nameInputRef.current.focus()
  }, [])

  const submit = (e: FormEvent<HTMLFormElement>) =>
    handleSubmit({ e, formData, setFormData, displayValueRef, navigate })

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData((formData) => ({ ...formData, [e.target.name]: e.target.value }))

  const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => handleOnChangeNumber({ e, setFormData, displayValueRef })

  const onNumberBlur = (e: React.ChangeEvent<HTMLInputElement>) => handleOnBlur({ e, setFormData, displayValueRef })

  const onCheckboxChange = (name: keyof Jig) => setFormData((fd) => ({ ...fd, [name]: !fd[name] }))

  const numberInputProps = (name: keyof Jig) => ({
    name,
    value: displayValueRef.current[name],
    onChange: onNumberChange,
    onBlur: name === 'count' ? () => { } : onNumberBlur,
  })

  return (
    <MainContentContainer h1="Add jig" fullWidth>
      <div className="flex grow flex-col">
        <div className="flex grow">
          <form
            onSubmit={submit}
            className="flex w-full max-w-[400px] flex-col gap-4 border-r-2 border-r-[#434B5580] p-4 "
          >
            {/* Name */}
            <div className="flex items-center">
              <label className="label pr-4 text-[#CFCBC4]">Name</label>
              <input
                ref={nameInputRef}
                type="text"
                name="name"
                className="input input-bordered h-10 grow border-2"
                value={formData.name}
                onChange={onTextChange}
              />
            </div>
            <Frame label="Media Size">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <CustomIcon icon={'rectWidth'} />
                  <Input {...numberInputProps('width')} />
                </div>
                <div className="flex items-center gap-2">
                  <CustomIcon icon={'rectHeight'} />
                  <Input {...numberInputProps('height')} />
                </div>
              </div>
            </Frame>
            <Frame label="Origin">
              <div className="grid grid-cols-2 gap-2">
                <InputCheckbox
                  label="Upper Left"
                  isChecked={!formData.is_origin_lower_right!}
                  onClickCallback={() => onCheckboxChange('is_origin_lower_right')}
                />
                <InputCheckbox
                  label="Lower Right"
                  isChecked={formData.is_origin_lower_right!}
                  onClickCallback={() => onCheckboxChange('is_origin_lower_right')}
                />
              </div>
            </Frame>
            <Frame label="Element">
              <div className="grid grid-cols-2 grid-rows-4 gap-2">
                <div className="flex items-center gap-2">
                  <CustomIcon icon={'offsetX'} />
                  <Input {...numberInputProps('offset_x')} />
                </div>
                <div className="flex items-center gap-2">
                  <CustomIcon icon={'offsetY'} />
                  <Input {...numberInputProps('offset_y')} />
                </div>
                <div className="flex items-center gap-2">
                  <CustomIcon icon={'rectWidth'} />
                  <Input {...numberInputProps('cell_width')} />
                </div>
                <div className="flex items-center gap-2">
                  <CustomIcon icon={'rectHeight'} />
                  <Input {...numberInputProps('cell_height')} />
                </div>
                <div className="flex items-center gap-2">
                  <CustomIcon icon={'gapX'} />
                  <Input {...numberInputProps('gap_x')} />
                </div>
                <div className="flex items-center gap-2">
                  <CustomIcon icon={'gapY'} />
                  <Input {...numberInputProps('gap_y')} />
                </div>
                <div className="flex items-center gap-2">
                  <CustomIcon icon={'countRec'} />
                  <Input {...numberInputProps('count')} />
                </div>
              </div>
            </Frame>
            <div className="flex grow flex-col rounded-lg border-2 border-[#434B5580] px-1">
              <div className="flex grow flex-col p-1 leading-5">
                {hasErrors.length ? (
                  hasErrors.map((err) => <div>{err}</div>)
                ) : (
                  <p className="flex grow flex-col items-center justify-center text-center">
                    <span className="pb-2 text-lg">All set!</span>
                    <span>
                      Jig is <span className="font-semibold text-emerald-500">ready&nbsp;</span>to be stored in
                      database.
                    </span>
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="button-pop flex items-center justify-center rounded-lg bg-emerald-700 px-8 py-2 text-lg duration-[250ms] ease-out hover:bg-emerald-600"
              >
                Save
              </button>
            </div>
          </form>

          {/* Jig wrapper */}
          <div className="flex grow items-center justify-center bg-base-300/70 ease-out">
            {/* Jig container */}
            <div
              className="relative rounded-sm bg-base-300"
              style={{
                transition: 'width 500ms, height 500ms',
                width: `${formData.width}px`,
                height: `${formData.height}px`,
              }}
            >
              {memoizedGrid.map((cell, i) => (
                <div
                  key={`jig-cell-${i}`}
                  className="absolute rounded-sm border border-emerald-500"
                  style={{
                    [cellStyles[1]]: cell.x,
                    [cellStyles[0]]: cell.y,
                    width: `${Number(formData.cell_width)}px`,
                    height: `${Number(formData.cell_height)}px`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainContentContainer>
  )
}

export default Create
