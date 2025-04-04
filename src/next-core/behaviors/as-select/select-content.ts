import { PrototypeAPI } from '@/next-core/interface';
import { SelectContentProps, SelectContext } from './interface';
import asOverlay from '../as-overlay/as-overlay';

const asSelectContent = (p: PrototypeAPI<SelectContentProps>) => {
  // context
  p.context.watch(SelectContext);

  // role
  const { actions } = asOverlay(p);

  p.lifecycle.onCreated(() => {
    const props = p.props.get();
    props.onVisibleChange = (visible) => {
      const context = p.context.get(SelectContext);
      const _element = p.view.getElement();
      switch (visible) {
        case true:
          if (context.selecting.value) return;
          context.selecting.set(true);
          _element.style.width = context.width + 'px';
          break;
        case false:
          if (!context.selecting.value) return;
          context.triggerRef.focus();
          context.selecting.set(false);
          break;
      }
    };
    props.clickOutsideInterceptor = (e) => {
      const context = p.context.get(SelectContext);
      return e.target === context.triggerRef;
    };
  });

  p.lifecycle.onMounted(() => {
    const context = p.context.get(SelectContext);

    context.open = actions.show;
    context.close = actions.hide;
  });
};

export default asSelectContent;
