import useClickOutside from '@/core/hooks/use-click-outside';
import { Prototype } from '@/core/interface';
import { defineProps, useAttributeState } from '@/core/lifecycle';
import { asOverlayOptions } from './interface';

const asOverlay = (p: Prototype, options: asOverlayOptions): void => {
  // state
  const visible = useAttributeState<boolean>(p, 'visible', false);

  // props
  defineProps(
    p,
    {
      visible: false,
      show: () => {
        visible.value = true;
        options?.handleVisibleChange?.(true);
      },
      hide: () => {
        visible.value = false;
        options?.handleVisibleChange?.(false);
      },
    },
    (key, _) => {
      if (key === 'show' || key === 'hide') {
        throw new Error('show and hide is not allowed to overwrite');
      }
    }
  );

  useClickOutside(p, (e) => {
    const component = p.componentRef;
    if (!visible.value) return;
    if (options?.handleClickOutside?.(e)) return;
    visible.value = false;
    component.hide();
  });
};

export default asOverlay;
