import { twMerge } from "tailwind-merge"

type InputProps = {
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  value: string | number | null | undefined
}

export const Input = ({ name, onChange, onBlur, className, value }: InputProps) => {
  return (
    <input
      type="text"
      name={name}
      autoComplete="off"
      className={twMerge('input input-bordered h-10 min-w-0 max-w-full flex-1', className)}
      value={value ?? ''}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}