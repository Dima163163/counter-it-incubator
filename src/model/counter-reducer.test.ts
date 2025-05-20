import {CounterProperties} from '../types/types-counter.ts';
import {beforeEach, expect, test} from 'vitest';
import {
    changeStatusErrorCounterAC,
    counterReducer, saveInitValuesCounterAC,
    saveMaxValueCounterAC,
    saveStartValueCounterAC
} from './counter-reducer.ts';

let startState: CounterProperties = {
    count: '0',
    maxValue: '0',
    startValue: '0',
    error: false
}

beforeEach(() => {
    startState = {
        count: '0',
        maxValue: '5',
        startValue: '0',
        error: false
    }
})

test('correct save value when start project', () => {
    const endState = counterReducer(startState, saveInitValuesCounterAC({maxValue: '20', startValue: '12'}))

    expect(endState.maxValue).toBe('20')
    expect(endState.startValue).toBe('12')
    expect(endState.error).toBe(false)
})

test('correct save max value counter', () => {
    const endState = counterReducer(startState, saveMaxValueCounterAC({maxValue: '50'}))

    expect(endState.maxValue).toBe('50')
})

test('correct save min value counter', () => {
    const endState = counterReducer(startState, saveStartValueCounterAC({startValue: '4'}))

    expect(endState.startValue).toBe('4')
})

test('correct save value error', () => {
    const endState = counterReducer(startState, changeStatusErrorCounterAC({error: true}))

    expect(endState.error).toBe(true)
})