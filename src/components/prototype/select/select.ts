import { PrototypeSelectContext, PrototypeSelectProps } from './interface';
import { definePrototype, getContext, provideContext } from '@/core';
import { Component } from '@/core/interface';
import { defineProps, useAttributeState } from '@/core/lifecycle';
import { WebComponentAdapter } from '@/core/adapter/web-component';

const Select = definePrototype<PrototypeSelectProps>((p) => {
  const _itemRefs: PrototypeSelectContext['itemsRefs'] = [];

  defineProps(p, {
    defaultValue: '',
  });

  useAttributeState(p, 'open', false);

  provideContext<PrototypeSelectContext>(p, 'prototype-select', (updateContext) => {
    const component = p.componentRef;

    const context: PrototypeSelectContext = {
      width: -1,
      open: () => {},
      close: () => {},
      focus: () => {},
      focused: false,
      changeValue: (value, focus = false) => {
        console.log(context);
        updateContext({
          index: context.items.indexOf(value),
          value: value,
        });

        if (focus) context.focus?.();
        context.close?.();
      },
      triggerRef: null as unknown as Component,
      defaultValue: p.defaultValue,
      index: -1,
      value: p.defaultValue,
      items: [],
      selecting: false,
      rootRef: component,
      itemsRefs: _itemRefs,
      valueRef: null as unknown as Component,
      contentRef: null as unknown as Component,
    };

    return context;
  });
});

const PrototypeSelect = WebComponentAdapter(Select);

export default PrototypeSelect;

customElements.define('prototype-select', PrototypeSelect);
