// ScrollAnimator.ts
import { createContext } from '@/core/adapters/web/context-center';
import { getDefaultAnimationLoop, WebAnimationLoop } from '@/core/adapters/web/animation-loop';

export interface ScrollAnimatorContextType {
  scrollTo(pos: { x?: number; y?: number }, options?: ScrollToOptions): void;
  getPosition(): { x: number; y: number };
  cancel(): void;
  isAnimating(): boolean;
}

export const ScrollAnimatorContext = createContext<ScrollAnimatorContextType>('scroll-animator');

export const useScrollAnimator = (
  scrollElement: HTMLElement | Window = window,
  loop: WebAnimationLoop = getDefaultAnimationLoop()
): ScrollAnimatorContextType => {
  let currentAnimationId: string | null = null;

  const target =
    scrollElement === window
      ? document.scrollingElement || document.documentElement
      : (scrollElement as HTMLElement);

  const getPosition = () => ({
    x: target.scrollLeft,
    y: target.scrollTop,
  });

  const cancel = () => {
    if (currentAnimationId) loop.unregister(currentAnimationId);
    currentAnimationId = null;
  };

  const isAnimating = () => currentAnimationId != null;

  const scrollTo = (pos: { x?: number; y?: number }, options: ScrollToOptions = {}) => {
    const start = loop.getNow();
    const duration = options.duration ?? 400;
    const easing = options.easing ?? easeOutQuad;
    const from = getPosition();
    const to = {
      x: pos.x ?? from.x,
      y: pos.y ?? from.y,
    };

    cancel();
    const id = `scroll-${start}`;
    currentAnimationId = id;

    loop.register({
      id,
      callback: (dt, time) => {
        const t = Math.min(1, (time - start) / duration);
        const eased = easing(t);
        target.scrollTo({
          left: from.x + (to.x - from.x) * eased,
          top: from.y + (to.y - from.y) * eased,
          behavior: 'auto',
        });
        if (t === 1) cancel();
      },
    });
  };

  return {
    scrollTo,
    getPosition,
    cancel,
    isAnimating,
  };
};

// Easing function
const easeOutQuad = (t: number) => t * (2 - t);

// ScrollToOptions extension
export interface ScrollToOptions {
  duration?: number;
  easing?: (t: number) => number;
}
