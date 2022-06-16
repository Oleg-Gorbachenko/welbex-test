import React from 'react';
import s from './Main.module.css'
import {BeautyDate} from "../../common/components/BeautyDate/BeautyDate";
import {ResponseDataType} from "../../dal/api";
import {SortButton} from "../../common/components/SortButton/SortButton";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {setSortedArrayAC} from "../../bll/appReducer";

type MainPropsType = {
  currentData: Array<ResponseDataType>
  column: string
  condition: string
  inputValue: string
}

export const Main = ({currentData, column, condition, inputValue}: MainPropsType) => {

  const dispatch = useAppDispatch()
  const direction = useAppSelector<string>(state => state.app.direction)
  const data = useAppSelector<Array<ResponseDataType>>(state => state.app.data)

  let dataCopy = currentData

  //условия фильтрации
  if (column === 'Количество' && (condition === 'Больше' || condition === 'Содержит')) {
    dataCopy = dataCopy.filter(el => el.number > +inputValue)
  }
  if (column === 'Количество' && condition === 'Меньше') {
    dataCopy = dataCopy.filter(el => el.number < +inputValue)
  }
  if (column === 'Количество' && condition === 'Равно') {
    dataCopy = dataCopy.filter(el => el.number === +inputValue)
  }
  if (column === 'Расстояние' && (condition === 'Больше' || condition === 'Содержит')) {
    dataCopy = dataCopy.filter(el => el.distance > +inputValue)
  }
  if (column === 'Расстояние' && condition === 'Меньше') {
    dataCopy = dataCopy.filter(el => el.distance < +inputValue)
  }
  if (column === 'Расстояние' && condition === 'Равно') {
    dataCopy = dataCopy.filter(el => el.distance === +inputValue)
  }
  if (column === 'Название' && condition === 'Содержит' && inputValue !== '') {
    dataCopy = dataCopy.filter(el => el.name.includes(inputValue))
  }
  if (column === 'Название' && condition === 'Равно' && inputValue !== '') {
    dataCopy = dataCopy.filter(el => el.name === inputValue)
  }
  if (inputValue === '') {
    dataCopy = dataCopy.map(el => el)
  }

  //функции сортировки
  const sortUp = (arr: Array<ResponseDataType>, place: string) => {
    return [...arr].sort(function (a: any, b: any) {
      if (a[place] > b[place]) {
        return 1;
      }
      if (a[place] < b[place]) {
        return -1;
      }
      return 0;
    })
  }

  const sortDown = (arr: Array<ResponseDataType>, place: string) => {
    return [...arr].sort(function (a: any, b: any) {
      if (a[place] < b[place]) {
        return 1;
      }
      if (a[place] > b[place]) {
        return -1;
      }
      return 0;
    })
  }

  //выбор функции сортировки
  const onClickHandler = (place: string, direction: string) => {
    direction
      ?
      dispatch(setSortedArrayAC(sortUp(data, place), ''))
      :
      dispatch(setSortedArrayAC(sortDown(data, place), 'direction'))
  }

  return (
    <div className={s.tableMainBlock}>
      <table className="table">
        <thead>
        <tr className={s.trStyle}>
          <th>Дата</th>
          <th>Название
            <SortButton onClickSort={(direction) => onClickHandler('name', direction)}
                        isActive={true}
                        direction={direction}/>
          </th>
          <th>Количество
            <SortButton onClickSort={(direction) => onClickHandler('number', direction)}
                        isActive={true}
                        direction={direction}/>
          </th>
          <th>Расстояние
            <SortButton onClickSort={(direction) => onClickHandler('distance', direction)}
                        isActive={true}
                        direction={direction}/>
          </th>
        </tr>
        </thead>
        <tbody>
        {dataCopy.map(el =>
          <tr key={el.id}>
            <td><BeautyDate date={el.date}/></td>
            <td>{el.name}</td>
            <td>{el.number}</td>
            <td>{el.distance}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
};
