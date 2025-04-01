import { PrototypeHooks } from '@/next-core/interface';
import { SelectContentProps, SelectContext } from './interface';
import asOverlay from '../as-overlay/as-overlay';

const asSelectContent = (hooks: PrototypeHooks<SelectContentProps>) => {
  const { watchContext, getContext, useCreated, useMounted, getProps, element } = hooks;

  // context
  watchContext(SelectContext);

  // role
  const { actions } = asOverlay(hooks);

  useCreated(() => {
    const props = getProps();
    props.onVisibleChange = (visible) => {
      const context = getContext(SelectContext);
      const _element = element.get();
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
      const context = getContext(SelectContext);
      return e.target === context.triggerRef;
    };
  });

  useMounted(() => {
    const context = getContext(SelectContext);

    context.open = actions.show;
    context.close = actions.hide;
  });
};

export default asSelectContent;
