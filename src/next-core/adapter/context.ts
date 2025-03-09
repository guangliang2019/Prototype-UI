import type { ComponentInstance, ComponentTreeWalker, ContextEventHandler } from './interface';

export interface ContextOptions<T> {
  /**
   * 是否允许 consumer 在初次订阅时修改 context
   * 这在一些特殊场景下很有用，比如 consumer 需要向 context 中注入自己的能力
   */
  allowConsumerModify?: boolean;
}

export interface Context<T> {
  readonly key: symbol;
  readonly defaultValue: T;
  readonly options: ContextOptions<T>;
}

/**
 * 创建一个 Context 定义
 */
export function defineContext<T>(defaultValue: T, options: ContextOptions<T> = {}): Context<T> {
  return {
    key: Symbol('context'),
    defaultValue,
    options,
  };
}

/**
 * Context 管理器，负责处理 provider 和 consumer 之间的关系
 */
export class ContextManager {
  private static instance: ContextManager;
  private constructor(
    private treeWalker: ComponentTreeWalker,
    private eventHandler: ContextEventHandler
  ) {
    // 监听 context 请求事件
    this.setupContextRequestListener();
  }

  static init(treeWalker: ComponentTreeWalker, eventHandler: ContextEventHandler): void {
    if (!this.instance) {
      this.instance = new ContextManager(treeWalker, eventHandler);
    }
  }

  static getInstance(): ContextManager {
    if (!this.instance) {
      throw new Error(
        'ContextManager not initialized. ' + 'Please call ContextManager.init() first.'
      );
    }
    return this.instance;
  }

  // provider -> context value map
  private providerMap = new WeakMap<ComponentInstance, Map<symbol, any>>();

  // consumer -> provider map
  private consumerMap = new WeakMap<ComponentInstance, Map<symbol, ComponentInstance>>();

  // provider -> consumers set map
  private subscriberMap = new WeakMap<ComponentInstance, Map<symbol, Set<ComponentInstance>>>();

  private setupContextRequestListener(): void {
    this.eventHandler.listenRequestContext(
      // 这里传入 null 是因为我们需要监听所有组件的请求
      null as any,
      ({ contextKey, consumer }) => {
        // 找到最近的 provider
        let current = this.treeWalker.getParent(consumer);
        while (current) {
          if (this.providerMap.get(current)?.has(contextKey)) {
            this.registerConsumer(consumer, current, contextKey);
            break;
          }
          current = this.treeWalker.getParent(current);
        }
      }
    );
  }

  /**
   * 注册一个 provider
   */
  registerProvider<T>(provider: ComponentInstance, context: Context<T>, value: T): void {
    if (!this.providerMap.has(provider)) {
      this.providerMap.set(provider, new Map());
    }
    this.providerMap.get(provider)!.set(context.key, value);

    if (!this.subscriberMap.has(provider)) {
      this.subscriberMap.set(provider, new Map());
    }
    if (!this.subscriberMap.get(provider)!.has(context.key)) {
      this.subscriberMap.get(provider)!.set(context.key, new Set());
    }

    // 通知子树中的所有节点重新请求 context
    this.notifySubtreeToRequestContext(provider, context.key);
  }

  /**
   * 通知子树中的节点重新请求 context
   */
  private notifySubtreeToRequestContext(provider: ComponentInstance, contextKey: symbol): void {
    const queue = this.treeWalker.getChildren(provider);
    while (queue.length > 0) {
      const current = queue.shift()!;

      // 如果遇到了另一个提供相同 context 的 provider，
      // 则不继续遍历其子树
      if (current !== provider && this.providerMap.get(current)?.has(contextKey)) {
        continue;
      }

      // 如果当前节点是一个 consumer，触发重新请求
      if (this.consumerMap.get(current)?.has(contextKey)) {
        this.dispatchContextRequest(current, contextKey);
      }

      // 将子节点加入队列
      queue.push(...this.treeWalker.getChildren(current));
    }
  }

  /**
   * 注册一个 consumer
   */
  registerConsumer(
    consumer: ComponentInstance,
    provider: ComponentInstance,
    contextKey: symbol
  ): void {
    // 如果 consumer 已经有 provider，且不是当前的 provider，
    // 则需要先取消旧的订阅
    const existingProvider = this.consumerMap.get(consumer)?.get(contextKey);
    if (existingProvider && existingProvider !== provider) {
      this.unregisterConsumer(consumer, contextKey);
    }

    if (!this.consumerMap.has(consumer)) {
      this.consumerMap.set(consumer, new Map());
    }
    this.consumerMap.get(consumer)!.set(contextKey, provider);

    const subscribers = this.subscriberMap.get(provider)!.get(contextKey)!;
    subscribers.add(consumer);
  }

  /**
   * 注销一个 provider
   */
  unregisterProvider(provider: ComponentInstance, contextKey: symbol): void {
    const subscribers = this.subscriberMap.get(provider)?.get(contextKey);
    if (subscribers) {
      subscribers.forEach((consumer) => {
        this.consumerMap.get(consumer)?.delete(contextKey);
        // 触发重新寻找 provider
        this.eventHandler.dispatchRequestContext(consumer, contextKey);
      });
      this.subscriberMap.get(provider)?.delete(contextKey);
    }
    this.providerMap.get(provider)?.delete(contextKey);
  }

  /**
   * 注销一个 consumer
   */
  unregisterConsumer(consumer: ComponentInstance, contextKey: symbol): void {
    const provider = this.consumerMap.get(consumer)?.get(contextKey);
    if (provider) {
      this.subscriberMap.get(provider)?.get(contextKey)?.delete(consumer);
      this.consumerMap.get(consumer)?.delete(contextKey);
    }
  }

  /**
   * 获取 context 值
   */
  getValue<T>(provider: ComponentInstance, context: Context<T>): T {
    return this.providerMap.get(provider)?.get(context.key) ?? context.defaultValue;
  }

  /**
   * 设置 context 值并通知所有订阅者
   */
  setValue<T>(
    provider: ComponentInstance,
    context: Context<T>,
    partialValue: Partial<T>,
    notify: boolean = true
  ): void {
    if (!this.providerMap.has(provider)) return;

    const currentValue = this.getValue(provider, context);
    const newValue = { ...currentValue, ...partialValue } as T;
    this.providerMap.get(provider)!.set(context.key, newValue);

    if (notify) {
      const subscribers = this.subscriberMap.get(provider)?.get(context.key);
      if (subscribers) {
        const changedKeys = this.getChangedKeys(currentValue, newValue);
        subscribers.forEach((consumer) => {
          if (consumer.contextChanged) {
            consumer.contextChanged(context.key, newValue, changedKeys);
          }
        });
      }
    }
  }

  /**
   * 获取 consumer 对应的 provider
   */
  getProvider(consumer: ComponentInstance, contextKey: symbol): ComponentInstance | undefined {
    return this.consumerMap.get(consumer)?.get(contextKey);
  }

  /**
   * 发送 context 请求事件
   */
  dispatchContextRequest(consumer: ComponentInstance, contextKey: symbol): void {
    this.eventHandler.dispatchRequestContext(consumer, contextKey);
  }

  private getChangedKeys(oldValue: any, newValue: any): string[] {
    if (oldValue === newValue) return [];
    if (!oldValue || !newValue) return Object.keys(newValue || oldValue);

    const changedKeys: string[] = [];
    const allKeys = new Set([...Object.keys(oldValue), ...Object.keys(newValue)]);

    allKeys.forEach((key) => {
      if (oldValue[key] !== newValue[key]) {
        changedKeys.push(key);
      }
    });

    return changedKeys;
  }
}
