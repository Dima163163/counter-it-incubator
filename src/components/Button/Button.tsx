type Props = {
    text: string
    onClick: () => void
    disabled?: boolean
}

export const Button = ({text, onClick, disabled}: Props) => {
    return (
        <button className={'button'} onClick={onClick} disabled={disabled}>{text}</button>
    )
}