import {CounterDisplay} from "../CounterDisplay/CounterDisplay.tsx";
import {useEffect} from 'react';
import {ButtonBlock} from "../ButtonBlock/ButtonBlock.tsx";
import {Button} from "../Button/Button.tsx";
import {InputItem} from "../InputItem/InputItem.tsx";
import {incrementValueCounterAC} from '../../model/counter-reducer.ts';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {selectCounter} from '../../model/counter-selectors';
import {useAppDispatch} from '../../common/hooks/useAppDispatch.ts';

type Props = {
    maxValue: string
    startValue: string
    error: boolean
    isEdit: boolean
    changeMaxValue: (value: string) => void
    changeStartValue: (value: string) => void
    saveCountValues: () => void
    oneCountWindow: boolean
}

export const Counter = (props: Props) => {
    const {
        maxValue,
        startValue,
        error,
        isEdit,
        changeMaxValue,
        changeStartValue,
        saveCountValues,
        oneCountWindow
    } = props;
    // const [count, setCount] = useState<string>('0');
    // const [counter, dispatchToCounter] = useReducer(counterReducer, initialState);
    const counter = useAppSelector(selectCounter)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(incrementValueCounterAC({count: startValue}))
    }, [startValue, dispatch])

    const incrementCount = () => {
        if (+counter.count < +maxValue) {
            const newCount = +counter.count + 1
            dispatch(incrementValueCounterAC({count: String(newCount)}))
        }
    }

    const resetCount = () => {
        dispatch(incrementValueCounterAC({count: startValue}))

    }

    const contentValue =() => {
        if (isEdit && !error) {
            return (
                <p className={'displayWarning'}>
                    enter value and press 'set'
                </p>
            )
        }

        if (isEdit && error) {
            return (
                <p className={'displayError'}>Incorrect value!</p>
            )
        }

        return (
            <span
                className={`counterNumber ${counter.count === maxValue ? 'redColor' : 'defaultColor'}`}>
                {counter.count}
            </span>
        )
    }

    const displayContent = contentValue()
    return (
        <div className={'counter'}>
            <CounterDisplay>
                {isEdit && oneCountWindow ? (
                    <>
                        <InputItem
                            text={'max value:'}
                            value={maxValue}
                            onChange={changeMaxValue}
                            error={error}
                            startValue={startValue}

                        />
                        <InputItem
                            text={'start value:'}
                            value={startValue}
                            onChange={changeStartValue}
                            error={error}
                            startValue={startValue}
                        />
                    </>
                 ) : displayContent}
            </CounterDisplay>
            <ButtonBlock justify={!isEdit && oneCountWindow ? 'between' : 'center'}>
                <>
                    {
                        !oneCountWindow && !isEdit  && (
                            <>
                                <Button
                                    text={'inc'}
                                    onClick={incrementCount}
                                    disabled={counter.count === maxValue || error}
                                />
                                <Button
                                    text={'reset'}
                                    onClick={resetCount}
                                    disabled={error}
                                />
                            </>
                        )
                    }
                    {
                        !oneCountWindow && isEdit && (
                            <Button
                                text={'set'}
                                onClick={saveCountValues}
                                disabled={error}
                            />
                        )
                    }
                    {
                        oneCountWindow && isEdit && (
                            <Button
                                text={'set'}
                                onClick={saveCountValues}
                                disabled={error}
                            />
                        )
                    }
                    {
                        oneCountWindow && !isEdit && (
                            <>
                                <Button
                                    text={'inc'}
                                    onClick={incrementCount}
                                    disabled={counter.count === maxValue || error}
                                />
                                <Button
                                    text={'reset'}
                                    onClick={resetCount}
                                    disabled={error}
                                />
                                <Button
                                    text={'set'}
                                    onClick={saveCountValues}
                                    disabled={error}
                                />
                            </>
                        )
                    }
                </>
            </ButtonBlock>
        </div>
    )
}