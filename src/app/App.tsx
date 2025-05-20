import {Counter} from "../components/Counter/Counter.tsx";
import {PanelSettingsCounter} from "../components/PanelSettingsCounter/PanelSettingsCounter.tsx";
import {useState, useEffect} from 'react';

import './App.css'
import {Button} from "../components/Button/Button.tsx";
import {
    changeStatusErrorCounterAC, saveInitValuesCounterAC,
    saveMaxValueCounterAC,
    saveStartValueCounterAC
} from '../model/counter-reducer.ts';
import {useAppSelector} from '../common/hooks/useAppSelector'
import {selectCounter} from '../model/counter-selectors'
import {useAppDispatch} from '../common/hooks/useAppDispatch'
import {getCounterValuesLS, saveCounterValuesLS} from './localStorage.ts';



function App() {
    const counter = useAppSelector(selectCounter)
    const dispatch = useAppDispatch()

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [oneCountWindow, setOneCountWindow] = useState<boolean>(true);

    useEffect(() => {
        dispatch(getCounterValuesLS())
    }, [dispatch])

    useEffect(() => {
        if (+counter.maxValue <= +counter.startValue || +counter.startValue < 0 || +counter.maxValue < 0) {
            dispatch(changeStatusErrorCounterAC({error: true}))
        } else {
            dispatch(changeStatusErrorCounterAC({error: false}))
        }
    }, [counter.maxValue, counter.startValue, dispatch]);


    const changeMaxValue = (value: string) => {
        setIsEdit(true);

        dispatch(saveMaxValueCounterAC({maxValue: value}))
    }

    const changeStartValue = (value: string) => {
        setIsEdit(true);

        dispatch(saveStartValueCounterAC({startValue: value}))
    }

    const saveCountValues = () => {
        dispatch(saveInitValuesCounterAC({maxValue: counter.maxValue, startValue: counter.startValue}))
        // localStorage.setItem('counter', JSON.stringify({maxValue: counter.maxValue, startValue: counter.startValue}));
        dispatch(saveCounterValuesLS({
            count: counter.count,
            maxValue: counter.maxValue,
            startValue: counter.startValue,
            error: counter.error
        }))
        setIsEdit(!isEdit);
        // setError(false);
        dispatch(changeStatusErrorCounterAC({error: false}))
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
