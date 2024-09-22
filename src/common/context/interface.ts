import ContextConsumer from './contextConsumer';

export interface RequestContextEventDetail<T extends Object> {
  key: string;
  consumer: ContextConsumer<T>;
}

export interface ContextConsumerProps<T> {
  onContextChange: (value: T) => void;
  readonly contextValue: T;
  readonly consumerKey: string;
}

export interface ContextProviderProps<T, U> {
  readonly providerKey: string;
  readonly provideValue: T;
  readonly contextValue: U;
  setContext: (value: T) => void;
}
