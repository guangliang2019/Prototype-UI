import { PrototypeAPI } from '@/core/interface';
import {
  SelectContext,
  SelectContextType,
  SelectProps,
  SelectExposes,
  DEFAULT_SELECT_PROPS,
} from './interface';

const asSelect = <Props extends SelectProps, Exposes extends SelectExposes>(
  p: PrototypeAPI<Props, Exposes>
) => {
  const _itemRefs: SelectContextType['itemsRefs'] = [];

  // props
  p.props.define(DEFAULT_SELECT_PROPS as Props);

  // state
  const selecting = p.state.define<boolean>(false, 'data-selecting');
  const focused = p.state.define<boolean>(false, 'data-focused');

  p.context.provide(SelectContext, (updateContext) => {
    const { defaultValue = '' } = p.props.get();

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
      rootRef: p.view.getElement(),
      itemsRefs: _itemRefs,
      valueRef: null as unknown as HTMLElement,
      contentRef: null as unknown as HTMLElement,
    };

    return context;
  });
};

export default asSelect;
