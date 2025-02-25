import { Prototype } from '../interface';
import { defineProps, useAttributeState } from '../lifecycle';
import useClickOutside from './use-click-outside';

export interface OverlayProps {
  visible: boolean;
  show: () => void;
  hide: () => void;
}

export const asOverlay = (p: Prototype, handleVisibleChange?: (visible: boolean) => void): void => {
  // state
  const visible = useAttributeState<boolean>(p, 'visible', false);

  // props
  defineProps(
    p,
    {
      visible: false,
      show: () => {
        console.log('show');
        const component = p.componentRef;
        component.style.display = '';
        visible.value = true;
        handleVisibleChange?.(true);
      },
      hide: () => {
        console.log('hide');
        const component = p.componentRef;
        component.style.display = 'none';
        visible.value = false;
        handleVisibleChange?.(false);
      },
    },
    (key, _) => {
      if (key === 'show' || key === 'hide') {
        throw new Error('show and hide is not allowed to overwrite');
      }
    }
  );

  useClickOutside(p, () => {
    if (!visible.value) return;
    visible.value = false;
    const component = p.componentRef;
    component.hide();
  });
};
