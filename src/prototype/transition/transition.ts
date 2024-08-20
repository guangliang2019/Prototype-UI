/**
 * Prototype Transition with Web Component
 *
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/prototype/transition/transition.ts
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

export default class PrototypeTransition extends HTMLElement implements TransitionProps {
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

  constructor() {
    super();
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

    requestAnimationFrame(() => {
      this.removeAttribute('data-closed');
      this.setAttribute('data-entered', '');
      this.addEventListener('transitionend', this._onTransitionEnd, {
        once: true,
      });
    });
  }

  private _leave() {
    this.beforeLeave?.();

    requestAnimationFrame(() => {
      this.removeAttribute('data-entered');
      this.setAttribute('data-closed', '');
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
}

customElements.define('prototype-transition', PrototypeTransition);
