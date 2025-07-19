// as-scroll-content.ts
import { PrototypeAPI } from '@/core/interface';
import { ScrollAreaContext } from './as-scroll-area';

const asScrollContent = <Props extends {}, Exposes extends {}>(p: PrototypeAPI<Props, Exposes>) => {
  p.context.watch(ScrollAreaContext);
};

export default asScrollContent;
