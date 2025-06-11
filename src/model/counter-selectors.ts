import {RootState} from '../app/store'

export const selectCountCounter = (state: RootState): string => state.counter.count
export const selectStartValueCounter = (state: RootState): string => state.counter.startValue
export const selectMaxValueCounter = (state: RootState): string => state.counter.maxValue
export const selectErrorCounter = (state: RootState): boolean => state.counter.error