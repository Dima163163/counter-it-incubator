import {createAsyncThunk} from '@reduxjs/toolkit';
import {CounterProperties} from '../types/types-counter.ts';

export const saveCounterValuesLS = createAsyncThunk(
    'counter/saveCounterValuesLS',
    async (counter: CounterProperties) => {
        const counterJSON= JSON.stringify(counter)
        localStorage.setItem('counter', counterJSON)
    }
)

export const getCounterValuesLS = createAsyncThunk(
    'counter/getCounterValuesLS',
    async () => {
        const counter = localStorage.getItem('counter')
        if (counter) {
           const counterState: CounterProperties = JSON.parse(counter)

            return counterState
        }
    }
)