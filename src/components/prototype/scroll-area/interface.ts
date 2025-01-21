import { MotionScrollContext } from '@/components/motion';

export interface PrototypeScrollAreaContext extends MotionScrollContext {
  'prototype-scroll-area': {
    hideDelay: number;
    hide: () => void;
    show: () => void;

    alwaysShowScrollbar: boolean;

    rootRef: HTMLElement;
    contentRef: HTMLElement;
    _resizeObserver: ResizeObserver;
  };
}

export interface PrototypeScrollRailContext extends Record<string, Object> {
  'prototype-scroll-rail': {
    direction: 'horizontal' | 'vertical';

    railRef: HTMLElement;
    thumbRef: HTMLElement;
  };
}

export interface PrototypeScrollAreaProps {
  hideDelay?: number;
  alwaysShowScrollbar?: boolean;
}

export interface PrototypeScrollRailProps {
  readonly direction?: 'horizontal' | 'vertical';
}

export const DEFAULT_PROTOTYPE_SCROLL_AREA_PROPS: PrototypeScrollAreaProps = {
  hideDelay: 600,
  alwaysShowScrollbar: false,
};

export const DEFAULT_PROTOTYPE_SCROLL_RAIL_PROPS = {
  direction: 'vertical' as const,
};
