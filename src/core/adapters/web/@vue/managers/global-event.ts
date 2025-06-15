import { EventHandler, EventOptions } from '@/core/interface';
import { EventItem, STANDARD_DOM_EVENTS } from './types';

export class GlobalEventManager {
  private static instance: GlobalEventManager;
  private globalEventRefs: Map<string, number> = new Map();
  private globalEventHandlers: Map<string, EventListener> = new Map();
  private globalEvents: Map<string, Set<EventItem>> = new Map();

  private constructor() {}

  static getInstance(): GlobalEventManager {
    if (!GlobalEventManager.instance) {
      GlobalEventManager.instance = new GlobalEventManager();
    }
    return GlobalEventManager.instance;
  }

  /**
   * 添加全局事件监听
   */
  addGlobalListener<T = any>(
    eventName: string,
    handler: EventHandler<T>,
    options: EventOptions = {}
  ): void {
    if (!this.globalEvents.has(eventName)) {
      this.globalEvents.set(eventName, new Set());
      
      // 如果是原生 DOM 事件，使用 document 作为事件目标
      if (this.isDOMEvent(eventName)) {
        const globalHandler = (e: Event) => {
          this.globalEvents.get(eventName)?.forEach(item => item.handler(e as any));
        };
        this.globalEventHandlers.set(eventName, globalHandler);
        document.addEventListener(eventName, globalHandler);
      }
    }

    // 增加引用计数
    this.globalEventRefs.set(
      eventName,
      (this.globalEventRefs.get(eventName) || 0) + 1
    );

    const eventSet = this.globalEvents.get(eventName)!;
    const eventItem: EventItem = { handler, options };
    eventSet.add(eventItem);

    // 如果是一次性事件
    if (options.once) {
      const originalHandler = handler;
      handler = ((event: T) => {
        this.removeGlobalListener(eventName, originalHandler);
        originalHandler(event);
      }) as EventHandler<T>;
    }
  }

  /**
   * 移除全局事件监听
   */
  removeGlobalListener<T = any>(eventName: string, handler: EventHandler<T>): void {
    const eventSet = this.globalEvents.get(eventName);
    if (!eventSet) return;

    // 找到并移除对应的事件项
    for (const eventItem of eventSet) {
      if (eventItem.handler === handler) {
        eventSet.delete(eventItem);
      }
    }

    // 减少引用计数
    const refCount = (this.globalEventRefs.get(eventName) || 0) - 1;
    this.globalEventRefs.set(eventName, refCount);

    // 如果没有更多处理器或引用计数为0，删除整个事件集合和全局事件处理器
    if (eventSet.size === 0 || refCount <= 0) {
      this.globalEvents.delete(eventName);
      this.globalEventRefs.delete(eventName);
      if (this.globalEventHandlers.has(eventName)) {
        document.removeEventListener(eventName, this.globalEventHandlers.get(eventName)!);
        this.globalEventHandlers.delete(eventName);
      }
    }
  }

  /**
   * 清理所有全局事件监听
   */
  clearAll(): void {
    // 移除所有全局事件监听
    for (const [eventName, _] of this.globalEvents) {
      if (this.globalEventHandlers.has(eventName)) {
        document.removeEventListener(eventName, this.globalEventHandlers.get(eventName)!);
      }
    }
    this.globalEvents.clear();
    this.globalEventHandlers.clear();
    this.globalEventRefs.clear();
  }

  /**
   * 触发全局事件
   */
  emit<T = any>(eventName: string, detail: T): void {
    const eventSet = this.globalEvents.get(eventName);
    if (eventSet) {
      for (const { handler } of eventSet) {
        handler(detail);
      }
    }
  }

  /**
   * 判断是否为 DOM 事件
   */
  private isDOMEvent(eventName: string): boolean {
    const standardEvents = [
      'click',
      'dblclick',
      'mousedown',
      'mouseup',
      'mousemove',
      'mouseover',
      'mouseout',
      'mouseenter',
      'mouseleave',
      'keydown',
      'keyup',
      'keypress',
      'focus',
      'blur',
      'change',
      'input',
      'submit',
      'reset',
      'touchstart',
      'touchend',
      'touchmove',
      'touchcancel',
    ];

    return standardEvents.includes(eventName.toLowerCase());
  }
} 