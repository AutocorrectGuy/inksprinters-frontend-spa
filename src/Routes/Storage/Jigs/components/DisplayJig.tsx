import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContentContainer from '../../../../Layouts/MainLayout/components/MainLayoutContainer'
import Frame from '../../../../Components/Input/Frame'
import CustomIcon from '../../../../Components/CustomIcon/CustomIcon'
import { handleOnBlurNumber, handleOnChangeNumber, handleSubmit } from '../Create/validateAndSubmit'
import { Input } from '../Create/Input'
import InputCheckbox from '../Create/InputCheckbox'
import { calculateMaxCellCount, generateGrid } from '../Create/GenerateGrid'
import { INPUT_FIELD_CLAMPS, clampNumber } from '../Create/utils/numberSanitaze'
import { JigTemplate } from '../../../../libraries/dexie/models/jig.model'


const displayJigState = (jigTemplate: JigTemplate) => Object.entries(jigTemplate).reduce(
  (acc, [currName, currVal]) => ({
    ...acc,
    [currName]: typeof currVal === 'number' && currName !== 'copies' ? `${currVal} mm` : currVal,
  }),
  {},
)

const determineCellStyles = (isOriginLowerRight: 'TopLeft' | 'LowerRight' | undefined) =>
  isOriginLowerRight === 'LowerRight' ? ['bottom', 'right'] : ['top', 'left']

type Props = {
  jigTemplate: JigTemplate
}

const DisplayJig = (props: Props) => {
  const [formData, setFormData] = useState<JigTemplate>(props.jigTemplate)
  const [isJigWrapperLoaded, setIsJigWrapperLoaded] = useState<boolean>(false)
  const [keepMaxCellsCount, setKeepMaxCellsCount] = useState(false)

  const displayValueRef = useRef<{ [key: string]: string }>(displayJigState(props.jigTemplate))
  const nameInputRef = useRef<HTMLInputElement>(null)
  const jigWrapperRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDialogElement>(null)

  const navigate = useNavigate()
  const cellStyles = determineCellStyles(formData.origin)

  useEffect(() => {
    nameInputRef.current && nameInputRef.current.focus()
    jigWrapperRef.current && setIsJigWrapperLoaded(true)
  }, [])

  useEffect(() => {
    updateMaxCellsCount()
  }, [
    formData.pageSizeX,
    formData.pageSizeY,
    formData.originOffsetX,
    formData.originOffsetY,
    formData.cellElementSizeX,
    formData.cellElementSizeY,
    formData.layoutSpaceX,
    formData.layoutSpaceY,
    formData.copies,
    keepMaxCellsCount,
  ])

  const updateMaxCellsCount = () => {
    const maxPossibleCellsCount = calculateMaxCellCount(formData)
    const currentMaxCellsCount = clampNumber(maxPossibleCellsCount, INPUT_FIELD_CLAMPS.copies)
    console.log(formData.copies, displayValueRef.current.copies, maxPossibleCellsCount)

    // If keepMaxCellsCount has declared its will, we bow with grace
    if (keepMaxCellsCount) {
      updateStateAndFormatDisplay('copies', currentMaxCellsCount)
      return
    }

    // A simple check to see if the universes balance is maintained
    if (!formData.copies || formData.copies <= currentMaxCellsCount) return

    // If balance is disturbed, we must restore harmony
    updateStateAndFormatDisplay('copies', currentMaxCellsCount)
  }

  const updateStateAndFormatDisplay = (name: string, value: number) => {
    setFormData((fd) => {
      displayValueRef.current[name] = value.toString()
      return { ...fd, [name]: value }
    })
  }

  const submit = (e: FormEvent<HTMLFormElement>) =>
    handleSubmit({ e, formData, setFormData, displayValueRef, navigate })

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData((formData) => ({ ...formData, [e.target.name]: e.target.value }))

  const numberInputProps = (name: keyof JigTemplate) => ({
    name,
    value: displayValueRef.current[name],
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      handleOnChangeNumber({
        e,
        setFormData,
        displayValueRef,
        clamp: INPUT_FIELD_CLAMPS[e.target.name as keyof JigTemplate],
      }),
    onBlur: (e: ChangeEvent<HTMLInputElement>) =>
      handleOnBlurNumber({
        e,
        setFormData,
        displayValueRef,
        clamp: INPUT_FIELD_CLAMPS[e.target.name as keyof JigTemplate],
        addMm: name !== 'copies',
      }),
  })

  return (
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
            className="input input-bordered h-10 grow border-2 px-2"
            value={formData.name}
            onChange={onTextChange}
          />
        </div>
        <Frame label="Media Size">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <CustomIcon icon={'rectWidth'} />
              <Input {...numberInputProps('pageSizeX')} />
            </div>
            <div className="flex items-center gap-2">
              <CustomIcon icon={'rectHeight'} />
              <Input {...numberInputProps('pageSizeY')} />
            </div>
          </div>
        </Frame>
        <Frame label="Origin">
          <div
            className="grid grid-cols-2 gap-2"
            onClick={() => setFormData((fd) => ({ ...fd, origin: 'LowerRight' ? 'TopLeft' : 'LowerRight' }))}
          >
            <InputCheckbox
              label="Upper Left"
              isChecked={formData.origin === 'TopLeft'}
              onClickCallback={() => { }}
            />
            <InputCheckbox
              label="Lower Right"
              isChecked={formData.origin === 'LowerRight'}
              onClickCallback={() => { }}
            />
          </div>
        </Frame>
        <Frame label="Element">
          <div className="grid grid-cols-2 grid-rows-4 gap-2">
            <div className="flex items-center gap-2">
              <CustomIcon icon={'offsetX'} />
              <Input {...numberInputProps('originOffsetX')} />
            </div>
            <div className="flex items-center gap-2">
              <CustomIcon icon={'offsetY'} />
              <Input {...numberInputProps('originOffsetY')} />
            </div>
            <div className="flex items-center gap-2">
              <CustomIcon icon={'rectWidth'} />
              <Input {...numberInputProps('cellElementSizeX')} />
            </div>
            <div className="flex items-center gap-2">
              <CustomIcon icon={'rectHeight'} />
              <Input {...numberInputProps('cellElementSizeY')} />
            </div>
            <div className="flex items-center gap-2">
              <CustomIcon icon={'gapX'} />
              <Input {...numberInputProps('layoutSpaceX')} />
            </div>
            <div className="flex items-center gap-2">
              <CustomIcon icon={'gapY'} />
              <Input {...numberInputProps('layoutSpaceY')} />
            </div>
            <div className="relative flex items-center gap-2">
              <CustomIcon icon={'countRec'} />
              <Input
                {...numberInputProps('copies')}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleOnChangeNumber({
                    e,
                    setFormData,
                    displayValueRef,
                    clamp: INPUT_FIELD_CLAMPS[e.target.name as keyof JigTemplate],
                  })
                  // rotate the needle back - disable keepMaxCellsCount
                  if (keepMaxCellsCount) setKeepMaxCellsCount(false)
                }}
              />
              <button
                type="button"
                className={`group absolute right-2 h-6 w-6 cursor-pointer duration-200 ${keepMaxCellsCount ? 'rotate-0' : 'rotate-[-270deg]'}`}
                onClick={() => {
                  setKeepMaxCellsCount((val) => !val)
                }}
              >
                <CustomIcon icon="max" className="h-6 w-6 duration-200 group-hover:text-white" />
              </button>
            </div>
          </div>
        </Frame>
        <div className="flex grow flex-col rounded-lg border-2 border-[#434B5580] px-1">
          <div className="flex grow flex-col p-1 leading-5">
            <p className="flex grow flex-col items-center justify-center text-center">
              <span className="pb-2 text-lg">You are doing great!</span>
              <span>
                Jig is <span className="font-semibold text-emerald-500">ready&nbsp;</span>to be stored in database.
              </span>
            </p>
          </div>
          <button
            type="button"
            className="button-pop flex items-center justify-center rounded-lg bg-emerald-700 px-8 py-2 text-lg duration-[250ms] ease-out hover:bg-emerald-600"
            onClick={() => modalRef.current?.showModal()}
          >
            Save
          </button>
          <dialog ref={modalRef} className="modal">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Confirm Save Operation</h3>
              <p className="py-4">
                Please confirm if you are ready to proceed with saving the Jig to the database. This action will
                finalize your current configurations and data entries.
              </p>
              <button
                className="button-pop text-md  flex w-full justify-center rounded-lg bg-emerald-700 px-8 py-4 text-lg font-semibold duration-[250ms] ease-out hover:bg-emerald-600"
                type="submit"
                onClick={() => modalRef.current?.close()}
              >
                Save
              </button>
              <div className="mt-2 flex justify-center">
                <button type="button" className="btn btn-ghost w-full" onClick={() => modalRef.current?.close()}>
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
      <div ref={jigWrapperRef} className="flex grow flex-col items-center justify-center bg-base-300/70 ease-out">
        {/* Jig container */}
        <div
          className="relative box-content rounded-sm border-2 border-[#62708080] bg-neutral-900"
          style={{
            transition: 'width 500ms, height 500ms',
            width: `${formData.pageSizeX}px`,
            height: `${formData.pageSizeY}px`,
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
                  width: `${Number(formData.cellElementSizeX)}px`,
                  height: `${Number(formData.cellElementSizeY)}px`,
                }}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default DisplayJig
