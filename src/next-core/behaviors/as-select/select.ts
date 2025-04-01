import { PrototypeHooks } from '@/next-core/interface';
import { SelectContext, SelectContextType, SelectProps } from './interface';

const asSelect = (hooks: PrototypeHooks<SelectProps>) => {
  const { defineProps, useState, provideContext, getProps, element } = hooks;
  const _itemRefs: SelectContextType['itemsRefs'] = [];

  // props
  defineProps({
    defaultValue: '',
  });

  // state
  const selecting = useState<boolean>(false, 'data-selecting');
  const focused = useState<boolean>(false, 'data-focused');

  provideContext(SelectContext, (updateContext) => {
    const { defaultValue = '' } = getProps();

    const context: SelectContextType = {
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
      triggerRef: null as unknown as HTMLElement,
      defaultValue: defaultValue,
      index: -1,
      value: defaultValue,
      items: [],
      selecting: selecting,
      rootRef: element.get(),
      itemsRefs: _itemRefs,
      valueRef: null as unknown as HTMLElement,
      contentRef: null as unknown as HTMLElement,
    };

    return context;
  });
};

export default asSelect;
