import ContextConsumer from './consumer';

export interface RequestContextEventDetail<T extends Record<string, Object>> {
  key: keyof T;
  consumer: ContextConsumer<T>;
}

export interface ContextConsumerProps<T extends Record<string, Object>> {
  addContextListener: <K extends keyof T>(
    key: K,
    listener: (value: T[K], changedKeys: (keyof T[K])[]) => void
  ) => void;
  removeContextListener: <K extends keyof T>(
    key: K,
    listener: (value: T[K], changedKeys: (keyof T[K])[]) => void
  ) => void;
  readonly contextValues: Object;
  readonly consumerKeys: (keyof T)[];
}

export interface ContextProviderProps<
  TProvider extends Record<string, Object>,
  TConsumer extends Record<string, Object>
> {
  readonly providerKeys: (keyof TProvider)[];
  readonly provideValues: TProvider;
  readonly contextValues: TConsumer;
  setContext: <K extends keyof TProvider>(key: K, value: TProvider[K]) => void;
}
