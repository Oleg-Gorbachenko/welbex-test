import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SortButton.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SortButtonPropsType = DefaultButtonPropsType & {
  direction: string
  isActive: boolean
  onClickSort: (direction:string) => void
}

export const SortButton: React.FC<SortButtonPropsType> = (
  {
    direction,
    isActive,
    className,
    onClickSort,
  }
) => {

  const finalStyle = `${s.btnStyle} ${isActive ? s.active : ''}  ${className ? className : ""}`;
  const indicator = !direction ? '🠗' : direction === "0" ? '🠗' : '🠕';

  return (
    <button className={finalStyle} onClick={() => onClickSort(direction)}>{indicator}</button>
  )
};