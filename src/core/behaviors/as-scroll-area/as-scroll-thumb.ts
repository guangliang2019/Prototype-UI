import { PrototypeAPI } from '@/core/interface';
import { ScrollAreaContext } from './as-scroll-area';
import { ScrollBarContext } from './as-scroll-bar';

const asScrollThumb = <Props extends {}, Exposes extends {}>(p: PrototypeAPI<Props, Exposes>) => {
  const verticalRatio = p.state.define<number>(0, '--scroll-thumb-vertical-ratio');
  const verticalOffset = p.state.define<number>(0, '--scroll-thumb-vertical-offset');
  const horizontalRatio = p.state.define<number>(0, '--scroll-thumb-horizontal-ratio');
  const horizontalOffset = p.state.define<number>(0, '--scroll-thumb-horizontal-offset');

  let direction: 'vertical' | 'horizontal' | null = null;
  let scrollAreaEl: HTMLElement | null = null;

  p.context.watch(ScrollBarContext, (ctx) => {
    direction = ctx.direction;
  });

  p.context.watch(ScrollAreaContext, (ctx) => {
    scrollAreaEl = ctx.rootRef;
    if (!scrollAreaEl) return;

    if (direction === 'vertical') {
      verticalRatio.set(ctx.clientHeight / ctx.scrollHeight);
      verticalOffset.set((ctx.scrollTop / ctx.scrollHeight) * ctx.clientHeight);
    } else if (direction === 'horizontal') {
      horizontalRatio.set(ctx.clientWidth / ctx.scrollWidth);
      horizontalOffset.set((ctx.scrollLeft / ctx.scrollWidth) * ctx.clientWidth);
    }
  });

  let isDragging = false;
  let startPos = 0;
  let startScroll = 0;

  const onPointerDown = (e: PointerEvent) => {
    isDragging = true;
    startPos = direction === 'vertical' ? e.clientY : e.clientX;
    if (!scrollAreaEl) return;
    startScroll = direction === 'vertical' ? scrollAreaEl.scrollTop : scrollAreaEl.scrollLeft;
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging || !scrollAreaEl) return;
    const currentPos = direction === 'vertical' ? e.clientY : e.clientX;
    const delta = currentPos - startPos;
    const scrollSize =
      direction === 'vertical' ? scrollAreaEl.scrollHeight : scrollAreaEl.scrollWidth;
    const clientSize =
      direction === 'vertical' ? scrollAreaEl.clientHeight : scrollAreaEl.clientWidth;
    const scrollDelta = (delta / clientSize) * scrollSize;
    if (direction === 'vertical') {
      scrollAreaEl.scrollTop = startScroll + scrollDelta;
    } else {
      scrollAreaEl.scrollLeft = startScroll + scrollDelta;
    }
  };

  const onPointerUp = () => {
    isDragging = false;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  };

  p.event.on('pointerdown', onPointerDown);
};

export default asScrollThumb;
