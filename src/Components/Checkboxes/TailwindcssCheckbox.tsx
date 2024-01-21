type Props = {
  defaultChecked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // Updated type
  labelText?: string
  width?: number | string
}

const TailwindcssCheckbox = ({ defaultChecked, onChange, labelText, width }: Props) => (
  <div className="form-control items-center justify-center rounded-lg bg-base-300 px-2 py-1" style={{ width }}>
    {labelText ? (
      <label className="label flex w-full cursor-pointer items-center justify-between">
        <div className="label-text pr-2 text-sm">{labelText}</div>
        <input type="checkbox" defaultChecked={defaultChecked} onChange={onChange} className="checkbox bg-base-200" />
      </label>
    ) : (
      <input type="checkbox" defaultChecked={defaultChecked} onChange={onChange} className="checkbox bg-base-200" />
    )}
  </div>
)

export default TailwindcssCheckbox
