import { ElementCommands } from './element';
import { EventCommands } from './event';
import { Context, State } from './managers';
import {
  ElementChildren,
  ElementProps,
  ElementType,
  RendererAPI,
  VirtualElement,
} from './renderer';

/**
 * 可以通过属性监听的类型
 */
export type AttributeValue = string | number | boolean;

/**
 * 原型钩子接口
 */
export interface PrototypeHooks<Props = any> {
  /** 创建时的回调 */
  useCreated(callback: () => void): void;
  /** 销毁时的回调 */
  useDestroyed(callback: () => void): void;
  /** 挂载时的回调 */
  useMounted(callback: () => void): void;
  /** 卸载时的回调 */
  useUnmounted(callback: () => void): void;
  /** 更新时的回调 */
  useUpdated(callback: () => void): void;

  /**
   * 将组件标记为 trigger
   * 标记后，该组件的所有事件都会被代理到最内层的 trigger
   */
  markAsTrigger(): void;

  /** 监听属性变化 */
  watchAttribute<T = any>(name: string, callback: (oldValue: T, newValue: T) => void): void;

  /**
   * 创建状态
   * @param initial 初始值
   * @param attribute 如果提供且值类型合适，状态会同步到对应的 attribute
   * @param options 可选配置
   */
  useState<T>(
    initial: T,
    attribute?: string,
    options?: {
      serialize?: (value: T) => string;
      deserialize?: (value: string) => T;
    }
  ): State<T>;

  /**
   * 监听状态变化
   * @param state 要监听的状态
   * @param callback 变更回调
   */
  watchState<T>(state: State<T>, callback: (newValue: T, oldValue: T) => void): void;

  /**
   * 定义参数
   * @param defaultProps 默认参数
   */
  defineProps(defaultProps: Props): void;

  /**
   * 监听属性变化
   * @param props 要监听的属性列表
   * @param callback 变更回调
   */
  watchProps(props: (keyof Props)[], callback: (changedProps: Partial<Props>) => void): void;

  /** 创建元素 */
  h(
    type: ElementType,
    props?: ElementProps,
    children?: ElementChildren[]
  ): Element | VirtualElement;

  /**
   * 提供 context
   * @param context Context 定义
   * @param initialValue 初始值或初始值构造函数
   */
  provideContext<T>(
    context: Context<T>,
    initialValue: T | ((update: (value: Partial<T>, notify?: boolean) => void) => T)
  ): void;

  /**
   * 监听 context 变化
   * @param context Context 定义
   * @param callback 变更回调
   */
  watchContext<T>(context: Context<T>, callback?: (value: T, changedKeys: string[]) => void): void;

  /**
   * 获取当前 context 值
   * 注意：这个函数只能在已经建立订阅关系后使用
   * @param context Context 定义
   */
  getContext<T>(context: Context<T>): T;

  /**
   * 获取当前的 props 值
   * 注意：此钩子会返回最新的 props 值，包括通过 setAttribute 等方式设置的值
   */
  getProps(): Props;

  /**
   * 元素工具类
   */
  element: ElementCommands;

  /**
   * 事件工具类
   */
  event: EventCommands;
}

export interface PrototypeAPI<Props> {
  props: {
    define: (props: Props) => void;
    set: (props: Partial<Props>) => void;
    get: () => Props;
    watch: (props: (keyof Props)[], callback: (props: Props) => void) => void;
  };

  state: {
    define: <T>(state: Record<string, State<T>>) => State<T>;
    watch: <T>(state: State<T>, callback: (state: T) => void) => void;
  };

  event: EventCommands;

  view: {
    // 渲染调度相关
    update: (callback: () => void) => Promise<void>;
    forceUpdate: () => Promise<void>;
    // 元素相关
    getElement: () => HTMLElement;
    insertElement: (list: HTMLElement[], element?: HTMLElement) => void;
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
    watch: <T>(context: Context<T>, listener: (value: T, changedKeys: string[]) => void) => void;
    get: <T>(context: Context<T>) => T;
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
  setup: (hooks: PrototypeHooks<Props>) => void;
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
  hooks: PrototypeHooks<Props>
) => PrototypeSetupResult<Props> | void;
