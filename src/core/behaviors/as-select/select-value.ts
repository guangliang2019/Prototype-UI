import { PrototypeAPI, RendererAPI } from '@/core/interface';
import { SelectContext, SelectValueExposes, SelectValueProps } from './interface';

const asSelectValue = <
  Props extends SelectValueProps = SelectValueProps,
  Exposes extends SelectValueExposes = SelectValueExposes,
>(
  p: PrototypeAPI<Props, Exposes>
) => {
  p.props.define({
    renderValue: (value: string) => {
      const span = document.createElement('span');
      span.textContent = value;
      return span;
    },
  } as Props);

  p.context.watch(SelectContext, (_, keys) => {
    if (keys.includes('value')) {
      const context = p.context.get(SelectContext);
      console.log(context);
      p.view.update();
    }
  });

  p.lifecycle.onMounted(() => {
    const context = p.context.get(SelectContext);
    context.valueRef = p.view.getElement();
  });

  return {
    render: (renderer: RendererAPI) => {
      const h = renderer.createElement;
      const context = p.context.get(SelectContext);
      const value = context.value;
      return h('span', {}, [context.value]) as Element;
    },
  };
};

export default asSelectValue;
