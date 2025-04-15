import {CounterDisplay} from "../CounterDisplay/CounterDisplay.tsx";
import {useEffect, useState} from "react";
import {ButtonBlock} from "../ButtonBlock/ButtonBlock.tsx";
import {Button} from "../Button/Button.tsx";
import {InputItem} from "../InputItem/InputItem.tsx";

type Props = {
    maxValue: string
    startValue: string
    error: boolean
    isEdit: boolean
    changeEditCounter: () => void
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
        changeEditCounter,
        changeMaxValue,
        changeStartValue,
        saveCountValues,
        oneCountWindow
    } = props;
    const [count, setCount] = useState<string>('0');

    useEffect(() => {
        setCount(startValue)
    }, [startValue])

    const incrementCount = () => {
        if (+count < +maxValue) {
            const newCount = +count + 1
            setCount(String(newCount));
        }
    }

    const resetCount = () => {
        setCount(startValue)
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
                className={`counterNumber ${count === maxValue ? 'redColor' : 'defaultColor'}`}>
                {count}
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
            <ButtonBlock justify={isEdit && oneCountWindow ? 'center' : 'between'}>
                { isEdit && oneCountWindow ? (
                         <Button text={'set'} onClick={saveCountValues} disabled={startValue >= maxValue || +startValue < 0 || error}/>
                     ) : (
                    <>
                        <Button text={'inc'} onClick={incrementCount} disabled={count === maxValue || error} />
                        <Button text={'reset'} onClick={resetCount} disabled={error}/>
                        <Button text={'set'} onClick={changeEditCounter} disabled={error}/>
                    </>
                )
                }
            </ButtonBlock>
        </div>
    )
}