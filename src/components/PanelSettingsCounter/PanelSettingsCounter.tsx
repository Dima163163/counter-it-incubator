import {PanelSettingsDisplay} from "../PanelSettingsDisplay/PanelSettingsDisplay.tsx";
import {ButtonBlock} from "../ButtonBlock/ButtonBlock.tsx";
import {Button} from "../Button/Button.tsx";
import {InputItem} from "../InputItem/InputItem.tsx";


type Props = {
    maxValue: string
    startValue: string
    changeStartValue: (value: string) => void
    changeMaxValue: (value: string) => void
    saveCountValues: () => void
    error: string
}

export const PanelSettingsCounter = (props: Props) => {
    const {
        maxValue,
        startValue,
        changeStartValue,
        changeMaxValue,
        saveCountValues,
        error
    } = props;

    return (
        <div className={'panelSettingsCounter'}>
            <PanelSettingsDisplay>
                <InputItem
                    text={'max value:'}
                    value={maxValue}
                    onChange={changeMaxValue}
                    error={+startValue >= +maxValue || +maxValue < 0}
                    startValue={startValue}
                />
                <InputItem
                    text={'start value:'}
                    value={startValue}
                    onChange={changeStartValue}
                    error={+startValue >= +maxValue || +startValue < 0}
                    startValue={startValue}
                />
            </PanelSettingsDisplay>
            <ButtonBlock justify={'center'}>
                <Button
                    text={'set'}
                    onClick={saveCountValues}
                    disabled={+startValue >= +maxValue || +maxValue < 0 || +startValue < 0 || error === ''}
                />
            </ButtonBlock>
        </div>

)
}
