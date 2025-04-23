import { createContext } from '@/core/adapters/web/context-center';
import { State } from '@/core/interface';

export type TransitionStateEnum = 'enter' | 'leave' | 'closed' | 'idle';

export interface TransitionProps {
  show?: boolean;
  appear?: boolean;
  enterDuration?: number;
  leaveDuration?: number;

  beforeEnter?: () => void;
  afterEnter?: () => void;
  beforeLeave?: () => void;
  afterLeave?: () => void;
}

export interface TransitionStates {
  state: State<TransitionStateEnum>;
}

export interface TransitionExposes {
  enter: () => void;
  leave: () => void;
}

export interface TransitionChildProps {}
export interface TransitionChildExposes {}

export interface TransitionContextType {
  show: boolean;
  enterDuration: number;
  leaveDuration: number;
  appear: boolean;
  state: State<TransitionStateEnum>;
}

export const TransitionContext = createContext<TransitionContextType>('transition');

export const DEFAULT_TRANSITION_PROPS: Partial<TransitionProps> = {
  show: true,
  appear: false,
  enterDuration: 300,
  leaveDuration: 300,
  beforeEnter: () => {},
  afterEnter: () => {},
  beforeLeave: () => {},
  afterLeave: () => {},
};
