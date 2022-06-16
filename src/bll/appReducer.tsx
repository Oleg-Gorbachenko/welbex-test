import {AppThunkType} from "./store";
import {api, ResponseDataType} from "../dal/api";

// Types
type InitStateType = typeof initState;
type GetDataActionType = ReturnType<typeof setDataAC>;
type FilterActionType = ReturnType<typeof filterAC>;
type SetCurrentPageActionType = ReturnType<typeof setCurrentPageAC>;
type SetSortedArrayActionType = ReturnType<typeof setSortedArrayAC>;
type IsLoadingActionType = ReturnType<typeof isLoadingAC>;
export type AppActionsType =
  GetDataActionType
  | FilterActionType
  | SetSortedArrayActionType
  | IsLoadingActionType
  | SetCurrentPageActionType;

//variables
const SET_DATA = "app/SET-DATA";
const FILTER_DATA = "app/FILTER-DATA";
const SET_CURRENT_PAGE = "app/SET-CURRENT-PAGE";
const SET_SORTED_ARRAY = "app/SET-SORTED-ARRAY";
const IS_LOADING = "app/IS-LOADING";

// Initial state
const initState = {
  data: [] as Array<ResponseDataType>,
  pageCount: 10,
  page: 1,
  isLoading: false,
  direction: 'direction',
};

// Action creators
export const setDataAC = (data: Array<ResponseDataType>) =>
  ({type: SET_DATA, data} as const);
export const isLoadingAC = (value: boolean) =>
  ({type: IS_LOADING, value} as const);
export const filterAC = (column: string, condition: string, inputValue: string) =>
  ({type: FILTER_DATA, column, condition, inputValue} as const);
export const setCurrentPageAC = (page: number) =>
  ({type: SET_CURRENT_PAGE, page} as const);
export const setSortedArrayAC = (data: Array<ResponseDataType>, direction: string) =>
  ({type: SET_SORTED_ARRAY, data, direction} as const);

// Thunk creators
export const getDataTC = (): AppThunkType => (dispatch) => {
  dispatch(isLoadingAC(true))
  api.getData()
    .then((res) => {
      dispatch(setDataAC(res.data))
    })
    .catch(error => {
      console.error(error)
    })
    .finally(() => dispatch(isLoadingAC(false)))
};

// reducer
export const appReducer = (state: InitStateType = initState, action: AppActionsType): InitStateType => {
  switch (action.type) {
    case SET_DATA:
      return {...state, data: action.data}
    case IS_LOADING:
      return {...state, isLoading: action.value}
    case SET_CURRENT_PAGE:
      return {...state, page: action.page}
    case SET_SORTED_ARRAY:
      return {...state, data: action.data, direction: action.direction}
    default:
      return state;
  }
};
