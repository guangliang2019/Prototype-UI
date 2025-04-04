import { ElementCommands } from './element';
import { EventCommands } from './event';
import { Context, State } from './managers';
import { RendererAPI } from './renderer';

/**
 * 可以通过属性监听的类型
 */
export type AttributeValue = string | number | boolean;

export interface PrototypeAPI<Props> {
  props: {
    define: (props: Props) => void;
    set: (props: Partial<Props>) => void;
    get: () => Props;
    watch: (props: (keyof Props)[], callback: (props: Props) => void) => void;
  };

  state: {
    define: <T>(
      initial: T,
      attributeName?: string,
      options?: {
        serialize?: (value: T) => string;
        deserialize?: (value: string) => T;
      }
    ) => State<T>;
    watch: <T>(state: State<T>, callback: (oldValue: T, newValue: T) => void) => void;
  };

  event: EventCommands;

  view: {
    // 渲染调度相关
    update: () => Promise<void>;
    forceUpdate: () => Promise<void>;
    // 元素相关
    getElement: () => HTMLElement;
    insertElement: (list: HTMLElement[], element?: HTMLElement, index?: number) => number;
    compareElementPosition: (target: HTMLElement, element?: HTMLElement) => number;
  };

  lifecycle: {
    onCreated: (callback: () => void) => void;
    onMounted: (callback: () => void) => void;
    onUpdated: (callback: () => void) => void;
    onBeforeUnmount: (callback: () => void) => void;
    onBeforeDestroy: (callback: () => void) => void;
  };

  context: {
    provide: <T>(context: Context<T>, value: (update: UpdateContext<T>) => T) => void;
    watch: <T>(context: Context<T>, listener?: (value: T, changedKeys: string[]) => void) => void;
    get: <T>(context: Context<T>) => T;
  };

  role: {
    asTrigger: () => void;
  };
}

export interface UpdateContext<T> {
  (value: Partial<T>, notify?: boolean): void;
}

/**
 * 原型配置项
 */
export interface Prototype<Props> {
  /** 组件名称 */
  displayName?: string;
  /** 可观察的属性 */
  observedAttributes?: string[];

  /**
   * 设置函数
   */
  setup: (p: PrototypeAPI<Props>) => void;
}

/**
 * 原型设置函数的返回值
 */
export interface PrototypeSetupResult<P = Record<string, any>> {
  /**
   * 组件状态
   */
  state?: Record<string, State<any>>;

  /**
   * 组件动作/方法
   */
  actions?: Record<string, (...args: any[]) => any>;

  /**
   * 暴露给外部的接口
   */
  expose?: Record<string, any>;

  /**
   * 渲染函数
   */
  render?: (renderer: RendererAPI) => Element | void;
}

/**
 * 原型设置函数
 */
export type PrototypeSetup<Props = Record<string, any>> = (
  p: PrototypeAPI<Props>
) => PrototypeSetupResult<Props> | void;
