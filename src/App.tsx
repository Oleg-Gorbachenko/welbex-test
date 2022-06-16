import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import {Main} from "./components/Main/Main";
import {Header} from "./components/Header/Header";
import {useAppDispatch, useAppSelector} from "./bll/store";
import {getDataTC, setCurrentPageAC} from "./bll/appReducer";
import {ResponseDataType} from "./dal/api";
import {Paginator} from "./common/components/Paginator/Paginator";
import {Spinner} from "./common/components/Spinner/Spinner";

export function App() {

  useEffect(() => {
    dispatch(getDataTC())
  }, [])

  const data = useAppSelector(state => state.app.data)
  const isLoading = useAppSelector(state => state.app.isLoading)
  const dispatch = useAppDispatch()

  const currentPage = useAppSelector<number>(store => store.app.page);
  const pageSize = useAppSelector<number>(store => store.app.pageCount);

  const [column, setColumn] = useState('')
  const [condition, setCondition] = useState('')
  const [inputValue, setInputValue] = useState('')

  //значения из инпутов достаем из Header и передаем в Main
  const filter = (column: string, condition: string, inputValue: string) => {
    if (inputValue) {
    setColumn(column)
    setCondition(condition)
    setInputValue(inputValue)
    } else {
      setInputValue('')
    }
  }

  //функция пагинации
  const paginationCalcFunc = (currentPage: number, pageSize: number, dataCopy: Array<ResponseDataType>) => {
      let lastIndex = currentPage * pageSize;
      let firstIndex = lastIndex - pageSize;
      return dataCopy.slice(firstIndex, lastIndex);
  };

  //получаем количество элементов массива на странице
  const currentData = paginationCalcFunc(currentPage, pageSize, data);

  //перерисовка при изменении страницы
  useEffect(() => {
  }, [currentPage])

  //меняем в стэйте текущую страницу
  const onPageChanged = (page: number) => {
    dispatch(setCurrentPageAC(page))
  }

  return (
    <div className={s.App}>
      {isLoading?
        <Spinner/>:
      <div className={s.container}>
        <Header filter={(column, condition, inputValue) => filter(column, condition, inputValue)}/>
        <Main currentData={currentData}
              column={column}
              condition={condition}
              inputValue={inputValue}/>
        <Paginator pageSize={pageSize}
                   totalItemsCount={data.length}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}/>
      </div>
      }
    </div>
  );
}