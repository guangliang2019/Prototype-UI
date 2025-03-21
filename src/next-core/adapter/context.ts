import { Component, Context, ContextOptions } from '../interface';
import { getComponent, isComponentRoot } from '../utils/component';

/**
 * 创建新的 Context
 * @param options Context 配置选项
 * @returns Context 实例
 */
export function createContext<T>(name: string, options?: ContextOptions): Context<T> {
  options = options || {
    shared: true,
    mutable: true,
  };
  options.name = name || 'AnonymousContext';

  return {
    id: Symbol(name),
    options,
    __type: null as T,
    displayName: name,
  };
}

interface ProviderEntry {
  consumers: WeakSet<Component>;
  consumersSet: Set<Component>; // 用于遍历
}

interface ConsumerEntry {
  provider: Component;
}

export class WebContextCenter {
  private static instance: WebContextCenter;
  private providerMap: Map<Context, Map<Component, ProviderEntry>> = new Map();
  private consumerMap: Map<Context, WeakMap<Component, Component>> = new Map();
  private pendingUpdates: Set<Component> = new Set();

  private constructor() {}

  static getInstance(): WebContextCenter {
    if (!WebContextCenter.instance) {
      WebContextCenter.instance = new WebContextCenter();
    }
    return WebContextCenter.instance;
  }

  /**
   * 注册 Provider
   * @param component Provider 组件实例
   */
  registerProvider(component: Component): void {
    const providedContexts = component.context.getProvidedContexts();

    providedContexts.forEach((context) => {
      if (!this.providerMap.has(context)) {
        this.providerMap.set(context, new Map());
      }

      const contextProviders = this.providerMap.get(context)!;
      contextProviders.set(component, {
        consumers: new WeakSet(),
        consumersSet: new Set(),
      });
    });

    // 检查是否是中途插入的 Provider
    const isMidProcessInsert = component.element.parentElement !== null;

    if (isMidProcessInsert) {
      // 如果是中途插入，需要搜索子树更新订阅关系
      this.markSubtreeForUpdate(component);

      if (this.pendingUpdates.size > 0) {
        requestAnimationFrame(() => this.processPendingUpdates());
      }
    }
    // 如果是首次渲染，不需要主动搜索，Consumer 会在挂载时自动查找最近的 Provider
  }

  /**
   * 移除 Provider
   * @param component Provider 组件实例
   */
  removeProvider(component: Component): void {
    const providedContexts = component.context.getProvidedContexts();

    providedContexts.forEach((context) => {
      const contextProviders = this.providerMap.get(context);
      if (!contextProviders) return;

      const entry = contextProviders.get(component);
      if (!entry) return;

      // 通知所有 Consumer 重新查找 Provider
      entry.consumersSet.forEach((consumer) => {
        this.unlinkConsumer(context, component, consumer);
        // 重新查找 Provider
        const newProvider = this.findNearestProvider(context, consumer);
        if (newProvider) {
          this.linkConsumer(context, newProvider, consumer);
        }
      });

      contextProviders.delete(component);
    });
  }

  /**
   * 更新 Context 值
   * @param context Context 实例
   * @param provider Provider 组件实例
   * @param value 新的 Context 值
   */
  updateContext<T>(context: Context<T>, provider: Component, value: T): void {
    const contextProviders = this.providerMap.get(context);
    if (!contextProviders) return;

    const entry = contextProviders.get(provider);
    if (!entry) return;

    // 通知所有 Consumer
    entry.consumersSet.forEach((consumer) => {
      consumer.context.consumeContext(context, value);
    });
  }

  /**
   * 获取 Provider 的所有 Consumer
   * @param context Context 实例
   * @param provider Provider 组件实例
   */
  getConsumers<T>(context: Context<T>, provider: Component): Component[] {
    const contextProviders = this.providerMap.get(context);
    if (!contextProviders) return [];

    const entry = contextProviders.get(provider);
    if (!entry) return [];

    return Array.from(entry.consumersSet);
  }

  /**
   * 标记子树中需要更新的 Consumer
   */
  private markSubtreeForUpdate(component: Component): void {
    const queue: Element[] = [component.element];
    let consumerCount = 0;

    while (queue.length) {
      const element = queue.shift();
      if (!element) continue;

      if (isComponentRoot(element)) {
        const potentialConsumer = getComponent(element);
        if (potentialConsumer && potentialConsumer.context.getConsumedContexts().size > 0) {
          this.pendingUpdates.add(potentialConsumer);
          consumerCount++;
        }
      }

      Array.from(element.children).forEach((child) => queue.push(child));
    }

    // 当发现需要更新的 Consumer 数量较多时发出警告
    if (consumerCount > 10) {
      console.warn(
        `Warning: Found ${consumerCount} consumers that need to update their context subscriptions. ` +
          'This may cause performance issues, especially with large DOM trees. ' +
          '\n\nConsider these optimizations:' +
          '\n1. Register providers during component initialization' +
          '\n2. Use state management instead of dynamic provider registration' +
          '\n3. Break down large components into smaller ones' +
          '\n4. Use context composition instead of dynamic registration'
      );
    }
  }

  /**
   * 处理待更新的 Consumer
   */
  private processPendingUpdates(): void {
    const startTime = performance.now();
    let updateCount = 0;

    this.pendingUpdates.forEach((consumer) => {
      this.updateConsumerSubscriptions(consumer);
      updateCount++;
    });

    const endTime = performance.now();
    const duration = endTime - startTime;

    // 当更新耗时较长时发出警告
    if (duration > 16) {
      console.warn(
        `Warning: Context subscription updates took ${duration.toFixed(2)}ms ` +
          `to process ${updateCount} consumers. ` +
          'This may cause frame drops or UI jank.'
      );
    }

    this.pendingUpdates.clear();
  }

  /**
   * 更新 Consumer 的订阅关系
   */
  private updateConsumerSubscriptions(consumer: Component): void {
    const consumedContexts = consumer.context.getConsumedContexts();

    consumedContexts.forEach((context) => {
      const currentProvider = this.consumerMap.get(context)?.get(consumer);
      const nearestProvider = this.findNearestProvider(context, consumer);

      if (currentProvider !== nearestProvider) {
        if (currentProvider) {
          this.unlinkConsumer(context, currentProvider, consumer);
        }
        if (nearestProvider) {
          this.linkConsumer(context, nearestProvider, consumer);
        }
      }
    });
  }

  /**
   * 查找最近的 Provider
   */
  private findNearestProvider<T>(context: Context<T>, component: Component): Component | null {
    let current: Element | null = component.element;

    while (current) {
      if (isComponentRoot(current)) {
        const potentialProvider = getComponent(current);
        if (potentialProvider && potentialProvider.context.getProvidedContexts().has(context)) {
          return potentialProvider;
        }
      }
      current = current.parentElement;
    }

    return null;
  }

  /**
   * 建立 Provider 和 Consumer 的关联
   */
  private linkConsumer<T>(context: Context<T>, provider: Component, consumer: Component): void {
    const contextProviders = this.providerMap.get(context);
    if (!contextProviders) return;

    const entry = contextProviders.get(provider);
    if (!entry) return;

    // 如果 Consumer 已经有 Provider，先解除旧关联
    const oldProvider = this.consumerMap.get(context)?.get(consumer);
    if (oldProvider) {
      this.unlinkConsumer(context, oldProvider, consumer);
    }

    // 建立新关联
    entry.consumers.add(consumer);
    entry.consumersSet.add(consumer);

    const consumerMap = this.consumerMap.get(context) || new WeakMap();
    consumerMap.set(consumer, provider);
    this.consumerMap.set(context, consumerMap);
  }

  /**
   * 解除 Provider 和 Consumer 的关联
   */
  private unlinkConsumer<T>(context: Context<T>, provider: Component, consumer: Component): void {
    const contextProviders = this.providerMap.get(context);
    if (!contextProviders) return;

    const entry = contextProviders.get(provider);
    if (!entry) return;

    entry.consumers.delete(consumer);
    entry.consumersSet.delete(consumer);

    const consumerMap = this.consumerMap.get(context);
    if (consumerMap) {
      consumerMap.delete(consumer);
    }
  }
}
