import {CounterProperties} from '../types/types-counter.ts';

const initialState: CounterProperties = {
    maxValue: '5',
    startValue: '0',
    error: false
}

export const saveInitValueCounterAC = (payload: {maxValue: string, startValue: string}) => {
    return {type: 'save_init_value_counter', payload} as const
}

export const saveMaxValueCounterAC = (maxValue: string) => {
    return {type: 'save_max_value_counter', payload: {maxValue}} as const
}

export const saveStartValueCounterAC = (startValue: string) => {
    return {type: 'save_start_value_counter', payload: {startValue}} as const
}

export const changeStatusErrorCounterAC = (error: boolean) => {
    return {type: 'change_status_error_counter', payload: {error}} as const
}


export type SaveStartValueCounterAction = ReturnType<typeof saveInitValueCounterAC>
export type SaveMaxValueCounterAction = ReturnType<typeof saveMaxValueCounterAC>
export type SaveMinValueCounterAction = ReturnType<typeof saveStartValueCounterAC>
export  type ChangeStatusErrorCounterAction = ReturnType<typeof changeStatusErrorCounterAC>


type Action = SaveStartValueCounterAction
    | SaveMaxValueCounterAction
    | SaveMinValueCounterAction
    | ChangeStatusErrorCounterAction

export const counterReducer = (state: CounterProperties = initialState, acton: Action) => {
    switch (acton.type) {
        case 'save_init_value_counter': {
            return {
                ...state,
                maxValue: acton.payload.maxValue,
                startValue: acton.payload.startValue
            }
        }
        case 'change_status_error_counter': {
            return {
                ...state,
                error: acton.payload.error
            }
        }
        case 'save_max_value_counter': {
            return {
                ...state,
                maxValue: acton.payload.maxValue
            }
        }
        case 'save_start_value_counter': {
            return {
                ...state,
                startValue: acton.payload.startValue
            }
        }
        default:
            return  state
    }
}