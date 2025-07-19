// as-scroll-area.ts
import { PrototypeAPI } from '@/core/interface';
import { createContext } from '@/core/adapters/web/context-center';

export interface ScrollAreaContextType {
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
  clientHeight: number;
  clientWidth: number;
  rootRef: HTMLElement | null;
}

export const ScrollAreaContext = createContext<ScrollAreaContextType>('scroll-area');

const asScrollArea = <Props extends {}, Exposes extends {}>(p: PrototypeAPI<Props, Exposes>) => {
  let scrollElement: HTMLElement | null = null;
  let updateContext: (value: Partial<ScrollAreaContextType>) => void;

  const readMetrics = () => {
    if (!scrollElement) return;
    updateContext({
      scrollTop: scrollElement.scrollTop,
      scrollLeft: scrollElement.scrollLeft,
      scrollHeight: scrollElement.scrollHeight,
      scrollWidth: scrollElement.scrollWidth,
      clientHeight: scrollElement.clientHeight,
      clientWidth: scrollElement.clientWidth,
    });
  };

  const setScrollElement = (el: HTMLElement) => {
    scrollElement = el;
    readMetrics();
  };

  p.event.on('scroll', readMetrics, { passive: true });
  p.event.onGlobal('resize', readMetrics);

  p.lifecycle.onMounted(() => {
    const el = p.view.getElement();
    setScrollElement(el);
    requestAnimationFrame(readMetrics);
  });

  p.context.provide(ScrollAreaContext, (update) => {
    updateContext = update;
    return {
      scrollElement: null,
      scrollTop: 0,
      scrollLeft: 0,
      scrollHeight: 0,
      scrollWidth: 0,
      clientHeight: 0,
      clientWidth: 0,
      setScrollElement,
      readMetrics,
      rootRef: p.view.getElement(),
    };
  });
};

export default asScrollArea;

