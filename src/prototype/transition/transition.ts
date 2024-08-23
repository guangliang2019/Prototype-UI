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

  static get observedAttributes() {
    return ['show', 'unmount', 'appear'];
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

    this.removeAttribute('data-closed');
    this.setAttribute('data-entered', '');
    this.setAttribute('data-enter', '');

    requestAnimationFrame(() => {
      this.addEventListener('transitionend', this._onTransitionEnd, {
        once: true,
      });
    });
  }

  private _leave() {
    this.beforeLeave?.();

    this.removeAttribute('data-entered');
    this.setAttribute('data-leave', '');
    this.setAttribute('data-closed', '');

    requestAnimationFrame(() => {
      this.addEventListener('transitionend', this._onTransitionEnd, {
        once: true,
      });
    });
  }

  // gl: this shuold be a arrow function, cause it's used in transitionend event listener's callback
  private _onTransitionEnd = () => {
    if (this._state === TransitionState.Entering) {
      this._transitionTo(TransitionState.Entered);
      this.removeAttribute('data-enter');
    } else if (this._state === TransitionState.Leaving) {
      this._transitionTo(TransitionState.Left);
      this.removeAttribute('data-leave');
    }
  };
}

customElements.define('prototype-transition', PrototypeTransition);
