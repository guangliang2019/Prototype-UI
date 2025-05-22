import { createContext } from '@/core/adapters/web/context-center';
import { State } from '@/core/interface';

// 基础 Props 接口
export interface SliderProps {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
}

// 扩展 Props 接口
export interface SliderTrackProps {
    disabled?: boolean;
}

export interface SliderThumbProps {
    disabled?: boolean;
}

export interface SliderRangeProps {
    disabled?: boolean;
}

// Exposes 接口
export interface SliderExposes {
    focus: () => void;
    blur: () => void;
}

export interface SliderTrackExposes { }
export interface SliderThumbExposes {
    focus: () => void;
    blur: () => void;
}
export interface SliderRangeExposes { }

// Context 相关定义
export interface SliderContextType {
    value: number;
    min: number;
    max: number;
    step: number;
    disabled: boolean;
    dragging: State<boolean>;
    focused: State<boolean>;
    rootRef: HTMLElement;
    trackRef: HTMLElement;
    thumbRef: HTMLElement;
    updateValue: (value: number) => void;
    focus: () => void;
    blur: () => void;
}

export const SliderContext = createContext<SliderContextType>('slider');

// 默认值常量
export const DEFAULT_SLIDER_PROPS: SliderProps = {
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
};
