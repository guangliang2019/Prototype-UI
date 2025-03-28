import {
  EventManager as IEventManager,
  EventHandler,
  EventOptions,
  EVENT_MANAGER_SYMBOL,
} from '@/next-core/interface';
import { getComponent } from '../../../utils/component';

interface EventItem {
  handler: EventHandler;
  options: EventOptions;
}

interface PendingEvent<T = any> {
  eventName: string;
  detail: T;
}

/**
 * 需要代理的基础交互属性
 */
const INTERACTIVE_ATTRIBUTES = ['tabIndex', 'disabled', 'contentEditable', 'draggable'] as const;

/**
 * 需要代理的 ARIA 状态属性
 * 这些属性描述了元素的交互状态，应该跟随实际的交互元素
 */
const ARIA_STATE_ATTRIBUTES = [
  'aria-pressed',
  'aria-expanded',
  'aria-selected',
  'aria-checked',
  'aria-disabled',
  'aria-hidden',
  'aria-invalid',
] as const;

/**
 * 不需要代理的 ARIA 关系属性
 * 这些属性描述了组件间的逻辑关系，应该保持在原始元素上
 */
const ARIA_RELATION_ATTRIBUTES = [
  'aria-controls',
  'aria-owns',
  'aria-describedby',
  'aria-labelledby',
  'aria-details',
] as const;

/**
 * 需要根据上下文决定是否代理的 ARIA 属性
 * 这些属性可能需要特殊处理
 */
const ARIA_CONTEXT_ATTRIBUTES = [
  'aria-label', // 可能需要保留在原始元素上作为组件描述
  'aria-description', // 可能需要保留在原始元素上作为组件描述
] as const;

/**
 * 需要同步的样式属性列表
 */
const INTERACTIVE_STYLES = ['pointerEvents', 'userSelect', 'cursor'] as const;

export class EventManager implements IEventManager {
  private events: Map<string, Set<EventItem>> = new Map();
  private element: HTMLElement;
  private isMounted = false;
  private isTrigger = false;
  private pendingListeners: Array<{ eventName: string; item: EventItem }> = [];
  private pendingEvents: PendingEvent[] = [];
  private childTriggers: Set<EventManager> = new Set();
  private innerMostTrigger: EventManager | null = null;
  private attributeObserver: MutationObserver | null = null;
  private styleObserver: MutationObserver | null = null;

  constructor(element: HTMLElement) {
    this.element = element;
    this.setupAttributeObserver();
    this.setupStyleObserver();
  }

  /**
   * 设置属性观察器
   */
  private setupAttributeObserver(): void {
    this.attributeObserver = new MutationObserver((mutations) => {
      if (!this.isTrigger || !this.innerMostTrigger) return;

      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          const attr = mutation.attributeName!;

          // 只同步基础交互属性和状态型 ARIA 属性
          if (
            INTERACTIVE_ATTRIBUTES.includes(attr as any) ||
            ARIA_STATE_ATTRIBUTES.includes(attr as any)
          ) {
            this.syncAttribute(attr, this.innerMostTrigger.element);
          }
          // 对于上下文相关的 ARIA 属性，只在特定条件下同步
          else if (
            ARIA_CONTEXT_ATTRIBUTES.includes(attr as any) &&
            !this.innerMostTrigger.element.hasAttribute(attr)
          ) {
            this.syncAttribute(attr, this.innerMostTrigger.element);
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
      if (!this.isTrigger || !this.innerMostTrigger) return;

      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const style = window.getComputedStyle(this.element);
          INTERACTIVE_STYLES.forEach((prop) => {
            const value = style.getPropertyValue(
              prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
            );
            if (value) {
              this.innerMostTrigger!.element.style[prop] = value;
            }
          });
        }
      }
    });
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

  /**
   * 将组件标记为 trigger
   */
  public markAsTrigger(): void {
    this.isTrigger = true;
    this.findInnerMostTrigger();

    // 开始观察属性变化
    if (this.attributeObserver) {
      this.attributeObserver.observe(this.element, {
        attributes: true,
        attributeFilter: [
          ...INTERACTIVE_ATTRIBUTES,
          ...ARIA_STATE_ATTRIBUTES,
          ...ARIA_CONTEXT_ATTRIBUTES,
        ],
      });
    }

    // 开始观察样式变化
    if (this.styleObserver) {
      this.styleObserver.observe(this.element, {
        attributes: true,
        attributeFilter: ['style'],
      });
    }
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

    const eventSet = this.events.get(eventName);
    if (!eventSet) return;

    // 如果是 DOM 事件，创建并分发自定义事件
    if (this.isDOMEvent(eventName)) {
      const event = new CustomEvent(eventName, { detail });
      this.element.dispatchEvent(event);
    } else {
      // 对于非 DOM 事件，直接调用处理器
      for (const { handler } of eventSet) {
        handler(detail);
      }
    }
  }

  public once<T = any>(eventName: string, handler: EventHandler<T>): void {
    this.on(eventName, handler, { once: true });
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
    this.pendingListeners = [];
    this.pendingEvents = [];
  }

  /**
   * 组件挂载时调用
   */
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

  /**
   * 组件卸载时调用
   */
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
  }

  private isDOMEvent(eventName: string): boolean {
    // 简单判断是否为标准 DOM 事件
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

  public destroy(): void {
    this.attributeObserver?.disconnect();
    this.styleObserver?.disconnect();
    this.attributeObserver = null;
    this.styleObserver = null;
    this.clearAll();
  }

  /**
   * 基础交互方法
   */
  public focus(): void {
    if (this.isTrigger && this.innerMostTrigger) {
      this.innerMostTrigger.element.focus();
    } else {
      this.element.focus();
    }
  }

  public blur(): void {
    if (this.isTrigger && this.innerMostTrigger) {
      this.innerMostTrigger.element.blur();
    } else {
      this.element.blur();
    }
  }

  public click(): void {
    if (this.isTrigger && this.innerMostTrigger) {
      this.innerMostTrigger.element.click();
    } else {
      this.element.click();
    }
  }

  /**
   * 属性操作方法
   */
  public setAttribute(attr: string, value: string | number | boolean): void {
    const target =
      this.isTrigger && this.innerMostTrigger ? this.innerMostTrigger.element : this.element;

    if (typeof value === 'boolean') {
      if (value) {
        target.setAttribute(attr, '');
      } else {
        target.removeAttribute(attr);
      }
    } else {
      target.setAttribute(attr, String(value));
    }
  }

  public removeAttribute(attr: string): void {
    const target =
      this.isTrigger && this.innerMostTrigger ? this.innerMostTrigger.element : this.element;
    target.removeAttribute(attr);
  }
}
