// asScrollArea.ts
import { PrototypeAPI } from '@/core/interface';
import { createContext } from '@/core/adapters/web/context-center';

export interface ScrollAreaContextType {
  scrollElement: HTMLElement;
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
  clientHeight: number;
  clientWidth: number;
}

export const ScrollAreaContext = createContext<ScrollAreaContextType>('scroll-area');

const asScrollArea = <Props extends {}, Exposes extends {}>(p: PrototypeAPI<Props, Exposes>) => {
  let scrollElement: HTMLElement;
  let updateContext: (value: Partial<ScrollAreaContextType>) => void;

  const readMetrics = () => {
    updateContext({
      scrollTop: scrollElement.scrollTop,
      scrollLeft: scrollElement.scrollLeft,
      scrollHeight: scrollElement.scrollHeight,
      scrollWidth: scrollElement.scrollWidth,
      clientHeight: scrollElement.clientHeight,
      clientWidth: scrollElement.clientWidth,
    });
  };

  p.lifecycle.onMounted(() => {
    scrollElement = p.view.getElement();
    readMetrics();
  });

  p.event.on('scroll', readMetrics, { passive: true });
  p.event.onGlobal('resize', readMetrics);

  p.context.provide(ScrollAreaContext, (update) => {
    updateContext = update;
    const el = p.view.getElement();
    return {
      scrollElement: el,
      scrollTop: 0,
      scrollLeft: 0,
      scrollHeight: 0,
      scrollWidth: 0,
      clientHeight: 0,
      clientWidth: 0,
    };
  });
};

export default asScrollArea;
