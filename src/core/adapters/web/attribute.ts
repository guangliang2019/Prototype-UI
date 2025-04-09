import { WebAttributeManager } from './interface';
import {
  INTERACTIVE_ATTRIBUTES,
  ARIA_STATE_ATTRIBUTES,
  ARIA_CONTEXT_ATTRIBUTES,
  INTERACTIVE_STYLES,
} from './@web-component/managers/event/types';

/**
 * Web 平台属性管理工具类
 * 提供属性观察、同步和操作的基础功能
 */
export class WebAttributeManagerImpl implements WebAttributeManager {
  private attributeObserver: MutationObserver | null = null;
  private styleObserver: MutationObserver | null = null;
  private element: HTMLElement;
  private targetElement: HTMLElement;
  private observedAttributes = new Set<string>();
  private callbacks = new Map<string, Set<(oldValue: any, newValue: any) => void>>();

  constructor(element: HTMLElement, targetElement: HTMLElement) {
    this.element = element;
    this.targetElement = targetElement;
    this.setupAttributeObserver();
    this.setupStyleObserver();
  }

  /**
   * 设置属性观察器
   */
  private setupAttributeObserver(): void {
    this.attributeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          const attr = mutation.attributeName!;
          const oldValue = mutation.oldValue;
          const newValue = this.element.getAttribute(attr);

          // 触发属性变化回调
          this.handleChange(attr, oldValue, newValue);

          // 同步交互相关属性
          if (
            INTERACTIVE_ATTRIBUTES.includes(attr as any) ||
            ARIA_STATE_ATTRIBUTES.includes(attr as any)
          ) {
            this.syncAttribute(attr);
          }
          // 对于上下文相关的 ARIA 属性，只在特定条件下同步
          else if (
            ARIA_CONTEXT_ATTRIBUTES.includes(attr as any) &&
            !this.targetElement.hasAttribute(attr)
          ) {
            this.syncAttribute(attr);
          }
        }
      }
    });
  }

  /**
   * 设置样式观察器
   */
  private setupStyleObserver(): void {
    this.styleObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const style = window.getComputedStyle(this.element);
          INTERACTIVE_STYLES.forEach((prop) => {
            const value = style.getPropertyValue(
              prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
            );
            if (value) {
              this.targetElement.style[prop] = value;
            }
          });
        }
      }
    });
  }

  /**
   * 同步属性到目标元素
   */
  private syncAttribute(attr: string): void {
    const value = this.element.getAttribute(attr);
    if (value === null) {
      this.targetElement.removeAttribute(attr);
    } else {
      this.targetElement.setAttribute(attr, value);
    }
  }

  /**
   * 设置属性
   */
  public setAttribute(attr: string, value: string | number | boolean): void {
    if (typeof value === 'boolean') {
      if (value) {
        this.targetElement.setAttribute(attr, '');
      } else {
        this.targetElement.removeAttribute(attr);
      }
    } else {
      this.targetElement.setAttribute(attr, String(value));
    }
  }

  /**
   * 移除属性
   */
  public removeAttribute(attr: string): void {
    this.targetElement.removeAttribute(attr);
  }

  /**
   * 监听属性变化
   */
  public watch(name: string, callback: (oldValue: any, newValue: any) => void): void {
    this.observedAttributes.add(name);
    if (!this.callbacks.has(name)) {
      this.callbacks.set(name, new Set());
    }
    this.callbacks.get(name)!.add(callback);
  }

  /**
   * 获取被观察的属性列表
   */
  public getObservedAttributes(): string[] {
    return Array.from(this.observedAttributes);
  }

  /**
   * 处理属性变化
   */
  public handleChange(name: string, oldValue: any, newValue: any): void {
    this.callbacks.get(name)?.forEach((callback) => callback(oldValue, newValue));
  }

  /**
   * 销毁管理器
   */
  public destroy(): void {
    this.attributeObserver?.disconnect();
    this.styleObserver?.disconnect();
    this.attributeObserver = null;
    this.styleObserver = null;
  }
}
