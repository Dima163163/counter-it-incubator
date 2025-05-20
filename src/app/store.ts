import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {counterReducer} from '../model/counter-reducer.ts';

const rootReducer = combineReducers({
    counter: counterReducer,
})

// создаем объект store
export const store = configureStore({
    reducer: rootReducer,
})


// типизируем объект store
export type RootState = ReturnType<typeof store.getState>
// типизация метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store