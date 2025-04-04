import { Component } from './component';
import {
  AttributeManager,
  EventHandler,
  EventManager,
  LifecycleManager,
  PropsManager,
  StateManager,
} from './managers';
import { Prototype } from './prototype';

export type ElementType = string | Prototype<any> | Component | symbol;
export type ElementChild = string | number | boolean | null | undefined | Element | VirtualElement;

export type ElementChildren = ElementChild | ElementChild[];

export interface VirtualElement {
  type: ElementType;
  props: ElementProps;
  children: ElementChildren[];
  key?: string | number;
}
export interface ElementProps {
  // 基础属性
  id?: string;
  class?: string | Record<string, boolean> | (string | Record<string, boolean>)[];
  style?: string | Partial<CSSStyleDeclaration> | Record<string, string | number>;

  // 事件处理
  on?: Record<string, EventHandler | EventHandler[]>;

  // 生命周期钩子
  hook?: {
    created?: () => void;
    mounted?: () => void;
    updated?: () => void;
    unmounted?: () => void;
  };

  // 其他属性
  [key: string]: any;
}

export interface RendererContext {
  eventManager: EventManager;
  attributeManager: AttributeManager;
  lifecycleManager: LifecycleManager;
  stateManager: StateManager;
  propsManager: PropsManager<any>;
}

export interface RendererAPI {
  createElement(
    type: ElementType,
    props?: ElementProps,
    children?: ElementChildren[]
  ): Element | VirtualElement;

  createText(content: string): Text | VirtualElement;
  createComment(content: string): Comment | VirtualElement;
  readonly Fragment: symbol;
}
