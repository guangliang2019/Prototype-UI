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

  private _open = DEFAULT_TRANSITION_PROPS['open'];
  // prettier-ignore
  get open() { return this._open; }
  set open(value: boolean) {
    const oldValue = this._open;
    this._open = value;
    if (oldValue !== value) {
      this.toggleAttribute('open', value);
      this.open
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
    return ['open', 'unmount', 'appear'];
  }

  connectedCallback() {
    if (this.appear && this.open) {
      this._transitionTo(TransitionState.Entering);
    }
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    const mapping: Record<string, any> = {
      'open': () => {
        this.open = newValue !== null;
        this.open
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

  // gl: this should be a arrow function, cause it's used in transitionend event listener's callback
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
