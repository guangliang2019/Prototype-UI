import {
  attributeListeners,
  connectedCallbacks,
  createdCallbacks,
  disconnectedCallbacks,
  handleRequestContext,
  initProps,
  listenKeys,
  provideKeys,
  requestContext,
} from '../constants';
import { ContextManager } from '../context';
import { Component, Constructor, Prototype } from '../interface';

export type WebComponent<Props extends object> = HTMLElement & Component<Props>;

export const WebComponentAdapter = <Props extends Record<string, any> = {}>(
  prototypeConstructor: Constructor<Prototype<Props>>
): Constructor<WebComponent<Props>> => {
  const staticPrototype = new prototypeConstructor({});
  
  return class WebComponent extends HTMLElement {
    prototypeRef: Prototype<Props> = null as any;

    constructor(args: any) {
      super();
      const prototype = new prototypeConstructor(args);
      this.prototypeRef = prototype;
      prototype.componentRef = this as any;
      console.log(this);
      prototype[initProps] = args;
      prototype[createdCallbacks].forEach((callback) => callback());
    }

    connectedCallback() {
      const prototype = this.prototypeRef;
      console.log(prototype);
      prototype[listenKeys].forEach((key) => {
        prototype[requestContext](key);
      });
      prototype[connectedCallbacks].forEach((callback) => callback());
      // 如果该组件有提供上下文，则注册到上下文管理器
      if (prototype[provideKeys].size > 0) {
        this.addEventListener('request-context', prototype[handleRequestContext] as EventListener);
        ContextManager.getInstance().addProvider(prototype);
      }
    }

    disconnectedCallback() {
      const prototype = this.prototypeRef;
      prototype[disconnectedCallbacks].forEach((callback) => callback());
      if (prototype[provideKeys].size > 0) {
        ContextManager.getInstance().removeProvider(prototype);
      }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      const prototype = this.prototypeRef;
      if (prototype[attributeListeners].has(name)) {
        prototype[attributeListeners]
          .get(name)
          ?.forEach((callback) => callback(oldValue, newValue));
      }
    }

    adoptedCallback() {}

    static get observedAttributes() {
      console.log(Array.from(staticPrototype[attributeListeners].keys()), 'observedAttributes');
      return Array.from(staticPrototype[attributeListeners].keys());
    }

    update(): void {}

    render(): void {}
  };
};
