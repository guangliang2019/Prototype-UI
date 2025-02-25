import { PrototypeSelectContext, SelectValueProps } from './interface';
import { definePrototype, useConnect } from '@/core';
import { getContext, watchContext } from '@/core/context';
import { defineProps } from '@/core/lifecycle';
import { clearContent } from '@/core/utils/dom';
import { WebComponentAdapter } from '@/core/adapter/web-component';
import { requestRender } from '@/core/render';

const SelectValue = definePrototype<SelectValueProps>((p) => {
  defineProps(p, {
    renderValue: (value: string) => {
      const span = document.createElement('span');
      span.textContent = value;
      return span;
    },
  });

  watchContext<PrototypeSelectContext>(p, 'prototype-select', (context, keys) => {
    console.log('watch select value', context, keys);
    if (keys.includes('value')) {
      requestRender(p);
    }
  });

  useConnect(p, () => {
    const context = getContext<PrototypeSelectContext>(p, 'prototype-select');
    context.valueRef = p.componentRef;
  });

  return (h) => {
    const context = getContext<PrototypeSelectContext>(p, 'prototype-select');
    return h('span', {}, [context.value]);
  };
});

const PrototypeSelectValue = WebComponentAdapter(SelectValue);

export default PrototypeSelectValue;

customElements.define('prototype-select-value', PrototypeSelectValue);
