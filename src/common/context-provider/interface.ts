import ContextConsumer from './context-consumer';

export interface RequestContextEventDetail<T extends Object> {
  key: string;
  consumer: ContextConsumer<T>;
}

export interface ContextConsumerProps<T> {
  onContextChange: (value: T) => void;
  readonly contextValue: T;
  readonly key: string;
}

export interface ContextProviderProps<T> {
  readonly key: string;
  readonly contextValue: T;
  setContext: (value: T) => void;
}
