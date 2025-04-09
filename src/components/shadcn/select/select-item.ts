import { definePrototype, WebComponentAdapter } from '@/core';
import { ShadcnSelectContext, ShadcnSelectItemProps } from './interface';
import { asSelectItem, SelectContext } from '@/core/behaviors/as-select';
import { CONFIG } from '../_config';

const SHADCN_SELECT_ITEM_CLASS =
  'shadcn-select-item relative flex justify-between w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

export const ShadcnSelectItemPrototype = definePrototype<ShadcnSelectItemProps>({
  name: `${CONFIG.shadcn.prefix}-select-item`,
  setup: (p) => {
    // role
    p.context.watch(ShadcnSelectContext);
    asSelectItem(p);

    // context
    p.context.watch(SelectContext, (context, changedKeys) => {
      const { checkRef } = p.context.get(ShadcnSelectContext);
      const props = p.props.get();
      const root = p.view.getElement();
      if (changedKeys.includes('value')) {
        if (props.value === context.value) {
          root.appendChild(checkRef);
        } else {
          // root.removeChild(checkRef);
        }
      }
    });

    return {
      render: () => {
        const root = p.view.getElement();
        const className = root.className || '';
        root.className = [SHADCN_SELECT_ITEM_CLASS, className].join(' ').trimEnd();
      },
    };
  },
});

export const ShadcnSelectItem = WebComponentAdapter(ShadcnSelectItemPrototype);
