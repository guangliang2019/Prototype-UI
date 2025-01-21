import { PrototypeSelectContext, PrototypeSelectProps } from '@/components/prototype/select/interface';

export interface ShadcnSelectContext extends PrototypeSelectContext {
  'shadcn-select': {
    arrowRef: HTMLElement;
    checkRef: HTMLElement;
    valueRef: HTMLElement;

    updateRef: (name: 'arrowRef' | 'checkRef' | 'valueRef', ref: HTMLElement) => void;
  };
}

export interface ShadcnSelectProps extends PrototypeSelectProps {}
