import { PrototypeAPI } from '@/core/interface';
import {
  DEFAULT_TRANSITION_PROPS,
  TransitionExposes,
  TransitionContext,
  TransitionProps,
  TransitionStateEnum,
  TransitionStates,
} from './interface';

const asTransition = <Props extends TransitionProps, Exposes extends TransitionExposes>(
  p: PrototypeAPI<Props, Exposes>
): {
  states: TransitionStates;
} => {
  // props
  p.props.define(DEFAULT_TRANSITION_PROPS as Props);
  p.props.watch(['show'], (value) => {
    value ? enter() : leave();
  });

  // states
  const state = p.state.define<TransitionStateEnum>('idle');
  const _closed = p.state.define(false, 'data-closed');
  const _enter = p.state.define(false, 'data-enter');
  const _leave = p.state.define(false, 'data-leave');

  // attributes
  p.state.watch(state, (value) => {
    switch (value) {
      case 'closed':
        _closed.set(true);
        _enter.set(false);
        _leave.set(false);
        break;
      case 'enter':
        _closed.set(false);
        _enter.set(true);
        _leave.set(false);
        break;
      case 'leave':
        _closed.set(false);
        _enter.set(false);
        _leave.set(true);
        break;
      case 'idle':
        _closed.set(false);
        _enter.set(false);
        _leave.set(false);
        break;
    }
  });

  let currTimeout: NodeJS.Timeout | null = null;

  const enter = () => {
    if (state.value === 'idle') return;
    if (currTimeout) {
      clearTimeout(currTimeout);
      currTimeout = null;
    }
    const element = p.view.getElement();
    element.style.display = 'unset';
    requestAnimationFrame(() => {
      state.set('enter');
      currTimeout = setTimeout(() => {
        if (state.value !== 'enter') return;
        state.set('idle');
      }, p.props.get().enterDuration);
    });
  };

  const leave = () => {
    if (state.value === 'closed') return;
    if (currTimeout) {
      clearTimeout(currTimeout);
      currTimeout = null;
    }
    state.set('leave');
    currTimeout = setTimeout(() => {
      if (state.value !== 'leave') return;
      state.set('closed');
      const element = p.view.getElement();
      element.style.display = 'none';
    }, p.props.get().leaveDuration);
  };

  p.lifecycle.onMounted(() => {
    const props = p.props.get();
    // deal with show, default is true
    if (props.show === false) {
      state.set('closed');
      const element = p.view.getElement();
      element.style.display = 'none';
    } else {
      state.set('idle');
      const element = p.view.getElement();
      element.style.display = 'unset';
    }
    // deal with appear, when appear is true, the component will be closed and then enter
    if (props.appear) {
      state.set('closed');
      enter();
    }
  });

  // context
  p.context.provide(TransitionContext, () => {
    const props = p.props.get();
    return {
      show: props.show,
      appear: props.appear,
      state,
    };
  });

  // exposes
  p.expose.define('enter', enter);
  p.expose.define('leave', leave);

  return {
    states: {
      state,
    },
  };
};

export default asTransition;
