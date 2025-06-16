/**
 * Props 管理器接口
 */
export interface PropsManager<T extends object> {
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

  /**
   * 定义 props
   * @param defaultProps 默认 props
   * @returns 定义的 props
   */
  defineProps(defaultProps: T): void;
}

/**
 * 生命周期管理器接口
 */
export interface LifecycleManager {
  /** 添加回调 */
  add(type: string, callback: () => void): void;
  /** 触发某个生命周期，并且执行所有回调事件 */
  trigger(type: string): void;
  /** 清理某个生命周期的所有回调 */
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

  /**
   * 同步所有待处理的属性到 DOM
   */
  flushAttributes?(): void;
}

/**
 * 渲染管理器接口
 */
export interface RenderManager {
  /** 请求一次渲染，可以被批处理 */
  requestRender(): void;

  /** 强制立即渲染 */
  forceRender(): void;
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

export interface ContextOptions {
  shared: boolean; // 是否共享内存引用
  mutable: boolean; // 是否允许 Consumer 静默修改
  name?: string; // Context 的标识名称，用于调试
}

export interface Context<T = any> {
  id: symbol;
  options: ContextOptions;
  __type: T; // 用于类型推导
  name: string;
}

export interface ContextManager {
  /**
   * 获取当前组件提供的所有 Context
   */
  getProvidedContexts(): Set<Context>;

  /**
   * 获取当前组件消费的所有 Context
   */
  getConsumedContexts(): Set<Context>;

  /**
   * 提供 Context
   * @param context Context 实例
   * @param value Context 值
   */
  provideContext<T>(context: Context<T>, value: T): void;

  /**
   * 消费 Context
   * @param context Context 实例
   * @param value Context 值
   */
  consumeContext<T>(context: Context<T>): void;

  /**
   * 更新消费的 Context 值
   */
  setConsumedValue<T>(
    context: Context<T>,
    value: T,
    changedKeys: string[],
    notifyListeners?: boolean
  ): void;

  /**
   * 获取当前组件提供的 Context 值
   * @param context Context 实例
   */
  getProvidedValue<T>(context: Context<T>): T | undefined;

  /**
   * 获取当前组件消费的 Context 值
   * @param context Context 实例
   */
  getConsumedValue<T>(context: Context<T>): T | undefined;
}

// 定义视图状态
export enum ViewState {
  NORMAL = 'normal', // 正常状态
  RESTRUCTURING = 'restructuring', // 结构重组中
  INITIALIZING = 'initializing', // 初始化中
  SUSPENDED = 'suspended', // 挂起状态
}
