import { Prototype } from '../interface';
import type { EventManager } from '../interface';

/**
 * Props 的基本类型定义
 */
export type PropType = string | number | boolean | object | Function;

/**
 * Props 管理器接口
 */
export interface PropsManager<T extends Record<string, PropType> = any> {
  /**
   * 获取当前的 props
   */
  getProps(): T;

  /**
   * 更新 props
   * @param props 要更新的 props
   */
  setProps(props: Partial<T>): void;

  /**
   * 序列化 prop 到 attribute
   * @param name prop 名称
   * @param value prop 值
   */
  serializeToAttribute(name: keyof T, value: T[keyof T]): string | null;

  /**
   * 从 attribute 反序列化到 prop
   * @param name attribute 名称
   * @param value attribute 值
   */
  deserializeFromAttribute(name: string, value: string): any;

  /**
   * 监听 props 变化
   * @param callback 变化回调
   * @returns 取消监听的函数
   */
  onPropsChange(callback: (props: T) => void): () => void;
}

/**
 * 适配器接口
 * 定义了将原型转换为具体组件实现所需的基本结构
 */
export interface Adapter<Source extends Prototype = Prototype, Target = unknown> {
  /** 适配器名称 */
  readonly name: string;

  /**
   * 将原型转换为目标平台的组件
   * @param prototype 组件原型
   */
  adapt(prototype: Source): Target;
}

/**
 * 生命周期管理器接口
 */
export interface LifecycleManager {
  /** 添加回调 */
  add(type: string, callback: () => void): void;
  /** 触发回调 */
  trigger(type: string): void;
  /** 清理回调 */
  clear(type?: string): void;
  /** 检查生命周期是否已触发 */
  hasTriggered(type: string): boolean;
}

/**
 * 属性管理器接口
 */
export interface AttributeManager {
  /** 添加属性监听 */
  watch(name: string, callback: (oldValue: any, newValue: any) => void): void;
  /** 获取所有被监听的属性 */
  getObservedAttributes(): string[];
  /** 处理属性变化 */
  handleChange(name: string, oldValue: any, newValue: any): void;
}

/**
 * 状态对象接口
 */
export interface State<T> {
  /** 当前值 */
  readonly value: T;
  /** 设置新值 */
  set(value: T): void;
}

/**
 * 状态管理器接口
 */
export interface StateManager {
  /**
   * 创建一个状态
   * @param initial 初始值
   * @param attribute 如果提供且值类型合适，状态会同步到对应的 attribute
   * @param options 可选配置
   */
  useState<T>(
    initial: T,
    attribute?: string,
    options?: {
      /** 自定义序列化 */
      serialize?: (value: T) => string;
      /** 自定义反序列化 */
      deserialize?: (value: string) => T;
    }
  ): State<T>;

  /**
   * 获取组件当前的公开状态
   * 只读，类似于 dataset
   */
  getStates(): Readonly<Record<string, any>>;

  /** 清理所有状态 */
  clear(): void;
}

/**
 * 渲染管理器接口
 */
export interface RenderManager {
  /** 创建元素 */
  createElement(type: string, props: any, ...children: any[]): unknown;

  /** 请求一次渲染，可以被批处理 */
  requestRender(): void;

  /** 强制立即渲染 */
  forceRender(): void;

  /** 更新渲染内容 */
  update(content: unknown): void;

  /** 清理渲染内容 */
  clear(): void;
}

/**
 * 组件实例接口
 */
export interface Component {
  /**
   * 组件的渲染元素
   */
  readonly element: Element;

  /**
   * 事件管理器
   */
  readonly eventManager: EventManager;

  /**
   * 属性管理器
   */
  readonly props: PropsManager;

  /**
   * 状态管理器
   */
  readonly state: StateManager;

  /**
   * Context 变更回调
   */
  contextChanged?: (key: symbol, value: any, changedKeys: string[]) => void;

  /**
   * 销毁组件
   */
  destroy(): void;
}

/**
 * 组件树遍历器
 * 不同框架可以提供不同的实现
 */
export interface ComponentTreeWalker {
  /**
   * 获取父组件
   */
  getParent(instance: Component): Component | null;

  /**
   * 获取子组件列表
   */
  getChildren(instance: Component): Component[];

  /**
   * 判断是否是组件实例
   */
  isComponent(element: any): element is Component;
}

/**
 * Context 事件处理
 */
export interface ContextEventHandler {
  /**
   * 发送 Context 请求事件
   */
  dispatchRequestContext(instance: Component, contextKey: symbol): void;

  /**
   * 监听 Context 请求事件
   */
  listenRequestContext(
    instance: Component,
    callback: (event: { contextKey: symbol; consumer: Component }) => void
  ): () => void;
}
