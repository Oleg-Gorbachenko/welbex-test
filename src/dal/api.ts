import axios from "axios";


export type ResponseDataType = {
  id: number
  date: string
  name: string
  number: number
  distance: number
}

export const api = {
  getData() {
    return axios.get<Array<ResponseDataType>>('https://ta-table.herokuapp.com/entries')
  }
}