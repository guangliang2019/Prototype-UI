import {
  EventManager as IEventManager,
  EventHandler,
  EventOptions,
  EVENT_MANAGER_SYMBOL,
} from '@/core/interface';
import { getComponent } from '../../../../../utils/component';
import { GlobalEventManager } from './global-event';
import { InteractionManager } from './interaction-manager';
import { WebAttributeManagerImpl } from '../../../attribute';
import {
  ARIA_CONTEXT_ATTRIBUTES,
  ARIA_STATE_ATTRIBUTES,
  EventItem,
  INTERACTIVE_ATTRIBUTES,
  INTERACTIVE_STYLES,
  PendingEvent,
  PendingListener,
  STANDARD_DOM_EVENTS,
} from './types';

export class EventManager implements IEventManager {
  private events: Map<string, Set<EventItem>> = new Map();
  private globalEvents: Map<string, Set<EventItem>> = new Map();
  private element: HTMLElement;
  private isMounted = false;
  private isTrigger = false;
  private pendingListeners: PendingListener[] = [];
  private pendingEvents: PendingEvent[] = [];
  private childTriggers: Set<EventManager> = new Set();
  private innerMostTrigger: EventManager | null = null;
  private globalEventManager = GlobalEventManager.getInstance();
  private attributeManager: WebAttributeManagerImpl;
  private interactionManager: InteractionManager;

  constructor(element: HTMLElement) {
    this.element = element;
    this.attributeManager = new WebAttributeManagerImpl(element, element);
    this.interactionManager = new InteractionManager(element, element);
  }

  /**
   * 将组件标记为 trigger
   */
  public markAsTrigger(): void {
    this.isTrigger = true;
    this.findInnerMostTrigger();
  }

  /**
   * 查找最内层的 trigger
   */
  private findInnerMostTrigger(): void {
    // 清空之前的缓存
    this.childTriggers.clear();
    this.innerMostTrigger = null;

    // 查找所有子元素中的 trigger
    const childElements = Array.from(this.element.querySelectorAll('*'));
    const childTriggers = childElements
      .map((el) => this.findEventManager(el))
      .filter((manager): manager is EventManager => manager !== null && manager.isTrigger);

    if (childTriggers.length > 0) {
      this.childTriggers = new Set(childTriggers);
      // 找到最内层的 trigger（DOM 树最深的）
      this.innerMostTrigger = childTriggers.reduce((deepest, current) => {
        const deepestDepth = this.getElementDepth(deepest.element);
        const currentDepth = this.getElementDepth(current.element);
        return currentDepth > deepestDepth ? current : deepest;
      });

      // 同步当前的交互属性到最内层 trigger
      this.syncInteractiveProperties(this.innerMostTrigger.element);

      // 将当前的事件代理到最内层
      this.delegateEventsToInnerMost();
    }
  }

  /**
   * 获取元素在 DOM 树中的深度
   */
  private getElementDepth(element: Element): number {
    let depth = 0;
    let current = element;
    while (current.parentElement) {
      depth++;
      current = current.parentElement;
    }
    return depth;
  }

  /**
   * 将当前的事件代理到最内层的 trigger
   */
  private delegateEventsToInnerMost(): void {
    if (!this.innerMostTrigger) return;

    // 将所有已注册的事件代理到最内层
    for (const [eventName, eventSet] of this.events) {
      for (const item of eventSet) {
        this.innerMostTrigger.on(eventName, item.handler, item.options);
      }
    }

    // 将所有待处理的事件监听器代理到最内层
    for (const { eventName, item } of this.pendingListeners) {
      this.innerMostTrigger.on(eventName, item.handler, item.options);
    }

    // 将所有待处理的事件触发代理到最内层
    for (const { eventName, detail } of this.pendingEvents) {
      this.innerMostTrigger.emit(eventName, detail);
    }

    // 清空本地队列
    this.events.clear();
    this.pendingListeners = [];
    this.pendingEvents = [];
  }

  /**
   * 从元素中获取 EventManager 实例
   */
  private findEventManager(element: Element): EventManager | null {
    const component = getComponent(element);
    return component?.[EVENT_MANAGER_SYMBOL] as EventManager | null;
  }

  public on<T = any>(
    eventName: string,
    handler: EventHandler<T>,
    options: EventOptions = {}
  ): void {
    // 如果是 trigger 且有最内层 trigger，则代理事件
    if (this.isTrigger && this.innerMostTrigger) {
      this.innerMostTrigger.on(eventName, handler, options);
      return;
    }

    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }

    const eventSet = this.events.get(eventName)!;
    const eventItem: EventItem = { handler, options };
    eventSet.add(eventItem);

    // 如果组件已挂载，直接添加监听器
    if (this.isMounted && this.isDOMEvent(eventName)) {
      this.element.addEventListener(eventName, handler as EventListener, {
        capture: options.capture,
        passive: options.passive,
      });
    } else if (this.isDOMEvent(eventName)) {
      // 否则加入待处理队列
      this.pendingListeners.push({ eventName, item: eventItem });
    }

    // 如果是一次性事件
    if (options.once) {
      const originalHandler = handler;
      handler = ((event: T) => {
        this.off(eventName, originalHandler);
        originalHandler(event);
      }) as EventHandler<T>;
    }
  }

  public onGlobal<T = any>(
    eventName: string,
    handler: EventHandler<T>,
    options: EventOptions = {}
  ): void {
    if (!this.globalEvents.has(eventName)) {
      this.globalEvents.set(eventName, new Set());
    }

    const eventSet = this.globalEvents.get(eventName)!;
    const eventItem: EventItem = { handler, options };
    eventSet.add(eventItem);

    // 委托给全局事件管理器
    this.globalEventManager.addGlobalListener(eventName, handler, options);
  }

  public off<T = any>(eventName: string, handler: EventHandler<T>): void {
    const eventSet = this.events.get(eventName);
    if (!eventSet) return;

    // 找到并移除对应的事件项
    for (const eventItem of eventSet) {
      if (eventItem.handler === handler) {
        eventSet.delete(eventItem);

        // 如果已挂载且是 DOM 事件，移除监听器
        if (this.isMounted && this.isDOMEvent(eventName)) {
          this.element.removeEventListener(eventName, handler as EventListener, {
            capture: eventItem.options.capture,
          });
        }

        // 从待处理队列中移除
        this.pendingListeners = this.pendingListeners.filter(
          (item) => !(item.eventName === eventName && item.item.handler === handler)
        );
      }
    }

    // 如果没有更多处理器，删除整个事件集合
    if (eventSet.size === 0) {
      this.events.delete(eventName);
    }
  }

  public offGlobal<T = any>(eventName: string, handler: EventHandler<T>): void {
    const eventSet = this.globalEvents.get(eventName);
    if (!eventSet) return;

    // 找到并移除对应的事件项
    for (const eventItem of eventSet) {
      if (eventItem.handler === handler) {
        eventSet.delete(eventItem);
      }
    }

    // 委托给全局事件管理器
    this.globalEventManager.removeGlobalListener(eventName, handler);

    // 如果没有更多处理器，删除整个事件集合
    if (eventSet.size === 0) {
      this.globalEvents.delete(eventName);
    }
  }

  public emit<T = any>(eventName: string, detail: T): void {
    // 如果是 trigger 且有最内层 trigger，则代理触发
    if (this.isTrigger && this.innerMostTrigger) {
      this.innerMostTrigger.emit(eventName, detail);
      return;
    }

    // 如果组件未挂载，将事件加入待处理队列
    if (!this.isMounted) {
      this.pendingEvents.push({ eventName, detail });
      return;
    }

    // 触发本地事件
    const eventSet = this.events.get(eventName);
    if (eventSet) {
      if (this.isDOMEvent(eventName)) {
        const event = new CustomEvent(eventName, { detail });
        this.element.dispatchEvent(event);
      } else {
        for (const { handler } of eventSet) {
          handler(detail);
        }
      }
    }

    // 触发全局事件
    this.globalEventManager.emit(eventName, detail);
  }

  public once<T = any>(eventName: string, handler: EventHandler<T>): void {
    this.on(eventName, handler, { once: true });
  }

  public onceGlobal<T = any>(eventName: string, handler: EventHandler<T>): void {
    this.onGlobal(eventName, handler, { once: true });
  }

  public clearAll(): void {
    // 移除所有 DOM 事件监听
    if (this.isMounted) {
      for (const [eventName, eventSet] of this.events) {
        if (this.isDOMEvent(eventName)) {
          for (const { handler, options } of eventSet) {
            this.element.removeEventListener(eventName, handler as EventListener, {
              capture: options.capture,
            });
          }
        }
      }
    }

    // 清空所有队列
    this.events.clear();
    this.globalEvents.clear();
    this.pendingListeners = [];
    this.pendingEvents = [];
  }

  public clearGlobal(): void {
    // 清理该组件注册的所有全局事件
    for (const [eventName, eventSet] of this.globalEvents) {
      for (const { handler } of eventSet) {
        this.globalEventManager.removeGlobalListener(eventName, handler);
      }
    }
    this.globalEvents.clear();
  }

  public mount(): void {
    this.isMounted = true;

    // 处理所有待处理的监听器
    for (const { eventName, item } of this.pendingListeners) {
      if (this.isDOMEvent(eventName)) {
        this.element.addEventListener(eventName, item.handler as EventListener, {
          capture: item.options.capture,
          passive: item.options.passive,
        });
      }
    }
    this.pendingListeners = [];

    // 处理所有待处理的事件
    for (const { eventName, detail } of this.pendingEvents) {
      this.emit(eventName, detail);
    }
    this.pendingEvents = [];
  }

  public unmount(): void {
    this.isMounted = false;

    // 移除所有 DOM 事件监听器
    for (const [eventName, eventSet] of this.events) {
      if (this.isDOMEvent(eventName)) {
        for (const { handler, options } of eventSet) {
          this.element.removeEventListener(eventName, handler as EventListener, {
            capture: options.capture,
          });
        }
      }
    }

    // 清理该组件注册的所有全局事件
    this.clearGlobal();
  }

  private isDOMEvent(eventName: string): boolean {
    return STANDARD_DOM_EVENTS.includes(eventName.toLowerCase() as any);
  }

  public destroy(): void {
    this.attributeManager.destroy();
    this.clearAll();
  }

  /**
   * 同步当前的交互属性到目标元素
   */
  private syncInteractiveProperties(target: HTMLElement): void {
    // 同步基础交互属性
    INTERACTIVE_ATTRIBUTES.forEach((attr) => {
      this.syncAttribute(attr, target);
    });

    // 同步 ARIA 状态属性
    ARIA_STATE_ATTRIBUTES.forEach((attr) => {
      this.syncAttribute(attr, target);
    });

    // 处理上下文相关的 ARIA 属性
    ARIA_CONTEXT_ATTRIBUTES.forEach((attr) => {
      // 如果原始元素和目标元素都没有该属性，则同步
      // 这样可以保证至少有一个元素提供可访问性信息
      if (!this.element.hasAttribute(attr) && !target.hasAttribute(attr)) {
        this.syncAttribute(attr, target);
      }
    });

    // 同步样式
    const style = window.getComputedStyle(this.element);
    INTERACTIVE_STYLES.forEach((prop) => {
      const value = style.getPropertyValue(prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`));
      if (value && this.innerMostTrigger) {
        this.innerMostTrigger.element.style[prop] = value;
      }
    });
  }

  /**
   * 同步单个属性
   */
  private syncAttribute(attr: string, target: HTMLElement): void {
    if (this.element.hasAttribute(attr)) {
      target.setAttribute(attr, this.element.getAttribute(attr)!);
    } else {
      target.removeAttribute(attr);
    }
  }

  // 代理 AttributeManager 的方法
  public setAttribute(attr: string, value: string | number | boolean): void {
    this.attributeManager.setAttribute(attr, value);
  }

  public removeAttribute(attr: string): void {
    this.attributeManager.removeAttribute(attr);
  }

  // 代理 InteractionManager 的方法
  public focus(): void {
    this.interactionManager.focus();
  }

  public blur(): void {
    this.interactionManager.blur();
  }

  public click(): void {
    this.interactionManager.click();
  }
}
