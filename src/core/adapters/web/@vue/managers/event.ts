import { 
  EventManager,   
  EventHandler,
  EventOptions,
  EVENT_MANAGER_SYMBOL, } from '@/core/interface';
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
import { getComponent } from '@/core/utils/component';
import { GlobalEventManager } from './global-event';
import { VueAttributeManagerImpl } from './attribute';
import { InteractionManager } from './interaction-manager';
export interface EventAction {
  setAttribute: (attr: string, value: string | number | boolean) => void;
  removeAttribute: (attr: string) => void;
  focus: () => void;
  blur: () => void;
  click: () => void;
  element: HTMLElement;
  isTrigger: boolean;
  onGlobal: (eventName: string, handler: EventHandler<any>, options?: EventOptions) => void;
  offGlobal: (eventName: string, handler: EventHandler<any>) => void;
  onceGlobal: (eventName: string, handler: EventHandler<any>) => void;
  clearGlobal: () => void;
}

export const createEventManager = (element: HTMLElement | null): EventManager & EventAction => {
  const _listeners = new Map<string, Set<Function>>();
  let _isTrigger = false;
  let _isMounted = false;
  let _element: HTMLElement | null = element;
  let _childTriggers: Set<EventManager & EventAction> = new Set();
  let _innerMostTrigger: (EventManager & EventAction) | null = null;
  let _events: Map<string, Set<EventItem>> = new Map();
  let _pendingListeners: PendingListener[] = [];
  let _pendingEvents: PendingEvent[] = [];
  let _globalEvents: Map<string, Set<EventItem>> = new Map();
  let _globalEventManager = GlobalEventManager.getInstance();
  let attributeManager = VueAttributeManagerImpl(_element || document.createElement('div'), _element || document.createElement('div'));
  let interactionManager = InteractionManager(_element || document.createElement('div'), _element || document.createElement('div'));

  const ensureElement = () => {
    if (!_element) {
      throw new Error('Element is not initialized');
    }
    return _element;
  };

  /**
   * 从元素中获取 EventManager 实例
   */
  const findEventManager = (element: Element): EventManager & EventAction | null => {
    const component = getComponent(element);
    return component?.[EVENT_MANAGER_SYMBOL] as EventManager & EventAction | null;
  }
  
  /**
   * 获取元素在 DOM 树中的深度
   */
  const getElementDepth = (element: Element): number => {
    let depth = 0;
    let current = element;
    while (current.parentElement) {
      depth++;
      current = current.parentElement;
    }
    return depth;
  }

  /**
   * 同步单个属性
   */
  const syncAttribute = (attr: string, target: HTMLElement): void => {
    const element = ensureElement();
    if (element.hasAttribute(attr)) {
      target.setAttribute(attr, element.getAttribute(attr)!);
    } else {
      target.removeAttribute(attr);
    }
  }

  const findInnerMostTrigger = () => {
    const element = ensureElement();
    _childTriggers.clear();
    _innerMostTrigger = null;

    const childElements = Array.from(element.querySelectorAll('*'));
    const childTrigger = childElements
      .map((el) => findEventManager(el))
      .filter((manager): manager is EventManager & EventAction => manager !== null && manager.isTrigger);

    if (childTrigger.length > 0) {
      _childTriggers = new Set(childTrigger);
      _innerMostTrigger = childTrigger.reduce((deepest, current) => {
        const deepestDepth = getElementDepth(deepest.element);
        const currentDepth = getElementDepth(current.element);
        return currentDepth > deepestDepth ? current : deepest;
      });
        
      // 同步当前的交互属性到最内层 trigger
      syncInteractiveProperties(_innerMostTrigger.element);

      // 将当前的事件代理到最内层
      delegateEventsToInnerMost();
    }
  }
  
  /**
   * 同步当前的交互属性到目标元素
   */
  const syncInteractiveProperties = (target: HTMLElement): void => {
    const element = ensureElement();
    // 同步基础交互属性
    INTERACTIVE_ATTRIBUTES.forEach((attr) => {
      syncAttribute(attr, target);
    });

    // 同步 ARIA 状态属性
    ARIA_STATE_ATTRIBUTES.forEach((attr) => {
      syncAttribute(attr, target);
    });

    // 处理上下文相关的 ARIA 属性
    ARIA_CONTEXT_ATTRIBUTES.forEach((attr) => {
      // 如果原始元素和目标元素都没有该属性，则同步
      // 这样可以保证至少有一个元素提供可访问性信息
      if (!element.hasAttribute(attr) && !target.hasAttribute(attr)) {
        syncAttribute(attr, target);
      }
    });

    // 同步样式
    const style = window.getComputedStyle(element);
    INTERACTIVE_STYLES.forEach((prop) => {
      const value = style.getPropertyValue(prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`));
      if (value && _innerMostTrigger) {
        (_innerMostTrigger.element as unknown as HTMLElement).style[prop] = value;
      }
    });
  }

  const emit = <T = any>(eventName: string, detail: T): void => {
    // 如果是 trigger 且有最内层 trigger，则代理触发
    if (_isTrigger && _innerMostTrigger) {
      _innerMostTrigger.emit(eventName, detail);
      return;
    }

    // 如果组件未挂载，将事件加入待处理队列
    if (!_isMounted) {
      _pendingEvents.push({ eventName, detail });
      return;
    }

    // 触发本地事件
    const eventSet = _events.get(eventName);
    if (eventSet) {
      if (isDOMEvent(eventName)) {
        const element = ensureElement();
        const event = new CustomEvent(eventName, { detail });
        element.dispatchEvent(event);
      } else {
        for (const { handler } of eventSet) {
          handler(detail);
        }
      }
    }

    // 触发全局事件
    _globalEventManager.emit(eventName, detail);
  }

  const clearAll = (): void => {
    // 移除所有 DOM 事件监听
    if (_isMounted) {
      const element = ensureElement();
      for (const [eventName, eventSet] of _events) {
        if (isDOMEvent(eventName)) {
          for (const { handler, options } of eventSet) {
            element.removeEventListener(eventName, handler as EventListener, {
              capture: options.capture,
            });
          }
        }
      }
    }

    // 清空所有队列
    _events.clear();
    _pendingListeners = [];
    _pendingEvents = [];
  }

  const on = <T = any>(
    eventName: string,
    handler: EventHandler<T>,
    options: EventOptions = {}
  ): void => {
    // 如果是 trigger 且有最内层 trigger，则代理事件
    if (_isTrigger && _innerMostTrigger) {
      _innerMostTrigger.on(eventName, handler, options);
      return;
    }

    if (!_events.has(eventName)) {
      _events.set(eventName, new Set());
    }

    const eventSet = _events.get(eventName)!;
    const eventItem: EventItem = { handler, options };
    eventSet.add(eventItem);

    // 如果组件已挂载，直接添加监听器
    if (_isMounted && isDOMEvent(eventName)) {
      const element = ensureElement();
      element.addEventListener(eventName, handler as EventListener, {
        capture: options.capture,
      });
    }
  }

  const off = <T = any>(eventName: string, handler: EventHandler<T>): void => {
    const eventSet = _events.get(eventName);
    if (!eventSet) return;

    // 找到并移除对应的事件项
    for (const eventItem of eventSet) {
      if (eventItem.handler === handler) {
        eventSet.delete(eventItem);

        // 如果已挂载且是 DOM 事件，移除监听器
        if (_isMounted && isDOMEvent(eventName)) {
          const element = ensureElement();
          element.removeEventListener(eventName, handler as EventListener, {
            capture: eventItem.options.capture,
          });
        }

        // 从待处理队列中移除
        _pendingListeners = _pendingListeners.filter(
          (item) => !(item.eventName === eventName && item.item.handler === handler)
        );
      }
    }

    // 如果没有更多处理器，删除整个事件集合
    if (eventSet.size === 0) {
      _events.delete(eventName);
    }
  }

  const clearGlobal = (): void => {
    // 清理该组件注册的所有全局事件
    for (const [eventName, eventSet] of _events) {
      for (const { handler } of eventSet) {
        _globalEventManager.removeGlobalListener(eventName, handler);
      }
    }
    _events.clear();
  }

  const onGlobal=<T=any> (eventName: string, handler: EventHandler<T>, options: EventOptions = {}) => {
    if (!_globalEvents.has(eventName)) {
      _globalEvents.set(eventName, new Set());
    }
    const eventSet = _globalEvents.get(eventName)!;
    const eventItem: EventItem = { handler, options };
    eventSet.add(eventItem);
    _globalEventManager.addGlobalListener(eventName, handler, options);
  }

  const offGlobal = <T = any>(eventName: string, handler: EventHandler<T>) => {
    const eventSet = _globalEvents.get(eventName);
    if (!eventSet) return;

    // 找到并移除对应的事件项
    for (const eventItem of eventSet) {
      if (eventItem.handler === handler) {
        eventSet.delete(eventItem);
      }
    }
  }

  const onceGlobal = <T = any>(eventName: string, handler: EventHandler<T>) => {  
    onGlobal(eventName, handler, { once: true });
  }

  const isDOMEvent = (eventName: string): boolean => {
    return STANDARD_DOM_EVENTS.includes(eventName.toLowerCase() as any);
  }

  const markAsTrigger = () => {
    _isTrigger = true;
    findInnerMostTrigger();
  }

  const mount = () => {
    if (_isMounted) return;
    _isMounted = true;
    findInnerMostTrigger();
  }

  const unmount = () => {
    _isMounted = false;

    // 移除所有 DOM 事件监听器
    for (const [eventName, eventSet] of _events) {
      if (isDOMEvent(eventName)) {
        for (const { handler, options } of eventSet) {
          const element = ensureElement();
          element.removeEventListener(eventName, handler as EventListener, {
            capture: options.capture,
          });
        }
      }
    }
  
    // 清理该组件注册的所有全局事件
    clearGlobal();
  }

  const destroy = () => {
    attributeManager.destroy();
    clearAll();
  }

  const setAttribute = (attr: string, value: string | number | boolean) => {
    attributeManager.setAttribute(attr, value);
  }

  const removeAttribute = (attr: string) => {
    attributeManager.removeAttribute(attr);
  }

  const focus = () => {
    const element = ensureElement();
    element.focus();
  }

  const blur = () => {
    const element = ensureElement();
    element.blur();
  }

  const click = () => {
    const element = ensureElement();
    element.click();
  }

  const updateElement = (element: HTMLElement) => {
    _element = element;
    // 重新创建属性管理器和交互管理器
    attributeManager = VueAttributeManagerImpl(element, element);
    interactionManager = InteractionManager(element, element);
  }

  const addEventListener = (type: string, listener: Function) => {
    const element = ensureElement();
    // ... 原有逻辑 ...
  }

  const removeEventListener = (type: string, listener: Function) => {
    const element = ensureElement();
    // ... 原有逻辑 ...
  }

  const dispatchEvent = (event: Event) => {
    const element = ensureElement();
    // ... 原有逻辑 ...
  }

  const delegateEventsToInnerMost = (): void => {
    if (!_innerMostTrigger) return;

    // 将所有已注册的事件代理到最内层
    for (const [eventName, eventSet] of _events) {
      for (const item of eventSet) {
        _innerMostTrigger.on(eventName, item.handler, item.options);
      }
    }

    // 将所有待处理的事件监听器代理到最内层
    for (const { eventName, item } of _pendingListeners) {
      _innerMostTrigger.on(eventName, item.handler, item.options);
    }

    // 将所有待处理的事件触发代理到最内层
    for (const { eventName, detail } of _pendingEvents) {
      _innerMostTrigger.emit(eventName, detail);
    }

    // 清空本地队列
    _events.clear();
    _pendingListeners = [];
    _pendingEvents = [];
  }

  const once = <T = any>(eventName: string, handler: EventHandler<T>): void => {
    on(eventName, handler, { once: true });
  };

  return {
    element: ensureElement(),
    isTrigger: _isTrigger,
    on,
    off,
    once,
    onGlobal,
    offGlobal,
    onceGlobal,
    clearGlobal,
    emit,
    clearAll,
    markAsTrigger,
    mount,
    unmount,
    destroy,
    setAttribute,
    removeAttribute,
    focus,
    blur,
    click,
  };
}; 