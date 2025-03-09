import { AttributeManager } from '../../interface';

/**
 * Web Components 属性管理器
 */
export class WebAttributeManager implements AttributeManager {
  private observedAttributes = new Set<string>();
  private callbacks = new Map<string, Set<(oldValue: any, newValue: any) => void>>();

  watch(name: string, callback: (oldValue: any, newValue: any) => void): void {
    this.observedAttributes.add(name);
    if (!this.callbacks.has(name)) {
      this.callbacks.set(name, new Set());
    }
    this.callbacks.get(name)!.add(callback);
  }

  getObservedAttributes(): string[] {
    return Array.from(this.observedAttributes);
  }

  handleChange(name: string, oldValue: any, newValue: any): void {
    this.callbacks.get(name)?.forEach((callback) => callback(oldValue, newValue));
  }
}
