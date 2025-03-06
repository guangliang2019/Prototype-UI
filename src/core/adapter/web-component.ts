import {
  attributeListeners,
  connectedCallbacks,
  createdCallbacks,
  disconnectedCallbacks,
  handleRequestContext,
  initProps,
  listenKeys,
  listenValues,
  provideKeys,
  requestContext,
} from '../constants';
import { ContextManager } from '../context';
import { Component, Constructor, Prototype } from '../interface';

export type WebComponent<Props extends object> = HTMLElement &
  Component<Props> & {
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    adoptedCallback(): void;
  } & Props;

export const WebComponentAdapter = <Props extends Record<string, any> = {}>(
  prototypeConstructor: Constructor<Prototype<Props>>
): Constructor<WebComponent<Props>> => {
  const staticPrototype = new prototypeConstructor({});

  return class WebComponent extends HTMLElement {
    prototypeRef: Prototype<Props> = null as any;
    content: HTMLElement | null = null;
    _props: Props = {} as Props;

    constructor(args: any) {
      super();
      const prototype = new prototypeConstructor(args);
      this.prototypeRef = prototype;
      prototype.componentRef = this as any;
      prototype[initProps] = args;
      prototype[createdCallbacks].forEach((callback) => callback());
    }

    get props() {
      return this._props;
    }

    get context() {
      return this.prototypeRef[listenValues];
    }

    connectedCallback() {
      const prototype = this.prototypeRef;
      prototype[listenKeys].forEach((key) => {
        prototype[requestContext](key);
      });
      prototype[connectedCallbacks].forEach((callback) => callback());
      // 如果该组件有提供上下文，则注册到上下文管理器
      if (prototype[provideKeys].size > 0) {
        this.addEventListener('request-context', prototype[handleRequestContext] as EventListener);
        ContextManager.getInstance().addProvider(prototype);
      }
      this.render();
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
      return Array.from(staticPrototype[attributeListeners].keys());
    }

    update(): void {}

    render(): void {
      const prototype = this.prototypeRef;
      if (!prototype.render) return;
      if (!this.content) {
        this.content = prototype.render(h);
        if (!this.content) return;
        this.appendChild(this.content);
      } else {
        const newContent = prototype.render(h);
        if (!newContent) return;
        this.content.replaceWith(newContent);
        this.content = newContent;
      }
    }
  } as unknown as Constructor<WebComponent<Props>>;
};

type Props = {
  [key: string]: any;
  children?: (Node | string)[];
};

export function h<T extends HTMLElement>(
  tag: string,
  props: Props = {},
  children: (Node | string)[] = []
): T | null {
  const element = document.createElement(tag) as T;

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key !== 'children') {
        if (key.slice(0, 2) === 'on') {
          // @ts-ignore
          element[key] = value;
        } else {
          element.setAttribute(key, value as string);
        }
      }
    });
  }

  const fragment = document.createDocumentFragment();

  children.forEach((child) => {
    if (typeof child === 'string') {
      fragment.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      fragment.appendChild(child);
    }
  });

  element.appendChild(fragment);

  return element;
}
