// export behaviors
export { default as asSelect } from './select';
export { default as asSelectTrigger } from './select-trigger';
export { default as asSelectContent } from './select-content';
export { default as asSelectItem } from './select-item';
export { default as asSelectValue } from './select-value';

// export types
export type {
  // context
  SelectContextType,
  // props
  SelectProps,
  SelectValueProps,
  SelectContentProps,
  SelectItemProps,
  SelectTriggerProps,
  // exposes
  SelectExposes,
  SelectValueExposes,
  SelectContentExposes,
  SelectItemExposes,
  SelectTriggerExposes,
} from './interface';

// export context key
export { SelectContext } from './interface';
