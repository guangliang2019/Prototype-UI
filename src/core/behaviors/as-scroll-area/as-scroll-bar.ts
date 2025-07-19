import { createContext } from '@/core/adapters/web/context-center';
import { PrototypeAPI } from '@/core/interface';

export type ScrollDirection = 'vertical' | 'horizontal';

export interface ScrollBarContextType {
  direction: ScrollDirection;
}

export interface ScrollBarProps {
  direction?: ScrollDirection;
}

const DEFAULT_PROPS: ScrollBarProps = {
  direction: 'vertical',
};
export const ScrollBarContext = createContext<ScrollBarContextType>('scroll-bar');

const asScrollBar = <Props extends ScrollBarProps = ScrollBarProps, Exposes extends {} = {}>(
  p: PrototypeAPI<Props, Exposes>
) => {
  p.props.define(DEFAULT_PROPS as Props);

  const orientation = p.state.define<'vertical' | 'horizontal'>('vertical', 'data-orientation');

  p.lifecycle.onMounted(() => {
    const props = p.props.get();
    orientation.set(props.direction ?? 'vertical');
  });

  p.context.provide(ScrollBarContext, () => {
    return { direction: orientation.value };
  });
};

export default asScrollBar;
