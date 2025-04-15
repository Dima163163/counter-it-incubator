import {Counter} from "./components/Counter/Counter.tsx";
import {PanelSettingsCounter} from "./components/PanelSettingsCounter/PanelSettingsCounter.tsx";
import {useState, useEffect} from "react";

import './App.css'
import {Button} from "./components/Button/Button.tsx";


function App() {
    const [maxValue, setMaxValue] = useState<string>('5');
    const [startValue, setStartValue] = useState<string>('0');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [oneCountWindow, setOneCountWindow] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);


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
            setError(true);
        } else {
            setError(false)
        }
    }, [maxValue, startValue]);


    const changeMaxValue = (value: string) => {
        setIsEdit(true);
        setMaxValue(value);
    }

    const changeStartValue = (value: string) => {
        setIsEdit(true);
        setStartValue(value);
    }

    const saveCountValues = () => {
        setStartValue(startValue);
        setMaxValue(maxValue);
        const counter = {maxValue, startValue}
        localStorage.setItem('counter', JSON.stringify(counter));
        setIsEdit(!isEdit);
        setError(false);
    }


  return (
    <div className={'app'}>
        <div>
            <Button text={oneCountWindow ? 'Show count settings' : 'Hide count settings'} onClick={() => setOneCountWindow(!oneCountWindow)}/>
        </div>
        <div className={'counterContainer'}>
            {!oneCountWindow && <PanelSettingsCounter
                maxValue={maxValue}
                startValue={startValue}
                changeMaxValue={changeMaxValue}
                changeStartValue={changeStartValue}
                saveCountValues={saveCountValues}
                error={error}
            />}

            <Counter
                maxValue={maxValue}
                startValue={startValue}
                error={error}
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
