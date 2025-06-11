import {useAppSelector} from '../../common/hooks/useAppSelector';
import {selectErrorCounter, selectMaxValueCounter, selectStartValueCounter} from '../../model/counter-selectors';
import {PanelSettingsDisplay} from "../PanelSettingsDisplay/PanelSettingsDisplay.tsx";
import {ButtonBlock} from "../ButtonBlock/ButtonBlock.tsx";
import {Button} from "../Button/Button.tsx";
import {InputItem} from "../InputItem/InputItem.tsx";


type Props = {
    changeStartValue: (value: string) => void
    changeMaxValue: (value: string) => void
    saveCountValues: () => void
    isEdit: boolean
}

export const PanelSettingsCounter = (props: Props) => {
    const {
        changeStartValue,
        changeMaxValue,
        saveCountValues,
        isEdit
    } = props;

    const maxValue = useAppSelector(selectMaxValueCounter)
    const startValue = useAppSelector(selectStartValueCounter)
    const error = useAppSelector(selectErrorCounter)

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
                    disabled={!isEdit || +startValue >= +maxValue || +maxValue < 0 || +startValue < 0 || error}
                />
            </ButtonBlock>
        </div>

)
}
