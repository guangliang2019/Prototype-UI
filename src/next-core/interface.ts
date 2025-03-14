import type { Context } from './adapter/context';
import type { State } from './adapter/interface';

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
   * 注册事件监听器
   * @param eventName 事件名称
   * @param handler 事件处理器
   * @param options 事件选项
   */
  useEvent<T = any>(
    eventName: string,
    handler: EventHandler<T>,
    options?: EventOptions
  ): void;

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param detail 事件详情
   */
  emitEvent<T = any>(eventName: string, detail: T): void;

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
  onStateChange<T>(state: State<T>, callback: (newValue: T, oldValue: T) => void): void;

  /**
   * 监听属性变化
   * @param props 要监听的属性列表
   * @param callback 变更回调
   */
  onPropsChange(props: (keyof Props)[], callback: (changedProps: Partial<Props>) => void): void;

  /** 创建元素 */
  h(type: string, props?: any, ...children: any[]): unknown;

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
  watchContext<T>(context: Context<T>, callback?: (value: T, changedKeys: string[]) => void): T;

  /**
   * 获取当前 context 值
   * 注意：这个函数只能在已经建立订阅关系后使用
   * @param context Context 定义
   */
  getContext<T>(context: Context<T>): T;

  /**
   * 获取组件实例
   * 注意：此钩子只能在 mounted 之后的生命周期中使用
   */
  getInstance(): HTMLElement;

  /**
   * 获取当前的 props 值
   * 注意：此钩子会返回最新的 props 值，包括通过 setAttribute 等方式设置的值
   */
  getProps(): Props;
}

/**
 * 原型配置项
 */
export interface PrototypeOptions<Props = Record<string, any>> {
  /** 组件名称 */
  displayName?: string;
  /** 默认属性 */
  defaultProps?: Partial<Props>;
  /** 可观察的属性 */
  observedAttributes?: string[];
}

/**
 * 渲染器 API 接口
 */
export interface RendererAPI {
  /**
   * 创建元素
   * @param tag 标签名或组件
   * @param props 属性
   * @param children 子元素
   */
  createElement: (tag: string | Function, props?: any, children?: any[]) => Element;

  /**
   * 创建文本节点
   * @param content 文本内容
   */
  createText: (content: string) => Text;

  /**
   * 创建注释节点
   * @param content 注释内容
   */
  createComment: (content: string) => Comment;
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
  render?: (h: RendererAPI) => Element;
}

/**
 * 原型设置函数
 */
export type PrototypeSetup<Props = Record<string, any>> = (
  hooks: PrototypeHooks<Props>
) => PrototypeSetupResult<Props> | void;

/**
 * 组件原型
 */
export interface Prototype<Props = Record<string, any>> {
  /** 配置项 */
  readonly options: PrototypeOptions<Props>;
  /** 设置函数 */
  readonly setup: PrototypeSetup<Props>;
}

/**
 * 事件处理器类型
 */
export type EventHandler<T = any> = (event: T) => void;

/**
 * 事件选项
 */
export interface EventOptions {
  once?: boolean;
  capture?: boolean;
  passive?: boolean;
}

/**
 * 事件管理器接口
 */
export interface EventManager {
  /**
   * 注册事件监听器
   */
  on<T = any>(eventName: string, handler: EventHandler<T>, options?: EventOptions): void;

  /**
   * 移除事件监听器
   */
  off<T = any>(eventName: string, handler: EventHandler<T>): void;

  /**
   * 触发事件
   */
  emit<T = any>(eventName: string, detail: T): void;

  /**
   * 注册一次性事件监听器
   */
  once<T = any>(eventName: string, handler: EventHandler<T>): void;

  /**
   * 清除所有事件监听器
   */
  clearAll(): void;

  /**
   * 将组件标记为 trigger
   */
  markAsTrigger(): void;

  /**
   * 组件挂载时调用
   */
  mount(): void;

  /**
   * 组件卸载时调用
   */
  unmount(): void;

  /**
   * 销毁事件管理器
   */
  destroy(): void;
}
