export interface SwitchProps {
    onClick?: (e: Event) => void;
    disabled?: boolean;
    readonly autoFocus?: boolean;
    checked?: boolean;
}