import { PrototypeAPI } from '@/core/interface';
import { MessageExposes, MessageProviderExposes, MessageProviderProps } from './interface';
import { FastId, generateFastId } from '@/core/utils/id';

const asMessageProvider = <T>(
  p: PrototypeAPI<MessageProviderProps>
): {
  exposes: MessageProviderExposes<T>;
} => {
  const _messageMap = new Map<FastId, MessageExposes>();
  const _exposes: MessageProviderExposes<T> = {
    show: (message) => {
      const id = generateFastId();
      const props = p.props.get();
      const messagePrototype = props.messagePrototype;
      const messageElement = p.view.createElement(messagePrototype, { message }) as Element &
        MessageExposes;

      // TODO: 缺少一种方便的获取指定元素的 exposes 的 API，目前这种方法是依赖实现方式的
      const messageExposes = {
        id,
        open: () => {
          messageElement?.open();
        },
        close: () => {
          messageElement?.close();
        },
      };

      _messageMap.set(id, messageExposes);
      return id;
    },
    dismiss: (id) => {
      if (_messageMap.has(id)) {
        const messageExposes = _messageMap.get(id);
        messageExposes?.close();
        _messageMap.delete(id);
      }
    },
    clear: () => {
      _messageMap.clear();
    },
  };

  return {
    exposes: _exposes,
  };
};
