export interface TransitionProps {
  show?: boolean;
  unmount?: boolean;
  appear?: boolean;
  beforeEnter?: () => void;
  afterEnter?: () => void;
  beforeLeave?: () => void;
  afterLeave?: () => void;
}

export const DEFAULT_TRANSITION_PROPS = {
  show: true,
  unmount: false,
  appear: false,
  beforeEnter: undefined,
  afterEnter: undefined,
  beforeLeave: undefined,
  afterLeave: undefined,
};
