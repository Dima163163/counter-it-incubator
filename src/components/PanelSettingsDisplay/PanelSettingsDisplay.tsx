import {ReactNode} from "react";

type Props = {
    children: ReactNode
}

export const PanelSettingsDisplay = ({children}: Props) => {
    return (
        <div className="panelSettingsDisplay">
            {children}
        </div>
    )
}