import { PrototypeHooks, RendererAPI } from '@/next-core/interface';
import { SelectContext, SelectValueProps } from './interface';

const asSelectValue = (hooks: PrototypeHooks<SelectValueProps>) => {
  const { defineProps, watchContext, useMounted, getContext, element } = hooks;

  defineProps({
    renderValue: (value: string) => {
      const span = document.createElement('span');
      span.textContent = value;
      return span;
    },
  });

  watchContext(SelectContext, (_, keys) => {
    if (keys.includes('value')) {
      // requestRender(p);
    }
  });

  useMounted(() => {
    const context = getContext(SelectContext);
    context.valueRef = element.get();
  });

  return {
    render: (renderer: RendererAPI) => {
      const h = renderer.createElement;
      const context = getContext(SelectContext);
      return h('span', {}, [context.value]);
    },
  };
};

export default asSelectValue;
