// src/next-core/adapter/web-component/commands/event.ts

import { EventCommands } from '@/next-core/interface/event';
import { InteractiveAttribute, AriaStateAttribute } from '@/next-core/interface/event';
import { WebEventManager } from '../managers';
import { EventHandler, EventOptions } from '@/next-core/interface';

/**
 * Web 适配器的事件命令实现
 * 提供高层的事件和交互 API
 */
export class WebEventCommands implements EventCommands {
  private static readonly MAX_PRIORITY = 1;
  private focusPriority: number = -1;

  // 将我们的优先级映射到 tabIndex
  private static mapPriorityToTabIndex(priority: number): number {
    // 负数直接映射到 -1
    if (priority < 0) return -1;

    // 0 映射到 0
    if (priority === 0) return 0;

    // 将 0-1 映射到 0,1-infinity
    return Math.ceil(WebEventCommands.MAX_PRIORITY / priority);
  }

  focus = {
    setPriority: (priority: number): void => {
      const tabIndex = WebEventCommands.mapPriorityToTabIndex(priority);

      this.eventManager.setAttribute('tabIndex', String(tabIndex));
      this.eventManager.setAttribute('aria-focusable', String(priority >= 0));

      this.focusPriority = priority;
    },

    getPriority: (): number => {
      return this.focusPriority;
    },

    set: (focus: boolean): void => {
      if (focus) {
        this.eventManager.focus();
      } else {
        this.eventManager.blur();
      }
    },
  };

  constructor(private eventManager: WebEventManager) {}

  blur(): void {
    this.eventManager.blur();
  }

  click(): void {
    this.eventManager.click();
  }

  /**
   * 属性命令
   */
  setAttribute(
    attr: InteractiveAttribute | AriaStateAttribute,
    value: string | number | boolean
  ): void {
    this.eventManager.setAttribute(attr, value);
  }

  removeAttribute(attr: InteractiveAttribute | AriaStateAttribute): void {
    this.eventManager.removeAttribute(attr);
  }

  /**
   * 事件命令
   */
  on<T = any>(eventName: string, handler: EventHandler<T>, options?: EventOptions): void {
    this.eventManager.on(eventName, handler, options);
  }

  off<T = any>(eventName: string, handler: EventHandler<T>): void {
    this.eventManager.off(eventName, handler);
  }

  once<T = any>(eventName: string, handler: EventHandler<T>): void {
    this.eventManager.once(eventName, handler);
  }

  emit<T = any>(eventName: string, detail: T): void {
    this.eventManager.emit(eventName, detail);
  }

  /**
   * 清理命令
   */
  clearAll(): void {
    this.eventManager.clearAll();
  }

  onGlobal<T = any>(eventName: string, handler: EventHandler<T>, options?: EventOptions): void {
    this.eventManager.onGlobal(eventName, handler, options);
  }

  offGlobal<T = any>(eventName: string, handler: EventHandler<T>): void {
    this.eventManager.offGlobal(eventName, handler);
  }

  onceGlobal<T = any>(eventName: string, handler: EventHandler<T>): void {
    this.eventManager.onceGlobal(eventName, handler);
  }

  clearGlobal(): void {
    this.eventManager.clearGlobal();
  }
}
