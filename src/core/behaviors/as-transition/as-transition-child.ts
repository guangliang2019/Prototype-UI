import { PrototypeAPI } from '@/core/interface';
import {
  TransitionContext,
  TransitionStateEnum,
  TransitionChildProps,
  TransitionChildExposes,
} from './interface';

const asTransitionChild = <
  Props extends TransitionChildProps,
  Exposes extends TransitionChildExposes,
>(
  p: PrototypeAPI<Props, Exposes>
) => {
  const state = p.state.define<TransitionStateEnum>('idle');
  const _closed = p.state.define(false, 'data-closed');
  const _enter = p.state.define(false, 'data-enter');
  const _leave = p.state.define(false, 'data-leave');

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

  p.context.watch(TransitionContext, (context, changedKeys) => {
    if (changedKeys.includes('state')) {
      state.set(context.state.value);
    }
  });
};

export default asTransitionChild;
