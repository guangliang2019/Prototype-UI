import { LifecycleManager } from "../../interface";

/**
 * Web Components 生命周期管理器
 */
export class WebLifecycleManager implements LifecycleManager {
  private callbacks = new Map<string, Set<() => void>>();
  private triggeredTypes = new Set<string>();

  add(type: string, callback: () => void): void {
    if (!this.callbacks.has(type)) {
      this.callbacks.set(type, new Set());
    }
    this.callbacks.get(type)!.add(callback);
  }

  trigger(type: string): void {
    this.triggeredTypes.add(type);
    this.callbacks.get(type)?.forEach(callback => callback());
  }

  clear(type?: string): void {
    if (type) {
      this.callbacks.get(type)?.clear();
      this.triggeredTypes.delete(type);
    } else {
      this.callbacks.clear();
      this.triggeredTypes.clear();
    }
  }

  /**
   * 检查指定的生命周期是否已触发
   * @param type 生命周期类型
   */
  hasTriggered(type: string): boolean {
    return this.triggeredTypes.has(type);
  }
}