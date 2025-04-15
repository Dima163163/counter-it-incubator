import {ReactNode} from "react";

type Props = {
    children: ReactNode
}

export const CounterDisplay = ({children}: Props) => {


    return (
        <div className={'counterDisplay'}>
            {children}
        </div>
    )
}