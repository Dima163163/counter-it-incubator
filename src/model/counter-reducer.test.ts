import {CounterProperties} from '../types/types-counter.ts';
import {beforeEach, expect, test} from 'vitest';
import {
    changeStatusErrorCounterAC,
    counterReducer, saveInitValueCounterAC,
    saveMaxValueCounterAC,
    saveStartValueCounterAC
} from './counter-reducer.ts';

let startState: CounterProperties = {
    maxValue: '0',
    startValue: '0',
    error: false
}

beforeEach(() => {
    startState = {
        maxValue: '5',
        startValue: '0',
        error: false
    }
})

test('correct save value when start project', () => {
    const endState = counterReducer(startState, saveInitValueCounterAC({maxValue: '20', startValue: '12'}))

    expect(endState.maxValue).toBe('20')
    expect(endState.startValue).toBe('12')
    expect(endState.error).toBe(false)
})

test('correct save max value counter', () => {
    const endState = counterReducer(startState, saveMaxValueCounterAC('50'))

    expect(endState.maxValue).toBe('50')
})

test('correct save min value counter', () => {
    const endState = counterReducer(startState, saveStartValueCounterAC('4'))

    expect(endState.startValue).toBe('4')
})

test('correct save value error', () => {
    const endState = counterReducer(startState, changeStatusErrorCounterAC(true))

    expect(endState.error).toBe(true)
})