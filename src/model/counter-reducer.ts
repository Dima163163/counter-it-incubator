import {CounterProperties} from '../types/types-counter';
import {createAction, createReducer, PayloadAction} from '@reduxjs/toolkit';
import {getCounterValuesLS, saveCounterValuesLS} from '../app/localStorage.ts';

export const incrementValueCounterAC = createAction<{count: string}>('counter/incrementValueCounter')
export const saveInitValuesCounterAC = createAction<{maxValue: string, startValue: string}>('counter/saveInitValuesCounter')
export const saveMaxValueCounterAC = createAction<{maxValue: string}>('counter/saveMaxValueCounter')
export const saveStartValueCounterAC = createAction<{startValue: string}>('counter/saveStartValueCounter')
export const changeStatusErrorCounterAC = createAction<{error: boolean}>('counter/changeStatusErrorCounter')


export const initialState: CounterProperties = {
    count: '0',
    maxValue: '5',
    startValue: '0',
    error: false
}

export const counterReducer = createReducer(initialState, builder => {
    builder
        .addCase(incrementValueCounterAC, (state, action) => {
            state.count = action.payload.count
        })
        .addCase(saveMaxValueCounterAC, (state, action) => {
            state.maxValue = action.payload.maxValue
        })
        .addCase(saveStartValueCounterAC, (state, action) => {
            state.startValue = action.payload.startValue
        })
        .addCase(changeStatusErrorCounterAC, (state, action) => {
            state.error = action.payload.error
        })
        .addCase(saveInitValuesCounterAC, (state, action) => {
            state.maxValue = action.payload.maxValue
            state.startValue = action.payload.startValue
        })
        .addCase(saveCounterValuesLS.fulfilled, () => {})
        .addCase(getCounterValuesLS.fulfilled, (state, action: PayloadAction<CounterProperties | undefined>) => {
            if (action.payload) {
                state.count = action.payload.count
                state.maxValue = action.payload.maxValue
                state.startValue = action.payload.startValue
                state.error = action.payload.error
            }
        })
})
//
// export const incrementValueCounterAC = (payload: {count: string}) => {
//     return {type: 'increment_value_counter', payload} as const
// }
//
// export const saveInitValuesCounterAC = (payload: {maxValue: string, startValue: string}) => {
//     return {type: 'save_init_values_counter', payload} as const
// }
//
// export const saveMaxValueCounterAC = (maxValue: string) => {
//     return {type: 'save_max_value_counter', payload: {maxValue}} as const
// }
//
// export const saveStartValueCounterAC = (startValue: string) => {
//     return {type: 'save_start_value_counter', payload: {startValue}} as const
// }
//
// export const changeStatusErrorCounterAC = (error: boolean) => {
//     return {type: 'change_status_error_counter', payload: {error}} as const
// }


// export type IncrementValueCounterAction = ReturnType<typeof incrementValueCounterAC>
// export type SaveStartValuesCounterAction = ReturnType<typeof saveInitValuesCounterAC>
// export type SaveMaxValueCounterAction = ReturnType<typeof saveMaxValueCounterAC>
// export type SaveMinValueCounterAction = ReturnType<typeof saveStartValueCounterAC>
// export  type ChangeStatusErrorCounterAction = ReturnType<typeof changeStatusErrorCounterAC>
//
//
// type Action =
//     IncrementValueCounterAction
//     | SaveStartValuesCounterAction
//     | SaveMaxValueCounterAction
//     | SaveMinValueCounterAction
//     | ChangeStatusErrorCounterAction
//
// export const counterReducer = (state: CounterProperties = initialState, acton: Action) => {
//     switch (acton.type) {
//         case 'increment_value_counter': {
//             return {
//                 ...state,
//                 count: acton.payload.count
//             }
//         }
//         case 'save_init_values_counter': {
//             return {
//                 ...state,
//                 maxValue: acton.payload.maxValue,
//                 startValue: acton.payload.startValue
//             }
//         }
//         case 'change_status_error_counter': {
//             return {
//                 ...state,
//                 error: acton.payload.error
//             }
//         }
//         case 'save_max_value_counter': {
//             return {
//                 ...state,
//                 maxValue: acton.payload.maxValue
//             }
//         }
//         case 'save_start_value_counter': {
//             return {
//                 ...state,
//                 startValue: acton.payload.startValue
//             }
//         }
//         default:
//             return  state
//     }
// }