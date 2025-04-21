import { FastId } from '@/core/utils/id';
import { OverlayProps } from '../as-overlay';
import { Prototype, RendererAPI } from '@/core/interface';
import { createContext } from '@/core/adapters/web/context-center';

export interface MessageProps<T = string> extends OverlayProps {
  message: T;
  renderMessage: (renderer: RendererAPI, message: T) => Element;
}

export interface MessageExposes {
  id: FastId;
  open: () => void;
  close: () => void;
}

export interface MessageProviderProps {
  messagePrototype: Prototype;
}

export interface MessageProviderExposes<T> {
  show: (message: T) => FastId;
  dismiss: (id: FastId) => void;
  clear: () => void;
}

export interface MessageContextType {
  messagesMap: Map<FastId, MessageExposes>;
}

export const MessageContext = createContext<MessageContextType>('message');
