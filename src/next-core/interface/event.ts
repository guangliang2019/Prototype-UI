import { EventHandler, EventOptions } from './managers';

/**
 * 基础交互属性类型
 */
export type InteractiveAttribute = 'tabIndex' | 'disabled' | 'contentEditable' | 'draggable';

/**
 * ARIA 状态属性类型
 */
export type AriaStateAttribute =
  | 'aria-pressed'
  | 'aria-expanded'
  | 'aria-selected'
  | 'aria-checked'
  | 'aria-disabled'
  | 'aria-hidden'
  | 'aria-invalid';

/**
 * ARIA 关系属性类型
 */
export type AriaRelationAttribute =
  | 'aria-controls'
  | 'aria-owns'
  | 'aria-describedby'
  | 'aria-labelledby'
  | 'aria-details';

/**
 * 交互样式属性类型
 */
export type InteractiveStyle = 'pointerEvents' | 'userSelect' | 'cursor';

/**
 * 事件工具接口
 */
export interface EventCommands {
  /**
   * 基础交互方法
   */
  focus: {
    setPriority: (priority: number) => void;
    getPriority: () => number;
    set: (focus: boolean) => void;
  };

  click(): void;

  /**
   * 属性设置方法
   */
  setAttribute(
    attr: InteractiveAttribute | AriaStateAttribute,
    value: string | number | boolean
  ): void;
  removeAttribute(attr: InteractiveAttribute | AriaStateAttribute): void;

  /**
   * 事件监听方法
   */
  on<T = any>(eventName: string, handler: EventHandler<T>, options?: EventOptions): void;
  off<T = any>(eventName: string, handler: EventHandler<T>): void;
  once<T = any>(eventName: string, handler: EventHandler<T>): void;

  /**
   * 事件触发方法
   */
  emit<T = any>(eventName: string, detail: T): void;

  /**
   * 批量事件清理
   */
  clearAll(): void;

  /**
   * 全局事件监听方法
   */
  onGlobal<T = any>(eventName: string, handler: EventHandler<T>, options?: EventOptions): void;
  offGlobal<T = any>(eventName: string, handler: EventHandler<T>): void;
  onceGlobal<T = any>(eventName: string, handler: EventHandler<T>): void;
  clearGlobal(): void;
}

/**
 * 事件工具基类
 * 提供基础的事件处理实现
 */
export abstract class BaseEventCommands implements EventCommands {
  protected abstract getTargetElement(): HTMLElement;

  abstract focus: {
    setPriority: (priority: number) => void;
    getPriority: () => number;
    set: (focus: boolean) => void;
  };

  click(): void {
    this.getTargetElement().click();
  }

  setAttribute(
    attr: InteractiveAttribute | AriaStateAttribute,
    value: string | number | boolean
  ): void {
    const element = this.getTargetElement();
    if (typeof value === 'boolean') {
      if (value) {
        element.setAttribute(attr, '');
      } else {
        element.removeAttribute(attr);
      }
    } else {
      element.setAttribute(attr, String(value));
    }
  }

  removeAttribute(attr: InteractiveAttribute | AriaStateAttribute): void {
    this.getTargetElement().removeAttribute(attr);
  }

  abstract on<T = any>(eventName: string, handler: EventHandler<T>, options?: EventOptions): void;
  abstract off<T = any>(eventName: string, handler: EventHandler<T>): void;
  abstract once<T = any>(eventName: string, handler: EventHandler<T>): void;
  abstract emit<T = any>(eventName: string, detail: T): void;
  abstract clearAll(): void;

  abstract onGlobal<T = any>(eventName: string, handler: EventHandler<T>, options?: EventOptions): void;
  abstract offGlobal<T = any>(eventName: string, handler: EventHandler<T>): void;
  abstract onceGlobal<T = any>(eventName: string, handler: EventHandler<T>): void;
  abstract clearGlobal(): void;
}
