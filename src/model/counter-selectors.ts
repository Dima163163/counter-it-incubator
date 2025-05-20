import {CounterProperties} from '../types/types-counter';
import {RootState} from '../app/store'
export const selectCounter = (state: RootState): CounterProperties => state.counter