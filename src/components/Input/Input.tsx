import { FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Input: FC<InputProps> = ({name, label, ...props}) => {

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input required id={name} {...props} />
    
    </>
  )
}

export default Input