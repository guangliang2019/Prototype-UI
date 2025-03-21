export interface SwitchProps {
    onChange?: (e: CustomEvent) => void;
    disabled?: boolean;
    checked?: boolean;
    label?: string;
}