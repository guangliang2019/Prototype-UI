import { PrototypeScrollAreaContext } from '@/components/prototype/scroll-area';

export interface ShadcnScrollAreaContext extends PrototypeScrollAreaContext {
  'shadcn-scroll-area': {
    verticalScrollBarRef: HTMLElement;
    horizontalScrollBarRef: HTMLElement;

    updateRef: (name: 'verticalScrollBarRef' | 'horizontalScrollBarRef', ref: HTMLElement) => void;
  };
}
