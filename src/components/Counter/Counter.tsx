import {CounterDisplay} from "../CounterDisplay/CounterDisplay.tsx";
import {useEffect, useState} from "react";
import {ButtonBlock} from "../ButtonBlock/ButtonBlock.tsx";
import {Button} from "../Button/Button.tsx";
import {InputItem} from "../InputItem/InputItem.tsx";

type Props = {
    maxValue: string
    startValue: string
    error: string
    editCounter: boolean
    changeEditCounter: () => void
    changeMaxValue: (value: string) => void
    changeStartValue: (value: string) => void
    saveCountValues: () => void
}

export const Counter = (props: Props) => {
    const {
        maxValue,
        startValue,
        error,
        editCounter,
        changeEditCounter,
        changeMaxValue,
        changeStartValue,
        saveCountValues,
    } = props;
    const [count, setCount] = useState<string>('0');
    console.log('error', error);

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
        if (error ==='readable') {
            return (
                <p className={'displayWarning'}>
                    enter value and press 'set'
                </p>
            )
        }
        if (error === 'error') {
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
                {editCounter ? (
                    <>
                        <InputItem
                            text={'max value:'}
                            value={maxValue}
                            onChange={changeMaxValue}
                            error={error === 'error'}
                            startValue={startValue}

                        />
                        <InputItem
                            text={'start value:'}
                            value={startValue}
                            onChange={changeStartValue}
                            error={error === 'error'}
                            startValue={startValue}
                        />
                    </>
                ) : displayContent}
            </CounterDisplay>
            <ButtonBlock justify={!editCounter ? 'between' : 'center'}>
                { !editCounter ? (
                        <>
                            <Button text={'inc'} onClick={incrementCount} disabled={count === maxValue} />
                            <Button text={'reset'} onClick={resetCount} />
                            <Button text={'set'} onClick={changeEditCounter} />
                        </>
                    ) : (
                        <Button text={'set'} onClick={saveCountValues} disabled={startValue >= maxValue || +startValue < 0 || error === 'error'}/>
                    )
                }
            </ButtonBlock>
        </div>
    )
}