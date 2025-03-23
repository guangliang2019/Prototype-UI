import { Component, Context, ContextManager } from '@/next-core/interface';
import { WebContextCenter } from '@/next-core/adapter/context';

interface ContextListener<T> {
  callback: (value: T, changedKeys: string[]) => void;
  context: Context<T>;
}

export class WebComponentContextManager implements ContextManager {
  private providedContexts = new Set<Context>();
  private consumedContexts = new Set<Context>();
  private providedValues = new Map<Context, any>();
  private consumedValues = new Map<Context, any>();
  private contextCenter: WebContextCenter;
  private contextListeners = new Set<ContextListener<any>>();

  constructor(private component: Component) {
    this.contextCenter = WebContextCenter.getInstance();
  }

  getProvidedContexts(): Set<Context> {
    return this.providedContexts;
  }

  getConsumedContexts(): Set<Context> {
    return this.consumedContexts;
  }

  provideContext<T>(context: Context<T>, value: T): void {
    this.providedContexts.add(context);
    this.providedValues.set(context, value);
    // 注册到 ContextCenter
    this.contextCenter.registerProvider(context, this.component);
  }

  consumeContext<T>(context: Context<T>, value: T, notifyListeners = true): void {
    this.consumedContexts.add(context);
    this.consumedValues.set(context, value);
    // 注册到 ContextCenter
    this.contextCenter.registerConsumer(context, this.component);
    // 通知监听器
    if (notifyListeners) {
      this.notifyListeners(context, value, []);
    }
  }

  setConsumedValue<T>(
    context: Context<T>,
    value: T,
    changedKeys: string[],
    notifyListeners = true
  ): void {
    this.consumedValues.set(context, value);
    // 通知监听器
    if (notifyListeners) {
      this.notifyListeners(context, value, changedKeys);
    }
  }

  setProvidedValue<T>(context: Context<T>, value: T): void {
    this.providedValues.set(context, value);
  }

  getProvidedValue<T>(context: Context<T>): T | undefined {
    return this.providedValues.get(context);
  }

  getConsumedValue<T>(context: Context<T>): T | undefined {
    return this.consumedValues.get(context);
  }

  destroy(): void {
    // 从 ContextCenter 中移除
    this.contextCenter.removeProvider(this.component);
    this.consumedValues.forEach((_, context) => {
      this.contextCenter.removeConsumer(context, this.component);
    });
    // 清理所有状态
    this.providedContexts.clear();
    this.consumedContexts.clear();
    this.providedValues.clear();
    this.consumedValues.clear();
    this.contextListeners.clear();
  }

  /**
   * 添加 Context 监听器
   * @param context Context 实例
   * @param callback 回调函数
   */
  addContextListener<T>(
    context: Context<T>,
    callback: (value: T, changedKeys: string[]) => void
  ): void {
    this.contextListeners.add({ context, callback });
  }

  /**
   * 移除 Context 监听器
   * @param context Context 实例
   * @param callback 回调函数
   */
  removeContextListener<T>(
    context: Context<T>,
    callback: (value: T, changedKeys: string[]) => void
  ): void {
    this.contextListeners.delete({ context, callback });
  }

  /**
   * 通知所有监听器
   * @param context Context 实例
   * @param value 新的值
   * @param changedKeys 改变的键
   */
  private notifyListeners<T>(context: Context<T>, value: T, changedKeys: string[]): void {
    this.contextListeners.forEach((listener) => {
      if (listener.context === context) {
        listener.callback(value, changedKeys);
      }
    });
  }

  /**
   * 获取 Provider 的所有 Consumer
   * @param context Context 实例
   */
  getConsumers<T>(context: Context<T>): Component[] {
    return this.contextCenter.getConsumers(context, this.component);
  }
}
