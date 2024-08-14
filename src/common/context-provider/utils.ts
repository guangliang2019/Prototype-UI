import ContextConsumer from './context-consumer';
import ContextProvider from './context-provider';

export const createContext = <T extends Object>(
  key: string,
  defaultContextBuilder: (setContext: (value: Partial<T>) => void) => T,
  el: HTMLElement
) => {
  const Provider = new ContextProvider<T>();
  Provider.setAttribute('key', key);
  Provider?.setContext(defaultContextBuilder(Provider.setContext.bind(Provider)), false);

  while (el.firstChild) Provider.appendChild(el.firstChild);
  el.appendChild(Provider);
  return Provider;
};

export const useContext = <T extends Object>(key: string, el: HTMLElement) => {
  const consumer = new ContextConsumer<T>();
  consumer.setAttribute('key', 'headless-tab');

  while (el.firstChild) consumer.appendChild(el.firstChild);
  el.appendChild(consumer);

  return consumer;
};
