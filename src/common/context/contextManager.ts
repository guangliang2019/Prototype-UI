/**
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/common/context-provider/contextManager.ts
 * @author guangliang2019
 * @date 2024-08-13
 */

import ContextConsumer, {
  requestContextSymbol,
  setConsumerContextSymbol,
} from './contextConsumer';
import ContextProvider from './contextProvider';

/**
 * 由于 WeakSet 不能被遍历，因此额外维护一个 Set，切勿忘记同步更新
 */
type ProviderEntry = WeakMap<
  ContextProvider<any>,
  { consumersWeakSet: WeakSet<ContextConsumer<any>>; consumersSet: Set<ContextConsumer<any>> }
>;
type ConsumerEntry = WeakMap<ContextConsumer<any>, ContextProvider<any>>;

/**
 * 用于管理 provider 与 consumer 的关系
 */
export default class ContextManager {
  private static _instance: ContextManager;
  private constructor() {}
  static getInstance(): ContextManager {
    if (!ContextManager._instance) {
      ContextManager._instance = new ContextManager();
    }
    return ContextManager._instance;
  }

  private _providerEntryMap: Map<string, ProviderEntry> = new Map();
  private _consumerEntryMap: Map<string, ConsumerEntry> = new Map();

  /**
   * 向 ContextManager 添加一个新的 Provider, 主动搜索其可以关联的 Consumer，并更新 Consumer 的数据，该行为需要在 Provider 创建时触发
   * @param provider Provider Web Component 实例
   */
  addProvider<T extends Object>(provider: ContextProvider<T>) {
    if (!this._providerEntryMap.has(provider.key)) {
      this._providerEntryMap.set(provider.key, new WeakMap());
    }

    this._providerEntryMap
      .get(provider.key)
      ?.set(provider, { consumersWeakSet: new WeakSet(), consumersSet: new Set() });

    // 搜索子树中所有适用的 consumer
    const consumers = this._findConsumers(provider);
    // 变更 _consumerEntryMap 和 _providerEntryMap
    // 将搜索到的 consumer 与新 provider 关联起来，取消旧 provider 的关联
    consumers.forEach((consumer) => {
      // 如果当前 consumer 过去关联了 provider，则取消关联
      if (this._consumerEntryMap.get(provider.key)?.get(consumer)) this._removeConsumer(consumer);
      this.addConsumer(provider, consumer);
      // 触发 Consumer 的 request-context
      consumer[requestContextSymbol]();
    });
  }

  /**
   * 删除一个 Provider, 通知其关联的 Consumer 重新触发 request-context，该行为需要在 Provider 被销毁时触发
   * @param provider Provider Web Component 实例
   */
  removeProvider<T extends Object>(provider: ContextProvider<T>) {
    // 通知所有 consumer，需要重新寻找新的 provider
    const entry = this._providerEntryMap.get(provider.key)?.get(provider);
    if (!entry) return;

    const { consumersSet } = entry;
    consumersSet.forEach((consumer) => {
      this._removeConsumer(consumer);
      consumer[requestContextSymbol]();
    });

    this._providerEntryMap.get(provider.key)?.delete(provider);
  }

  /**
   * 向 ContextManager 添加一个新的 Consumer, 该行为需要在 Provider 接收到 Consumer 的 request-context 事件冒泡时触发
   * @param provider Provider Web Component 实例
   * @param consumer Consumer Web Component 实例
   */
  addConsumer<T extends Object>(provider: ContextProvider<T>, consumer: ContextConsumer<T>) {
    if (!this._providerEntryMap.get(provider.key)?.get(provider)) {
      throw new Error(`ContextManager: No provider found for consumer: ${String(consumer)}`);
    }
    if (!this._consumerEntryMap.has(provider.key)) {
      this._consumerEntryMap.set(provider.key, new WeakMap());
    }

    const entry = this._providerEntryMap.get(provider.key)!.get(provider)!;
    entry.consumersWeakSet.add(consumer);
    entry.consumersSet.add(consumer);

    this._consumerEntryMap.get(provider.key)!.set(consumer, provider);
  }

  /**
   * 删除一个 Consumer, 该行为需要在 Consumer 被销毁时触发
   * @param consumer Consumer Web Component 实例
   */
  private _removeConsumer<T extends Object>(consumer: ContextConsumer<T>) {
    const existingProvider = this._consumerEntryMap.get(consumer.key)?.get(consumer);

    // 检查该 Consumer 是否已有 Provider，如果有，则从旧 Provider 中移除
    if (existingProvider) {
      const entry = this._providerEntryMap.get(consumer.key)?.get(existingProvider);
      if (entry) {
        entry.consumersWeakSet.delete(consumer);
        entry.consumersSet.delete(consumer);
      }
    }
  }

  /**
   * 从 Provider 开始递归搜索 DOM 子树中的所有适用的 Consumer
   * @param provider Provider Web Component 实例
   * @returns 适用的 Consumer 数组
   */
  private _findConsumers<T extends Object>(provider: ContextProvider<T>): ContextConsumer<T>[] {
    const consumers: ContextConsumer<T>[] = [];

    const search = (node: Element | null) => {
      if (!node) return;
      // 如果遇到相同 key 的 Provider，则停止该分支的搜索
      if (node instanceof ContextProvider && node.key === provider.key && node !== provider) {
        return;
      }

      if (node instanceof ContextConsumer && node.key === provider.key) {
        consumers.push(node);
        return;
      }

      // 继续递归搜索子节点
      Array.from(node.children).forEach((child) => search(child));
    };

    search(provider);
    return consumers;
  }

  /**
   * 通知 Consumer 更新 Context 值
   * @param provider Provider Web Component 实例
   * @param value 新的 context 值
   * @returns
   */
  updateContext<T extends Object>(provider: ContextProvider<T>, value: Partial<T>) {
    const entry = this._providerEntryMap.get(provider.key)?.get(provider);
    if (!entry) return;

    entry.consumersSet.forEach((consumer) => {
      consumer[setConsumerContextSymbol](value);
    });
  }
}
