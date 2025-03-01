import { SelectContext, SelectProps } from './interface';
import { provideContext } from '@/core';
import { Component, Prototype } from '@/core/interface';
import { defineProps, useAttributeState } from '@/core/lifecycle';

const asSelect = (p: Prototype<SelectProps>) => {
  const _itemRefs: SelectContext['itemsRefs'] = [];

  defineProps(p, {
    defaultValue: '',
  });

  const selecting = useAttributeState<boolean>(p, 'selecting', false);
  const focused = useAttributeState<boolean>(p, 'focused', false);

  provideContext<SelectContext>(p, 'select', (updateContext) => {
    const component = p.componentRef;
    const defaultValue = component.getAttribute('default-value') ?? '';

    const context: SelectContext = {
      width: -1,
      open: () => {},
      close: () => {},
      focus: () => {},
      focused: focused,
      changeValue: (value, focus = false) => {
        updateContext({
          index: context.items.indexOf(value),
          value: value,
        });

        if (focus) context.focus?.();
        context.close?.();
      },
      triggerRef: null as unknown as Component,
      defaultValue: defaultValue,
      index: -1,
      value: defaultValue,
      items: [],
      selecting: selecting,
      rootRef: component,
      itemsRefs: _itemRefs,
      valueRef: null as unknown as Component,
      contentRef: null as unknown as Component,
    };

    return context;
  });
};

export default asSelect;
