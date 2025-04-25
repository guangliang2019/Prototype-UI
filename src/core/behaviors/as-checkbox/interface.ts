import { State } from '@/core/interface';
import { ButtonProps, ButtonExposes } from '../as-button';
import { createContext } from '@/core/adapters/web/context-center';

// Checkbox属性接口
export interface CheckboxProps extends ButtonProps {
    // 基础属性
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    id?: string;
    onCheckedChange?: (checked: boolean) => void;
    indeterminate?: boolean;
}

// Checkbox状态接口
export interface CheckboxState {
    checked: State<boolean>;
    indeterminate: State<boolean>;
    disabled: State<boolean>;
}

export interface CheckboxExposes extends ButtonExposes {}

// Checkbox上下文类型
export interface CheckedContextType {
    checked: State<boolean>;
    disabled: State<boolean>;
    indeterminate: State<boolean>;
    id: State<string>;
    required: State<boolean>;
}

// 创建Checkbox上下文
export const CheckboxContext = createContext<CheckedContextType>('checkbox-context');

// 默认属性
export const CHECKBOX_DEFAULT_PROPS: Partial<CheckboxProps> = {
    disabled: false,
    required: false,
    indeterminate: false,
};