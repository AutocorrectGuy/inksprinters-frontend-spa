import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'
import { Jig } from '../../../../libraries/dexie/models/jig.model'
import Frame from '../../../../Components/Input/Frame'
import CustomIcon from '../../../../Components/CustomIcon/CustomIcon'
import { handleOnBlurNumber, handleOnChangeNumber, handleSubmit } from './validateAndSubmit'
import { Input } from './Input'
import InputCheckbox from './InputCheckbox'
import { calculateMaxCellCount, generateGrid } from './GenerateGrid'
import { INPUT_FIELD_CLAMPS, clampNumber } from './utils/numberSanitaze'
import { getMaxContainerHeight } from '../../../../Layouts/MainLayout/config/MainLayout.config'

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
  is_origin_lower_right: true,
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
  const [isJigWrapperLoaded, setIsJigWrapperLoaded] = useState<boolean>(false)
  const [keepMaxCellsCount, setKeepMaxCellsCount] = useState(false)

  const displayValueRef = useRef<{ [key: string]: string }>(DEFAULT_DISPLAY_JIG_STATE)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const jigWrapperRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDialogElement>(null)

  const navigate = useNavigate()
  const cellStyles = determineCellStyles(Boolean(formData.is_origin_lower_right))

  useEffect(() => {
    nameInputRef.current && nameInputRef.current.focus()
    jigWrapperRef.current && setIsJigWrapperLoaded(true)
  }, [])

  useEffect(() => {
    updateMaxCellsCount()
  }, [formData.width, formData.height, formData.offset_x, formData.offset_y, formData.cell_width, formData.cell_height, formData.gap_x, formData.gap_y, keepMaxCellsCount])

  const updateMaxCellsCount = () => {
    const maxPossibleCellsCount = calculateMaxCellCount(formData)
    const currentMaxCellsCount = clampNumber(maxPossibleCellsCount, INPUT_FIELD_CLAMPS.count)

    // If keepMaxCellsCount has declared its will, we bow with grace
    if (keepMaxCellsCount) {
      updateStateAndFormatDisplay('count', currentMaxCellsCount);
      return
    }

    // A simple check to see if the universes balance is maintained
    if (!formData.count || formData.count <= currentMaxCellsCount)
      return

    // If balance is disturbed, we must restore harmony
    updateStateAndFormatDisplay('count', currentMaxCellsCount)
  }

  const updateStateAndFormatDisplay = (name: string, value: number) => {
    setFormData((fd) => {
      displayValueRef.current[name] = value.toString()
      return ({ ...fd, count: value })
    })
  }

  const submit = (e: FormEvent<HTMLFormElement>) =>
    handleSubmit({ e, formData, setFormData, displayValueRef, navigate })

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData((formData) => ({ ...formData, [e.target.name]: e.target.value }))

  const numberInputProps = (name: keyof Jig) => ({
    name,
    value: displayValueRef.current[name],
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      handleOnChangeNumber({
        e,
        setFormData,
        displayValueRef,
        clamp: INPUT_FIELD_CLAMPS[e.target.name as keyof Jig],
      }),
    onBlur: (e: ChangeEvent<HTMLInputElement>) =>
      handleOnBlurNumber({
        e,
        setFormData,
        displayValueRef,
        clamp: INPUT_FIELD_CLAMPS[e.target.name as keyof Jig],
        addMm: name !== 'count'
      }),
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
              <div className="grid grid-cols-2 gap-2"
                onClick={() => setFormData((fd) => ({ ...fd, is_origin_lower_right: !fd.is_origin_lower_right }))}>
                <InputCheckbox
                  label="Upper Left"
                  isChecked={!formData.is_origin_lower_right!}
                  onClickCallback={() => { }}
                />
                <InputCheckbox
                  label="Lower Right"
                  isChecked={formData.is_origin_lower_right!}
                  onClickCallback={() => { }}
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
                <div className="flex items-center gap-2 relative">
                  <CustomIcon icon={'countRec'} />
                  <Input {...numberInputProps('count')} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleOnChangeNumber({
                      e, setFormData, displayValueRef, clamp: INPUT_FIELD_CLAMPS[e.target.name as keyof Jig],
                    })
                    // rotate the needle back - disable keepMaxCellsCount
                    if (keepMaxCellsCount)
                      setKeepMaxCellsCount(false)
                  }
                  } />
                  <button type='button' className={`absolute w-6 h-6 right-2 duration-200 cursor-pointer group ${keepMaxCellsCount ? 'rotate-0' : 'rotate-[-270deg]'}`}
                    onClick={() => {
                      setKeepMaxCellsCount((val) => !val)
                    }}
                  >
                    <CustomIcon icon='max' className='w-6 h-6 group-hover:text-white duration-200' />
                  </button>
                </div>
              </div>
            </Frame>
            <div className="flex grow flex-col rounded-lg border-2 border-[#434B5580] px-1">
              <div className="flex grow flex-col p-1 leading-5">
                <p className="flex grow flex-col items-center justify-center text-center">
                  <span className="pb-2 text-lg">You are doing great!</span>
                  <span>
                    Jig is <span className="font-semibold text-emerald-500">ready&nbsp;</span>to be stored in
                    database.
                  </span>
                </p>
              </div>
              <button type='button' className="button-pop flex items-center justify-center rounded-lg bg-emerald-700 px-8 py-2 text-lg duration-[250ms] ease-out hover:bg-emerald-600"
                onClick={() => modalRef.current?.showModal()}
              >
                Save
              </button>
              <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Confirm Save Operation</h3>
                  <p className="py-4">Please confirm if you are ready to proceed with saving the Jig to the database. This action will finalize your current configurations and data entries.</p>
                  <button className='button-pop flex  rounded-lg bg-emerald-700 px-8 py-4 text-md duration-[250ms] ease-out hover:bg-emerald-600 font-semibold w-full justify-center text-lg' type='submit' onClick={() => modalRef.current?.close()}>
                    Save
                  </button>
                  <div className='flex justify-center mt-2'>
                    <button type='button' className='btn btn-ghost w-full'
                      onClick={() => modalRef.current?.close()}>
                      Back
                    </button>
                  </div>
                </div>
                {/* Modal backdrop */}
                <div className="modal-backdrop bg-black/80" onClick={() => modalRef.current?.close()} />
              </dialog>
            </div>
          </form>

          {/* Jig wrapper */}
          <div ref={jigWrapperRef} className="flex flex-col grow items-center justify-center bg-base-300/70 ease-out">
            {/* Jig container */}
            <div
              className="relative box-content rounded-sm border-2 border-[#62708080] bg-neutral-900"
              style={{
                transition: 'width 500ms, height 500ms',
                width: `${formData.width}px`,
                height: `${formData.height}px`,
              }}
            >
              {jigWrapperRef.current &&
                isJigWrapperLoaded &&
                generateGrid(formData, {
                  x: jigWrapperRef.current.clientWidth,
                  y: jigWrapperRef.current.clientHeight,
                }).map((cell, i) => (
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
