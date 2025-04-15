import {ReactNode} from "react";

type Props = {
    children: ReactNode
    justify: string
}

export const ButtonBlock = ({children, justify}: Props) => {
    return (
        <div className={`buttonBlock ${justify}`}>
            {children}
        </div>
    )
}