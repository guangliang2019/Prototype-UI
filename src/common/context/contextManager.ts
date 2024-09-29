/**
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/common/context-provider/contextManager.ts
 * @author guangliang2019
 * @date 2024-08-13
 */

import ContextConsumer, { requestContextSymbol, setConsumerContextSymbol } from './contextConsumer';
import ContextProvider from './contextProvider';

/**
 * 由于 WeakSet 不能被遍历，因此额外维护一个 Set，切勿忘记同步更新
 */
type ProviderEntry = WeakMap<
  ContextProvider<any, any>,
  { consumersWeakSet: WeakSet<ContextConsumer<any>>; consumersSet: Set<ContextConsumer<any>> }
>;
type ConsumerEntry = WeakMap<ContextConsumer<any>, ContextProvider<any, any>>;

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

  private _providerEntryMap: Map<keyof any, ProviderEntry> = new Map();
  private _consumerEntryMap: Map<keyof any, ConsumerEntry> = new Map();

  /**
   * 向 ContextManager 添加一个新的 Provider, 主动搜索其可以关联的 Consumer，并更新 Consumer 的数据，该行为需要在 Provider 创建时触发
   * @param provider Provider Web Component 实例
   */
  addProvider<T extends Record<string, Object>>(provider: ContextProvider<T, any>) {
    provider.providerKeys.forEach((key) => {
      if (!this._providerEntryMap.has(key)) {
        this._providerEntryMap.set(key, new WeakMap());
      }

      this._providerEntryMap
        .get(key)
        ?.set(provider, { consumersWeakSet: new WeakSet(), consumersSet: new Set() });
    });

    // 对所有 key, 搜索子树中所有适用的 consumer
    const consumersRecord = this._findConsumers(provider);
    // 变更 _consumerEntryMap 和 _providerEntryMap
    // 将搜索到的 consumer 与新 provider 关联起来，取消旧 provider 的关联
    provider.providerKeys.forEach((key) => {
      consumersRecord[key].forEach((consumer) => {
        // 如果当前 consumer 过去关联了 provider，则取消关联
        if (this._consumerEntryMap.get(key)?.get(consumer)) this._removeConsumer(consumer);
        this.addConsumer(key, provider, consumer);
        // 触发 Consumer 的 request-context
        consumer[requestContextSymbol](key);
      });
    });
  }

  /**
   * 删除一个 Provider, 通知其关联的 Consumer 重新触发 request-context，该行为需要在 Provider 被销毁时触发
   * @param provider Provider Web Component 实例
   */
  removeProvider<T extends Record<string, Object>>(provider: ContextProvider<T, any>) {
    provider.providerKeys.forEach((key) => {
      // 通知所有 consumer，需要重新寻找新的 provider
      const entry = this._providerEntryMap.get(key)?.get(provider);
      if (!entry) return;

      const { consumersSet } = entry;
      consumersSet.forEach((consumer) => {
        this._removeConsumer(consumer);
        consumer[requestContextSymbol](key);
      });

      this._providerEntryMap.get(key)?.delete(provider);
    });
  }

  /**
   * 向 ContextManager 添加一个新的 Consumer, 该行为需要在 Provider 接收到 Consumer 的 request-context 事件冒泡时触发
   * @param provider Provider Web Component 实例
   * @param consumer Consumer Web Component 实例
   */
  addConsumer(key: keyof any, provider: ContextProvider<any, any>, consumer: ContextConsumer<any>) {
    if (!this._providerEntryMap.get(key)?.get(provider)) {
      throw new Error(`ContextManager: No provider found for consumer: ${String(consumer)}`);
    }
    if (!this._consumerEntryMap.has(key)) {
      this._consumerEntryMap.set(key, new WeakMap());
    }

    const entry = this._providerEntryMap.get(key)!.get(provider)!;
    entry.consumersWeakSet.add(consumer);
    entry.consumersSet.add(consumer);

    this._consumerEntryMap.get(key)!.set(consumer, provider);
  }

  /**
   * 删除一个 Consumer, 该行为需要在 Consumer 被销毁时触发
   * @param consumer Consumer Web Component 实例
   */
  private _removeConsumer<T extends Record<string, Object>>(consumer: ContextConsumer<T>) {
    consumer.consumerKeys.forEach((key) => {
      const existingProvider = this._consumerEntryMap.get(key)?.get(consumer);

      // 检查该 Consumer 是否已有 Provider，如果有，则从旧 Provider 中移除
      if (existingProvider) {
        const entry = this._providerEntryMap.get(key)?.get(existingProvider);
        if (entry) {
          entry.consumersWeakSet.delete(consumer);
          entry.consumersSet.delete(consumer);
        }
      }
    });
  }

  /**
   * 从 Provider 开始迭代搜索子树中的所有适用的 Consumer
   * @param provider Provider Web Component 实例
   * @returns 适用的 Consumer 数组
   */
  private _findConsumers<T extends Record<string, Object>>(
    provider: ContextProvider<T, any>
  ): Record<keyof T, ContextConsumer<any>[]> {
    const consumersRecord = {} as Record<keyof T, ContextConsumer<any>[]>;
    provider.providerKeys.forEach((key) => {
      consumersRecord[key] = [];
    });
    const queue: Element[] = [provider];
    const keyFlags: Set<keyof T>[] = [provider.providerKeys];

    while (queue.length) {
      const node = queue.shift();
      const keyFlag = keyFlags.shift();
      if (!keyFlag) throw new Error('ContextManager: keyFlag is undefined, 这是个系统问题');
      if (!node || keyFlag.size === 0) continue;

      // 如果遇到相同 key 的 Provider，并且不是自己，
      // 该分支的 keyFlag 减少当前 key，若 KeyFlag size 为 0，则停止搜索
      if (node instanceof ContextProvider && node !== provider) {
        keyFlag.forEach((key) => {
          if (node.providerKeys.has(key)) keyFlag.delete(key);
        });
        if (keyFlag.size === 0) continue;
      }

      if (node instanceof ContextConsumer) {
        keyFlag.forEach((key) => {
          if (node.consumerKeys.has(key)) {
            consumersRecord[key].push(node);
          }
        });
      }

      Array.from(node.children).forEach((child) => {
        keyFlags.push(new Set(keyFlag));
        queue.push(child);
      });
    }

    return consumersRecord;
  }

  /**
   * 通知 Consumer 更新 Context 值
   * @param provider Provider Web Component 实例
   * @param value 新的 context 值
   * @returns
   */
  updateContext<T extends Record<string, Object>, K extends keyof T>(
    key: K,
    provider: ContextProvider<T, any>,
    value: T[K],
    changedKeys: (keyof T[K])[]
  ) {
    const entry = this._providerEntryMap.get(key)?.get(provider);
    if (!entry) return;

    entry.consumersSet.forEach((consumer) => {
      consumer[setConsumerContextSymbol](key, value, changedKeys);
    });
  }

  getConsumers(key: keyof any, provider: ContextProvider<any, any>): ContextConsumer<any>[] {
    return Array.from(this._providerEntryMap.get(key)?.get(provider)?.consumersSet || []);
  }
}
