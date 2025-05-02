import { State } from '@/core/interface';
import { ButtonProps, ButtonExposes } from '../as-button';
import { createContext } from '@/core/adapters/web/context-center';


export interface ToggleProps extends ButtonProps {
    pressed?: boolean;         // 受控选中状态
    defaultPressed?: boolean;  // 非受控初始选中状态
    disabled?: boolean;        // 是否禁用
    value?: string;            // 组件值
    name?: string;             // 表单字段名
    required?: boolean;        // 是否为必填项
    onPressedChange?: (press: boolean) => void;
}

export interface ToggleState {
    pressed: State<boolean>;
    disabled: State<boolean>;
}

export interface ToggleExposes extends ButtonExposes {}



export interface ToggleContextType {
    pressed: State<boolean>;
    disabled: State<boolean>;
    hover?:boolean
    value: State<string | undefined>;
    name: State<string | undefined>;
    required: State<boolean>;
    updateRef: (key: string, el: HTMLElement) => void;
    toggleRef?: HTMLElement;
}

export const ToggleContext = createContext<ToggleContextType>('toggle-context');

export const TOGGLE_DEFAULT_PROPS: Partial<ToggleProps> = {
    disabled: false,
    required: false,
    defaultPressed: false,
};

