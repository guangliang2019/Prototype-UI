export interface PrototypeFormProps<T extends Object> {
  onSubmit?: (data: T) => void;
  validators?: Record<string, (data: T) => boolean>;
}

export interface PrototypeFormItem {
  key: string;
}

export interface FormContext<T extends Object> extends Record<string, Object> {
  'prototype-form': {
    data: T;
    submit: () => void;
    validate: () => boolean;

    changeData: (key: keyof T, value: T[keyof T]) => void;
  };
};

export interface PrototypeFormItemContext extends Record<string, Object> {
  'prototype-form-item': {
    key: string;
    changeFormItemValue: (value: any) => void;
  };
}
