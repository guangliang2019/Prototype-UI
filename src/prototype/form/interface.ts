export interface PrototypeFormProps<T> {
  onSubmit?: (data: T) => void;
  validators?: Record<string, (data: T) => boolean>;
}

export interface PrototypeFormItem {
  key: string;
}

export interface FormContext<T> {
  data: T;
  submit: () => void;
  validate: () => boolean;
}

export interface FormItemContext {
  key: string;
  changeFormItemValue: (value: unknown) => void;
}
