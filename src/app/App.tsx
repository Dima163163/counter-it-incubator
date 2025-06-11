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
import {
    selectCountCounter,
    selectErrorCounter,
    selectMaxValueCounter,
    selectStartValueCounter
} from '../model/counter-selectors';
import {useAppDispatch} from '../common/hooks/useAppDispatch'
import {getCounterValuesLS, saveCounterValuesLS} from './localStorage.ts';



function App() {
    const count = useAppSelector(selectCountCounter)
    const maxValue = useAppSelector(selectMaxValueCounter)
    const startValue = useAppSelector(selectStartValueCounter)
    const error = useAppSelector(selectErrorCounter)

    const dispatch = useAppDispatch()

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [oneCountWindow, setOneCountWindow] = useState<boolean>(true);

    useEffect(() => {
        dispatch(getCounterValuesLS())
    }, [dispatch])

    useEffect(() => {
        if (+maxValue <= +startValue || +startValue < 0 || +maxValue < 0) {
            dispatch(changeStatusErrorCounterAC({error: true}))
        } else {
            dispatch(changeStatusErrorCounterAC({error: false}))
        }
    }, [maxValue, startValue, dispatch]);


    const changeMaxValue = (value: string) => {
        setIsEdit(true);
        dispatch(saveMaxValueCounterAC({maxValue: value}))
    }

    const changeStartValue = (value: string) => {
        console.log(value)
        setIsEdit(true);
        dispatch(saveStartValueCounterAC({startValue: value}))
    }

    const saveCountValues = () => {
        dispatch(saveInitValuesCounterAC({maxValue: maxValue, startValue: startValue}))
        // localStorage.setItem('counter', JSON.stringify({maxValue: counter.maxValue, startValue: counter.startValue}));
        dispatch(saveCounterValuesLS({
            count: count,
            maxValue: maxValue,
            startValue: startValue,
            error: error
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
                changeMaxValue={changeMaxValue}
                changeStartValue={changeStartValue}
                saveCountValues={saveCountValues}
                isEdit={isEdit}
            />}

            <Counter
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
