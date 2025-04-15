import {Counter} from "./components/Counter/Counter.tsx";
import {PanelSettingsCounter} from "./components/PanelSettingsCounter/PanelSettingsCounter.tsx";
import {useState, useEffect} from "react";

import './App.css'


function App() {
    const [maxValue, setMaxValue] = useState<string>('5');
    const [startValue, setStartValue] = useState<string>('0');
    const [editCounter, setEditCounter] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    useEffect(() => {
        const counterLs = localStorage.getItem('counter');
        if (counterLs) {
            const counter = JSON.parse(counterLs);
            setMaxValue(counter.maxValue)
            setStartValue(counter.startValue)
        }
    }, [])

    useEffect(() => {
        if (+maxValue <= +startValue || +startValue < 0 || +maxValue < 0) {
            setError('error');
        }
    }, [maxValue, startValue]);


    const changeMaxValue = (value: string) => {
        setError('readable')
        setMaxValue(value);
    }

    const changeStartValue = (value: string) => {
        setError('readable')
        setStartValue(value);
    }

    const saveCountValues = () => {
        setStartValue(startValue);
        setMaxValue(maxValue);
        const counter = {maxValue, startValue}
        localStorage.setItem('counter', JSON.stringify(counter));
        setEditCounter(!editCounter);
        setError('');
    }

    const changeEditCounter = () => {
        setEditCounter(!editCounter);
    }


  return (
    <div className={'app'}>
        <PanelSettingsCounter
            maxValue={maxValue}
            startValue={startValue}
            changeMaxValue={changeMaxValue}
            changeStartValue={changeStartValue}
            saveCountValues={saveCountValues}
            error={error}
        />

        <Counter
            maxValue={maxValue}
            startValue={startValue}
            error={error}
            editCounter={editCounter}
            changeEditCounter={changeEditCounter}
            changeMaxValue={changeMaxValue}
            changeStartValue={changeStartValue}
            saveCountValues={saveCountValues}
        />
    </div>
  )
}

export default App
