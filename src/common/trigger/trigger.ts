/**
 * Prototype Transition with Web Component
 *
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/prototype/trigger/trigger.ts
 * @author guangliang2019
 * @date 2024-08-28
 */

import { ContextConsumer } from '@/common';
import { dfsFindElement } from '@/www/utils/dom';

/**
 * Trigger 组件，能够有效解决 Trigger 嵌套时的事件冲突问题
 * Trigger 组件会代理各种 DOM 事件和监听，并移交给 _target
 *
 * _target 的寻找规则：多层嵌套的 Trigger，最内层的一个 Trigger 为 _target
 *
 * 在连接进 DOM 之前，需要添加的 EventListener 会被暂存，在 connectedCallback 时为 _target 添加
 * 同理，在连接进 DOM 之前，dispatchEvent 会被暂存，在 connectedCallback 时触发
 */
export default abstract class Trigger<
  T extends Record<string, Object> = {}
> extends ContextConsumer<T> {
  protected _consumerKeys = new Set(['prototype-trigger']);
  protected _target?: HTMLElement;
  protected _pendingEventListeners: Parameters<HTMLElement['addEventListener']>[] = [];
  protected _pendingDispatchEvents: Event[] = [];

  addEventListener(...args: Parameters<HTMLElement['addEventListener']>): void {
    if (this._target) {
      this._target === this
        ? super.addEventListener(...args)
        : this._target.addEventListener(...args);
    } else {
      this._pendingEventListeners.push(args);
    }
  }

  removeEventListener(...args: Parameters<HTMLElement['removeEventListener']>): void {
    this._target === this
      ? super.removeEventListener(...args)
      : this._target!.removeEventListener(...args);
  }

  dispatchEvent(event: Event): boolean {
    if (this._target) {
      return this._target === this ? super.dispatchEvent(event) : this._target.dispatchEvent(event);
    } else {
      this._pendingDispatchEvents.push(event);
    }
    return false;
  }

  focus = (options?: FocusOptions) => {
    this._target === this ? super.focus(options) : this._target?.focus(options);
  };

  blur = () => (this._target === this ? super.blur : this._target?.blur());

  connectedCallback() {
    super.connectedCallback();
    if (this.children.length > 1) {
      throw new Error('Trigger 组件最多只允许有一个子元素。');
    }
    // 寻找最内层的 Trigger
    const target = dfsFindElement(this, (el) => {
      if (!(el instanceof Trigger)) return false;
      const children = el.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i] instanceof Trigger) return false;
      }
      return true;
    }) as HTMLElement;

    this._target = target;

    this._pendingEventListeners.forEach((args) => this.addEventListener(...args));
    this._pendingDispatchEvents.forEach((event) => this.dispatchEvent(event));

    this._target === this ? (this.tabIndex = 0) : (this.tabIndex = -1);
  }

  static get observedAttributes(): string[] {
    return ['tabindex'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (
      this._target !== this &&
      name === 'tabindex' &&
      newValue !== null &&
      oldValue !== newValue
    ) {
      this._target!.tabIndex = Number(newValue);
      this.removeAttribute('tabindex');
    }
  }
}
