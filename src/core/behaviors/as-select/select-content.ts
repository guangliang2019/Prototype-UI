import { PrototypeAPI } from '@/core/interface';
import { SelectContentExposes, SelectContentProps, SelectContext } from './interface';
import { asOverlay } from '../as-overlay';

const asSelectContent = <
  Props extends SelectContentProps = SelectContentProps,
  Exposes extends SelectContentExposes = SelectContentExposes,
>(
  p: PrototypeAPI<Props, Exposes>
) => {
  // context
  p.context.watch(SelectContext);

  // role
  const { states } = asOverlay(p);

  p.lifecycle.onMounted(() => {
    p.props.set({
      onVisibleChange: (visible) => {
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
            context.focus();
            context.selecting.set(false);
            break;
        }
      },
      clickOutsideInterceptor: (e) => {
        const context = p.context.get(SelectContext);
        return e.target !== context.triggerRef;
      },
    } as Partial<Props>);
  });

  p.lifecycle.onMounted(() => {
    const context = p.context.get(SelectContext);

    context.open = p.expose.get('show');
    context.close = p.expose.get('hide');
  });

  return {
    states: states,
  };
};

export default asSelectContent;
