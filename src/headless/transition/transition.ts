import { TransitionProps } from './interface';

enum TransitionState {
  Idle = 'idle',
  Entering = 'entering',
  Entered = 'entered',
  Leaving = 'leaving',
  Left = 'left',
}

export class HeadlessTransition extends HTMLElement implements TransitionProps {
  private state: TransitionState = TransitionState.Idle;

  // Properties
  private _show = true;

  get show() {
    return this._show;
  }

  set show(value: boolean) {
    const oldValue = this._show;
    this._show = value;
    if (oldValue !== value) {
      this.toggleAttribute('show', value);
      this.show
        ? this.transitionTo(TransitionState.Entering)
        : this.transitionTo(TransitionState.Leaving);
    }
  }

  unmount = false;
  appear = false;
  beforeEnter?: () => void;
  afterEnter?: () => void;
  beforeLeave?: () => void;
  afterLeave?: () => void;
  beforeEnterClass = '';
  afterEnterClass = '';
  beforeLeaveClass = '';
  afterLeaveClass = '';

  constructor() {
    super();
    this.beforeEnterClass = this.className;
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
      'before-enter-class',
      'after-enter-class',
      'before-leave-class',
      'after-leave-class',
    ];
  }

  connectedCallback() {
    if (this.appear && this.show) {
      this.transitionTo(TransitionState.Entering);
    }
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    const mapping: Record<string, any> = {
      'show': () => {
        this.show = newValue !== null;
        this.show
          ? this.transitionTo(TransitionState.Entering)
          : this.transitionTo(TransitionState.Leaving);
      },
      'unmount': () => (this.unmount = newValue !== null),
      'appear': () => (this.appear = newValue !== null),
      'before-enter': () => (this.beforeEnter = new Function(newValue) as () => void),
      'after-enter': () => (this.afterEnter = new Function(newValue) as () => void),
      'before-leave': () => (this.beforeLeave = new Function(newValue) as () => void),
      'after-leave': () => (this.afterLeave = new Function(newValue) as () => void),
      'before-enter-class': () => (this.beforeEnterClass = newValue),
      'after-enter-class': () => (this.afterEnterClass = newValue),
      'before-leave-class': () => (this.beforeLeaveClass = newValue),
      'after-leave-class': () => (this.afterLeaveClass = newValue),
    };

    mapping[name]?.();
  }

  private transitionTo(newState: TransitionState) {
    this.removeEventListener('transitionend', this.onTransitionEnd);
    this.state = newState;

    switch (newState) {
      case TransitionState.Entering:
        this.enter();
        break;
      case TransitionState.Leaving:
        this.leave();
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

  private enter() {
    this.beforeEnter?.();
    this.resetTransitionClasses();
    if (this.beforeEnterClass) this.classList.add(this.beforeEnterClass);

    requestAnimationFrame(() => {
      if (this.beforeEnterClass) this.classList.remove(this.beforeEnterClass);
      if (this.afterEnterClass) this.classList.add(this.afterEnterClass);
      this.addEventListener('transitionend', this.onTransitionEnd, {
        once: true,
      });
    });
  }

  private leave() {
    this.beforeLeave?.();
    this.resetTransitionClasses();
    if (this.beforeLeaveClass) this.classList.add(this.beforeLeaveClass);

    requestAnimationFrame(() => {
      if (this.beforeLeaveClass) this.classList.remove(this.beforeLeaveClass);
      if (this.afterLeaveClass) this.classList.add(this.afterLeaveClass);
      this.addEventListener('transitionend', this.onTransitionEnd, {
        once: true,
      });
    });
  }

  private onTransitionEnd = () => {
    if (this.state === TransitionState.Entering) {
      this.transitionTo(TransitionState.Entered);
    } else if (this.state === TransitionState.Leaving) {
      this.transitionTo(TransitionState.Left);
    }
  };

  private resetTransitionClasses() {
    this.classList.remove(
      this.beforeEnterClass,
      this.afterEnterClass,
      this.beforeLeaveClass,
      this.afterLeaveClass
    );
  }
}

customElements.define('headless-transition', HeadlessTransition);
