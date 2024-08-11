/**
 * Headless Transition with Web Component
 * 
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/headless/transition/transition.ts
 * @author guangliang2019
 * @date 2024-08-11
 */

import { DEFAULT_TRANSITION_PROPS, TransitionProps } from './interface';

enum TransitionState {
  Idle = 'idle',
  Entering = 'entering',
  Entered = 'entered',
  Leaving = 'leaving',
  Left = 'left',
}

export default class HeadlessTransition extends HTMLElement implements TransitionProps {
  private _state: TransitionState = TransitionState.Idle;

  private _show = DEFAULT_TRANSITION_PROPS['show'];
  // prettier-ignore
  get show() { return this._show; }
  set show(value: boolean) {
    const oldValue = this._show;
    this._show = value;
    if (oldValue !== value) {
      this.toggleAttribute('show', value);
      this.show
        ? this._transitionTo(TransitionState.Entering)
        : this._transitionTo(TransitionState.Leaving);
    }
  }

  appear = DEFAULT_TRANSITION_PROPS['appear'];
  unmount = DEFAULT_TRANSITION_PROPS['unmount'];

  beforeEnter?: () => void = DEFAULT_TRANSITION_PROPS['beforeEnter'];
  afterEnter?: () => void = DEFAULT_TRANSITION_PROPS['afterEnter'];
  beforeLeave?: () => void = DEFAULT_TRANSITION_PROPS['beforeLeave'];
  afterLeave?: () => void = DEFAULT_TRANSITION_PROPS['afterLeave'];

  private _beforeEnterClass = '';
  afterEnterClass = DEFAULT_TRANSITION_PROPS['afterEnterClass'];
  afterLeaveClass = DEFAULT_TRANSITION_PROPS['afterLeaveClass'];

  constructor() {
    super();
    this._beforeEnterClass = this.className;
  }

  static get observedAttributes() {
    return [
      'show',
      'unmount',
      'appear',
      'before-enter',
      'after-enter',
      'before-leave',
      'after-leave',
      'after-enter-class',
      'after-leave-class',
    ];
  }

  connectedCallback() {
    if (this.appear && this.show) {
      this._transitionTo(TransitionState.Entering);
    }
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    const mapping: Record<string, any> = {
      'show': () => {
        this.show = newValue !== null;
        this.show
          ? this._transitionTo(TransitionState.Entering)
          : this._transitionTo(TransitionState.Leaving);
      },
      'unmount': () => (this.unmount = newValue !== null),
      'appear': () => (this.appear = newValue !== null),
      'before-enter': () => (this.beforeEnter = new Function(newValue) as () => void),
      'after-enter': () => (this.afterEnter = new Function(newValue) as () => void),
      'before-leave': () => (this.beforeLeave = new Function(newValue) as () => void),
      'after-leave': () => (this.afterLeave = new Function(newValue) as () => void),
      'after-enter-class': () => (this.afterEnterClass = newValue),
      'after-leave-class': () => (this.afterLeaveClass = newValue),
    };

    mapping[name]?.();
  }

  private _transitionTo(newState: TransitionState) {
    this.removeEventListener('transitionend', this._onTransitionEnd);
    this._state = newState;

    switch (newState) {
      case TransitionState.Entering:
        this._enter();
        break;
      case TransitionState.Leaving:
        this._leave();
        break;
      case TransitionState.Entered:
        this.afterEnter?.();
        break;
      case TransitionState.Left:
        this.afterLeave?.();
        if (this.unmount) this.remove();
        break;
    }
  }

  private _enter() {
    this.beforeEnter?.();
    this._resetTransitionClasses();
    if (this._beforeEnterClass) this.classList.add(this._beforeEnterClass);

    requestAnimationFrame(() => {
      if (this._beforeEnterClass) this.classList.remove(this._beforeEnterClass);
      if (this.afterEnterClass) this.classList.add(this.afterEnterClass);
      this.addEventListener('transitionend', this._onTransitionEnd, {
        once: true,
      });
    });
  }

  private _leave() {
    this.beforeLeave?.();
    this._resetTransitionClasses();

    requestAnimationFrame(() => {
      if (this.afterEnterClass) this.classList.remove(this.afterEnterClass);
      if (this.afterLeaveClass) this.classList.add(this.afterLeaveClass);
      this.addEventListener('transitionend', this._onTransitionEnd, {
        once: true,
      });
    });
  }

  // gl: this shuold be a arrow function, cause it's used in transitionend event listener's callback
  private _onTransitionEnd = () => {
    if (this._state === TransitionState.Entering) {
      this._transitionTo(TransitionState.Entered);
    } else if (this._state === TransitionState.Leaving) {
      this._transitionTo(TransitionState.Left);
    }
  };

  private _resetTransitionClasses() {
    this.classList.remove(this._beforeEnterClass, this.afterEnterClass, this.afterLeaveClass);
  }
}

customElements.define('headless-transition', HeadlessTransition);
