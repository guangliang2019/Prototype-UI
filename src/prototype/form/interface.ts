export interface PrototypeFormProps<T extends Object> {
  onSubmit?: (data: T) => void;
  validators?: Record<string, (data: T) => boolean>;
}

export interface PrototypeFormItem {
  key: string;
}

export interface FormContext<T extends Object> {
  data: T;
  submit: () => void;
  validate: () => boolean;

  changeData: (key: keyof T, value: T[keyof T]) => void;
}

export interface FormItemContext {
  key: string;
  changeFormItemValue: (value: any) => void;
}
