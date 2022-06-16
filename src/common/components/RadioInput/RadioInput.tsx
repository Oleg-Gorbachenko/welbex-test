import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import s from './RadioInput.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
}

export const RadioInput: React.FC<SuperSelectPropsType> = (
  {
    value,
    options,
    onChange, onChangeOption,
    className,
    ...restProps
  }
) => {

  const mappedOptions: any[] = options ? options.map((o, i) => (
    <option key={o + '-' + i}
            className={s.option}
            value={o}>{o}
    </option>
  )) : [];

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChangeOption && onChangeOption(e.currentTarget.value)
    onChange && onChange(e)
  }

  const finalSelectClassName = s.select + (
    className ? ' ' + className : ''
  )
  return (
    <select className={finalSelectClassName} onChange={onChangeCallback} {...restProps}>
      {mappedOptions}
    </select>
  )
}