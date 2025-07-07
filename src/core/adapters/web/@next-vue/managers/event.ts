import { EVENT_MANAGER_SYMBOL, EventHandler, EventManager, EventOptions } from '@/core/interface';
import { getComponent } from '@/core/utils/component';
import {
  ARIA_CONTEXT_ATTRIBUTES,
  ARIA_STATE_ATTRIBUTES,
  EventItem,
  INTERACTIVE_ATTRIBUTES,
  PendingListener,
} from '../../@web-component/managers/event';
import { INTERACTIVE_STYLES, PendingEvent } from '../../@vue/managers/types';
import { AriaStateAttribute, InteractiveAttribute } from '@/core/interface/event';

class VueEventManager implements EventManager {
  /**
   *是否初始化过的标记
   */
  private _initFlag = false;
  private _focusPriority: number = -1;
  private static readonly MAX_PRIORITY = 1;
  private _rootRef: HTMLElement | null = null;
  private isTrigger = false;
  private childTriggers: Set<VueEventManager> = new Set();
  private innerMostTrigger: VueEventManager | null = null;
  private events: Map<string, Set<EventItem>> = new Map();
  private globalEvents: Map<string, Set<EventItem>> = new Map();
  private pendingListeners: PendingListener[] = [];
  private pendingEvents: PendingEvent[] = [];

  private _eventMap: Map<string, Set<EventHandler>> = new Map();
  private _pendingEvents: {
    eventName: string;
    handler: EventHandler;
    options?: EventOptions;
  }[] = [];

  private _checkInit(funcName: string) {
    if (this._initFlag) return;
    throw new Error(`[Vue Adapter] 不要在 setup 中使用 p.event.${funcName}`);
  }

  init(rootRef: HTMLElement) {
    this._initFlag = true;
    this._rootRef = rootRef;
  }

  on(eventName: string, handler: EventHandler, options?: EventOptions) {
    if (!this._eventMap.has(eventName)) {
      this._eventMap.set(eventName, new Set());
    }
    this._eventMap.get(eventName)?.add(handler);
    if (this._initFlag) {
      this._rootRef?.addEventListener(eventName, handler, options);
    } else {
      this._pendingEvents.push({ eventName, handler, options });
    }
  }

  off(eventName: string, handler: EventHandler) {
    this._eventMap.get(eventName)?.delete(handler);
    if (this._eventMap.get(eventName)?.size === 0) {
      this._eventMap.delete(eventName);
    }
    if (this._initFlag) {
      this._rootRef?.removeEventListener(eventName, handler);
    } else {
      this._pendingEvents = this._pendingEvents.filter(
        (event) => event.eventName !== eventName || event.handler !== handler
      );
    }
  }

  emit(eventName: string, detail: any) {
    this._checkInit('emit');
    this._rootRef?.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  once(eventName: string, handler: EventHandler) {
    if (this._initFlag) {
      this._rootRef?.addEventListener(eventName, handler, { once: true });
    } else {
      this._pendingEvents.push({ eventName, handler, options: { once: true } });
    }
  }

  clearAll() {
    if (this._initFlag) {
      this._eventMap.forEach((handlers, eventName) => {
        handlers.forEach((handler) => {
          this._rootRef?.removeEventListener(eventName, handler);
        });
      });
    } else {
      throw new Error(
        '[Vue Adapter] 可疑的内部错误，在 rootRef 不存在的情况下尝试调用 eventManager 的 clearAll 方法'
      );
    }
    this._eventMap.clear();
  }
  /**
   * 属性命令
   */
  // TODO: zhle
  setAttribute(
    attr: InteractiveAttribute | AriaStateAttribute,
    value: number | string | boolean
  ): void {
    this._rootRef?.setAttribute(attr, String(value));
  }
  removeAttribute(attr: InteractiveAttribute | AriaStateAttribute): void {
    this._rootRef?.removeAttribute(attr);
  }
  markAsTrigger() {
    this.isTrigger = true;
    this.findInnerMostTrigger();
  }

  mount() {
    if (!this._initFlag) {
      throw new Error('[Vue Adapter] 调用 mount 方法时, 需要先调用 init 方法');
    }
    this._pendingEvents.forEach((event) => {
      this.on(event.eventName, event.handler, event.options);
    });
    this._pendingEvents = [];
  }

  destroy() {
    if (this._initFlag) {
      this.clearAll();
    } else {
      throw new Error(
        '[Vue Adapter] 可疑的内部错误，在 rootRef 不存在的情况下尝试调用 eventManager 的 destroy 方法'
      );
    }
    this._initFlag = false;
    this._rootRef = null;
  }
  private static mapPriorityToTabIndex(priority: number): number {
    if (priority < 0) return -1;
    if (priority === 0) return 0;
    return Math.ceil(VueEventManager.MAX_PRIORITY / priority);
  }

  focus = {
    set: (focus: boolean) => {
      if (focus) {
        this._rootRef?.focus();
      } else {
        this._rootRef?.blur();
      }
    },
    setPriority: (priority: number) => {
      const tabIndex = VueEventManager.mapPriorityToTabIndex(priority);
      this._rootRef?.setAttribute('tabIndex', String(tabIndex));
      this._rootRef?.setAttribute('aria-focusable', String(priority >= 0));
      this._focusPriority = priority;
    },
    getPriority: () => {
      return this._focusPriority;
    },
  };
  /**
   * 查找最内层的 trigger
   */
  private findInnerMostTrigger(): void {
    // 清空之前的缓存
    this.childTriggers.clear();
    this.innerMostTrigger = null;

    // 查找所有子元素中的 trigger
    const childElements = Array.from(this._rootRef?.querySelectorAll('*') || []);
    const childTriggers = childElements
      .map((el) => this.findEventManager(el))
      .filter((manager): manager is VueEventManager => manager !== null && manager.isTrigger);

    if (childTriggers.length > 0) {
      this.childTriggers = new Set(childTriggers);
      // 找到最内层的 trigger（DOM 树最深的）
      this.innerMostTrigger = childTriggers.reduce((deepest, current) => {
        const deepestDepth = this.getElementDepth(deepest._rootRef!);
        const currentDepth = this.getElementDepth(current._rootRef!);
        return currentDepth > deepestDepth ? current : deepest;
      });

      // 同步当前的交互属性到最内层 trigger
      this.syncInteractiveProperties(this.innerMostTrigger._rootRef!);

      // 将当前的事件代理到最内层
      this.delegateEventsToInnerMost();
    }
  }
  /**
   * 从元素中获取 EventManager 实例
   */
  private findEventManager(element: Element): VueEventManager | null {
    const component = getComponent(element);
    return component?.[EVENT_MANAGER_SYMBOL] as VueEventManager | null;
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
      if (!this._rootRef?.hasAttribute(attr) && !target.hasAttribute(attr)) {
        this.syncAttribute(attr, target);
      }
    });

    // 同步样式
    const style = window.getComputedStyle(this._rootRef!);
    INTERACTIVE_STYLES.forEach((prop) => {
      const value = style.getPropertyValue(prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`));
      if (value && this.innerMostTrigger) {
        this.innerMostTrigger._rootRef!.style[prop] = value;
      }
    });
  }
  /**
   * 同步单个属性
   */
  private syncAttribute(attr: string, target: HTMLElement): void {
    if (this._rootRef?.hasAttribute(attr)) {
      target.setAttribute(attr, this._rootRef.getAttribute(attr)!);
    } else {
      target.removeAttribute(attr);
    }
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
}

export default VueEventManager;
