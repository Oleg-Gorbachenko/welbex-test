import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppActionsType, appReducer} from "./appReducer";

export type AppStateType = ReturnType<typeof rootReducer>;
export type RootActionsType = AppActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, RootActionsType>;
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, RootActionsType>;

const rootReducer = combineReducers({
  app: appReducer,
});

// Custom `useDispatch` and `useSelector: Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export const store = createStore(rootReducer, applyMiddleware(thunk));