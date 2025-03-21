import { Component, Context, ContextManager } from "@/next-core/interface";

// 在 web-component/managers/context.ts 中
export class WebComponentContextManager implements ContextManager {
  private providedContexts = new Set<Context>();
  private consumedContexts = new Set<Context>();
  private providedValues = new Map<Context, any>();
  private consumedValues = new Map<Context, any>();

  constructor(private component: Component) {}

  getProvidedContexts(): Set<Context> {
    return this.providedContexts;
  }

  getConsumedContexts(): Set<Context> {
    return this.consumedContexts;
  }

  provideContext<T>(context: Context<T>, value: T): void {
    this.providedContexts.add(context);
    this.providedValues.set(context, value);
  }

  consumeContext<T>(context: Context<T>, value: T): void {
    this.consumedContexts.add(context);
    this.consumedValues.set(context, value);
  }

  getProvidedValue<T>(context: Context<T>): T | undefined {
    return this.providedValues.get(context);
  }

  getConsumedValue<T>(context: Context<T>): T | undefined {
    return this.consumedValues.get(context);
  }

  destroy(): void {
    // 清理所有状态
    this.providedContexts.clear();
    this.consumedContexts.clear();
    this.providedValues.clear();
    this.consumedValues.clear();
  }
}