// import { Component } from './component';
import {
  AttributeManager,
  EventHandler,
  EventManager,
  LifecycleManager,
  PropsManager,
  StateManager,
} from './managers';
import { Prototype } from './prototype';

export type ElementType = string | Prototype<any> | symbol;
export type ElementChild = string | number | boolean | null | undefined | Element;

export type ElementChildren = ElementChild | ElementChild[];

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

export interface RendererAPI<El = Element> {
  createElement(type: ElementType, props?: ElementProps, children?: ElementChildren): El;

  createText(content: string): Text;
  createComment(content: string): Comment;
  createFragment(children?: ElementChildren[]): El;
}
