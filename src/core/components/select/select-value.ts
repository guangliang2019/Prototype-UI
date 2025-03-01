import { SelectContext, SelectValueProps } from './interface';
import { useConnect } from '@/core';
import { getContext, watchContext } from '@/core/context';
import { defineProps } from '@/core/lifecycle';
import { requestRender } from '@/core/render';
import { Prototype, RenderFunction } from '@/core/interface';

const asSelectValue = (p: Prototype<SelectValueProps>) => {
  defineProps(p, {
    renderValue: (value: string) => {
      const span = document.createElement('span');
      span.textContent = value;
      return span;
    },
  });

  watchContext<SelectContext>(p, 'select', (context, keys) => {
    if (keys.includes('value')) {
      requestRender(p);
    }
  });

  useConnect(p, () => {
    const context = getContext<SelectContext>(p, 'select');
    context.valueRef = p.componentRef;
  });

  return (h: RenderFunction) => {
    const context = getContext<SelectContext>(p, 'select');
    return h('span', {}, [context.value]);
  };
};

export default asSelectValue;
