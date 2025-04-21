import { PrototypeAPI, RendererAPI } from '@/core/interface';
import { MessageContext, MessageExposes, MessageProps } from './interface';
import { generateFastId } from '@/core/utils/id';

export const asMessage = <Props extends MessageProps<T>, T>(
  p: PrototypeAPI<Props>
): {
  render: (renderer: RendererAPI) => Element;
  exposes: MessageExposes;
} => {
  // state
  const visible = p.state.define(false, 'data-visible');
  // props
  p.props.define({
    message: '',
    renderMessage: (renderer: RendererAPI, message: T) => {
      const h = renderer.createElement;
      return h('span', {}, [String(message)]);
    },
  } as Props);

  // exposes: provide the public methods
  const _exposes = {
    id: generateFastId(),
    open: () => visible.set(true),
    close: () => visible.set(false),
  };

  // context: maintain the consistency of messageMap
  p.context.watch(MessageContext);
  p.lifecycle.onMounted(() => {
    const context = p.context.get(MessageContext);
    context.messagesMap.set(_exposes.id, _exposes);
  });
  p.lifecycle.onBeforeUnmount(() => {
    const context = p.context.get(MessageContext);
    context.messagesMap.delete(_exposes.id);
  });

  return {
    render: (renderer) => {
      const props = p.props.get();
      return props.renderMessage(renderer, props.message);
    },
    exposes: _exposes,
  };
};
