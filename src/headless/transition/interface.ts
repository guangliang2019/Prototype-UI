export interface TransitionProps {
  show?: boolean;
  unmount?: boolean;
  appear?: boolean;
  beforeEnter?: () => void;
  afterEnter?: () => void;
  beforeLeave?: () => void;
  afterLeave?: () => void;

  // beforeEnterClass?: string;
  afterEnterClass?: string;
  // beforeLeaveClass?: string;
  afterLeaveClass?: string;
}

export const DEFAULT_TRANSITION_PROPS: TransitionProps = {
  show: true,
  unmount: true,
  appear: false,
  beforeEnter: undefined,
  afterEnter: undefined,
  beforeLeave: undefined,
  afterLeave: undefined,
  // beforeEnterClass: undefined,
  afterEnterClass: undefined,
  // beforeLeaveClass: undefined,
  afterLeaveClass: undefined,
};
