import {Counter} from "./components/Counter/Counter.tsx";
import {PanelSettingsCounter} from "./components/PanelSettingsCounter/PanelSettingsCounter.tsx";
import {useState, useEffect, useReducer} from 'react';

import './App.css'
import {Button} from "./components/Button/Button.tsx";
import {CounterProperties} from './types/types-counter.ts';
import {
    changeStatusErrorCounterAC,
    counterReducer, saveInitValueCounterAC,
    saveMaxValueCounterAC,
    saveStartValueCounterAC
} from './model/counter-reducer.ts';

const initialState: CounterProperties = {
    maxValue: '5',
    startValue: '0',
    error: false
}


function App() {
    // const [maxValue, setMaxValue] = useState<string>('5');
    // const [startValue, setStartValue] = useState<string>('0');
    // const [error, setError] = useState<boolean>(false);

    const [counter, dispatchToCounter] = useReducer(counterReducer, initialState);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [oneCountWindow, setOneCountWindow] = useState<boolean>(true);

    useEffect(() => {
        const counterLs = localStorage.getItem('counter');
        if (counterLs) {
            const counter = JSON.parse(counterLs);
            // setMaxValue(counter.maxValue)
            // setStartValue(counter.startValue)
            dispatchToCounter(saveInitValueCounterAC({maxValue: counter.maxValue, startValue: counter.startValue}))
        }
    }, [])

    // useEffect(() => {
    //     if (+maxValue <= +startValue || +startValue < 0 || +maxValue < 0) {
    //         setError(true);
    //     } else {
    //         setError(false)
    //     }
    // }, [maxValue, startValue]);

    useEffect(() => {
        if (+counter.maxValue <= +counter.startValue || +counter.startValue < 0 || +counter.maxValue < 0) {
            dispatchToCounter(changeStatusErrorCounterAC(true))
        } else {
            dispatchToCounter(changeStatusErrorCounterAC(false))
        }
    }, [counter.maxValue, counter.startValue]);


    const changeMaxValue = (value: string) => {
        setIsEdit(true);
        // setMaxValue(value);
        dispatchToCounter(saveMaxValueCounterAC(value))
    }

    const changeStartValue = (value: string) => {
        setIsEdit(true);
        // setStartValue(value);
        dispatchToCounter(saveStartValueCounterAC(value))
    }

    const saveCountValues = () => {
        // setStartValue(startValue);
        // setMaxValue(maxValue);
        dispatchToCounter(saveInitValueCounterAC({maxValue: counter.maxValue, startValue: counter.startValue}))
        // const counter = {maxValue, startValue}
        localStorage.setItem('counter', JSON.stringify({maxValue: counter.maxValue, startValue: counter.startValue}));
        setIsEdit(!isEdit);
        // setError(false);
        dispatchToCounter(changeStatusErrorCounterAC(false))
    }


  return (
    <div className={'app'}>
        <div>
            <Button text={oneCountWindow ? 'Show count settings' : 'Hide count settings'} onClick={() => setOneCountWindow(!oneCountWindow)}/>
        </div>
        <div className={'counterContainer'}>
            {!oneCountWindow && <PanelSettingsCounter
                maxValue={counter.maxValue}
                startValue={counter.startValue}
                changeMaxValue={changeMaxValue}
                changeStartValue={changeStartValue}
                saveCountValues={saveCountValues}
                error={counter.error}
                isEdit={isEdit}
            />}

            <Counter
                maxValue={counter.maxValue}
                startValue={counter.startValue}
                error={counter.error}
                isEdit={isEdit}
                changeMaxValue={changeMaxValue}
                changeStartValue={changeStartValue}
                saveCountValues={saveCountValues}
                oneCountWindow={oneCountWindow}
            />
        </div>
    </div>
  )
}

export default App
