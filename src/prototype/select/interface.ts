import PrototypeSelect from './select';
import PrototypeSelectContent from './select-content';
import PrototypeSelectItem from './select-item';
import PrototypeSelectTrigger from './select-trigger';
import PrototypeSelectValue from './select-value';

export interface PrototypeSelectProps {
  defaultValue?: string;
}

export interface SelectItemProps {
  value: string;
}

export interface SelectValueProps {
  renderValue: (value: string) => HTMLElement | string;
}

export interface PrototypeSelectContext extends Record<string, Object> {
  'prototype-select': {
    index: number;
    value: string;

    width: number;

    focused: boolean;
    focus: () => void;

    open: () => void;
    close: () => void;

    items: string[];
    defaultValue: string;
    changeValue: (value: string, focus?: boolean) => void;

    selecting: boolean;

    rootRef: PrototypeSelect<any>;
    triggerRef: PrototypeSelectTrigger<any>;
    itemsRefs: PrototypeSelectItem<any>[];
    valueRef: PrototypeSelectValue<any>;
    contentRef: PrototypeSelectContent<any>;
  };
}
