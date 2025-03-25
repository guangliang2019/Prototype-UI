import { DataState } from "@/core/interface";

export interface SwitchProps {
  onChange?: (e: CustomEvent) => void;
  disabled?: boolean;
  checked?: boolean;
  label?: string;
}

export interface SwitchContext {
  checked: DataState<boolean>;
  disabled: DataState<boolean>;
}
