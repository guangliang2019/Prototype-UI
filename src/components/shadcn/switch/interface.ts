import { SwitchProps } from '@/core/behaviors/as-switch';


export interface ShadcnSwitchProps extends SwitchProps {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    autoFocus?: boolean;
    className?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    name?: string;
    required?: boolean;
    value?: string;
}


export const SHADCN_SWITCH_DEFAULT_PROPS: Partial<ShadcnSwitchProps> = {
    disabled: false,
    value: 'on', 
};
