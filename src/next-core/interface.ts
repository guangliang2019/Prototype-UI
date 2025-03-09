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
 * 原型设置函数
 */
export type PrototypeSetup<Props = Record<string, any>> = (hooks: PrototypeHooks<Props>) => unknown;

/**
 * 组件原型
 */
export interface Prototype<Props = Record<string, any>> {
  /** 配置项 */
  readonly options: PrototypeOptions<Props>;
  /** 设置函数 */
  readonly setup: PrototypeSetup<Props>;
}
