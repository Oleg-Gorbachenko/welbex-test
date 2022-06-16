import React, {useState} from 'react';
import {RadioInput} from "../../common/components/RadioInput/RadioInput";
import {InputText} from "../../common/components/InputText/InputText";
import s from './Header.module.css'
import {Button} from "../../common/components/Button/Button";

type HeaderPropsType = {
  filter: (column: string, condition: string, inputValue: string) => void
}

//значения радио-селекторов
const columnValuesArray = ['Название', 'Количество', 'Расстояние']
const conditionValuesArray = ['Равно', 'Содержит', 'Больше', 'Меньше']
const conditionValues = ['Равно', 'Содержит']

export const Header = (props: HeaderPropsType) => {

  const [column, setColumn] = useState(columnValuesArray[0])
  const [condition, setCondition] = useState(conditionValuesArray[0])
  const [inputValue, setInputValue] = useState('')

  //если выбрана колонка Название, то Условия будут только Равно и Содержит
  let conditionValuesArrayFinally = column === 'Название' ? conditionValues : conditionValuesArray

  //при клике на кнопку передаю значения инпутов в Арр
  const onClickHandler = () => {
    props.filter(column, condition, inputValue)
  }

  return (
    <div className={s.wrapper}>
      <div>
        <span>Выберите колонку: </span>
        <RadioInput name={'radio'}
                    options={columnValuesArray}
                    value={column}
                    onChangeOption={setColumn}/>
      </div>
      <div>
        <span>Выберите условие: </span>
        <RadioInput name={'radio'}
                    options={conditionValuesArrayFinally}
                    value={condition}
                    onChangeOption={setCondition}/>
      </div>
      <InputText placeholder={'Значение'}
                 value={inputValue}
                 onChangeText={setInputValue}/>
      <Button name={'Фильтровать'} onClick={onClickHandler}/>
    </div>
  );
};