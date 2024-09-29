import ContextConsumer from './contextConsumer';

export interface RequestContextEventDetail<T extends Record<string, Object>> {
  key: keyof T;
  consumer: ContextConsumer<T>;
}

export interface ContextConsumerProps<T extends Record<string, Object>> {
  onContextChange: <K extends keyof T>(key: K, value: T[K], changedKeys: (keyof T[K])[]) => void;
  readonly contextValues: Object;
  readonly consumerKeys: Set<keyof T>;
}

export interface ContextProviderProps<
  TProvider extends Record<string, Object>,
  TConsumer extends Record<string, Object>
> {
  readonly providerKeys: Set<keyof TProvider>;
  readonly provideValues: TProvider;
  readonly contextValues: TConsumer;
  setContext: <K extends keyof TProvider>(key: K, value: TProvider[K]) => void;
}
