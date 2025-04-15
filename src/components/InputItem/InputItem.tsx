import {useEffect, useState} from "react";

type Props = {
    text: string
    value: string
    onChange: (value: string) => void
    error: boolean
    startValue: string
}

export const InputItem = (props: Props) => {
    const {text, value, onChange, error} = props;
    const [newValue, setNewValue] = useState(value);

    useEffect(() => {
        setNewValue(String(parseInt(value, 10)))
    }, [value]);

    return (
        <label className={'itemLabel'}>
            <span className={'itemText'}>{text}</span>
            <input
                value={newValue}
                className={`itemInput ${error ? 'errorInput' : ''}`}
                type={'number'}
                onChange={(e) => {
                    onChange(e.currentTarget.value);
                }}
            />

        </label>
    )
}