/**
 * asTrigger Hook - Prototype UI
 *
 * @link TODO: add link after release
 * @author guangliang2019
 * @date 2025-02-10
 */

import { Component, Prototype } from '../interface';
import { watchAttribute, useConnect, useCreated, useDisconnect } from '../lifecycle';
import { dfsFindElement } from '../utils/dom';

export const asTriggerFlag = Symbol('asTriggerFlag');
const _super = HTMLElement.prototype;

const addEventListenerFactory = (component: Component, state: TriggerState) => {
  return (...args: Parameters<HTMLElement['addEventListener']>): void => {
    const { _target, _pendingEventListeners } = state;
    if (_target === null) throw new Error('Trigger can not found _target');
    if (_target) {
      _target === component
        ? _super.addEventListener.call(component, ...args)
        : _target.addEventListener(...args);
    } else {
      _pendingEventListeners.push(args);
    }
  };
};

const removeEventListenerFactory = (component: Component, state: TriggerState) => {
  return (...args: Parameters<HTMLElement['removeEventListener']>): void => {
    const { _target } = state;
    _target === component
      ? _super.removeEventListener.call(component, ...args)
      : _target?.removeEventListener(...args);
  };
};

const dispatchEventFactory = (component: Component, state: TriggerState) => {
  return (event: Event): boolean => {
    const { _target, _pendingDispatchEvents } = state;
    if (_target) {
      return _target === component
        ? _super.dispatchEvent.call(component, event)
        : _target.dispatchEvent(event);
    } else {
      _pendingDispatchEvents.push(event);
    }
    return false;
  };
};

const focusFactory = (component: Component, state: TriggerState) => {
  return (options?: FocusOptions) => {
    const { _target } = state;
    _target === component ? _super.focus.call(component, options) : _target?.focus(options);
  };
};

const blurFactory = (component: Component, state: TriggerState) => {
  return () => {
    const { _target } = state;
    _target === component ? _super.blur.call(component) : _target?.blur();
  };
};

const isTrigger = (el: any): boolean => {
  return el?.prototypeRef?.[asTriggerFlag] === true;
};

interface TriggerState {
  _target: HTMLElement | null;
  _pendingEventListeners: Parameters<HTMLElement['addEventListener']>[];
  _pendingDispatchEvents: Event[];
}

/**
 * asTrigger 钩子，调用后当前组件会被标记为 Trigger 组件
 *
 * Trigger 组件的核心特性只有一个，即嵌套的多个 Trigger 会合并他们携带的交互事件到最内层的 Trigger
 *
 * 在连接进 DOM 之前，需要添加的 EventListener 会被暂存，在 connected 时添加
 *
 * 同理，在连接进 DOM 之前，dispatchEvent 会被暂存，在 connected 时触发
 */
export const asTrigger = (p: Prototype) => {
  const state: TriggerState = {
    _target: null,
    _pendingEventListeners: [],
    _pendingDispatchEvents: [],
  };

  // 提前为 self 打上 trigger 标记，用于 isTrigger 判断
  useCreated(p, () => {
    const component = p.componentRef;
    p[asTriggerFlag] = true;
    component.addEventListener = addEventListenerFactory(component, state);
    component.removeEventListener = removeEventListenerFactory(component, state);
    component.dispatchEvent = dispatchEventFactory(component, state);
    component.focus = focusFactory(component, state);
    component.blur = blurFactory(component, state);
    // TODO: more actions need to be proxied
  });

  useConnect(p, () => {
    const component = p.componentRef;
    const target = dfsFindElement(component, (el) => {
      if (!isTrigger(el)) return false;
      const children = el.children;
      const triggerChildren: Element[] = [];
      for (let i = 0; i < children.length; i++) {
        if (isTrigger(children[i])) triggerChildren.push(children[i]);
      }
      if (triggerChildren.length === 1) return false;

      return true;
    }) as HTMLElement;

    state._target = target;

    state._pendingEventListeners.forEach((args) => component.addEventListener(...args));
    state._pendingDispatchEvents.forEach((event) => component.dispatchEvent(event));

    state._target === component ? (component.tabIndex = 0) : (component.tabIndex = -1);
  });

  watchAttribute(p, 'tabindex', (oldValue, newValue) => {
    const component = p.componentRef;
    if (state._target !== component && newValue !== null && oldValue !== newValue) {
      state._target!.tabIndex = Number(newValue);
      component.removeAttribute('tabindex');
    }
  });
};
