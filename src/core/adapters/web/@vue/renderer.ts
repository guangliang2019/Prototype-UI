import { RendererAPI } from '@/core/interface';
import { h } from 'vue';

export const createVueRenderer = (): RendererAPI => {
  return {
    createElement: (type, props, ...children) => {
      return h(type as string, props, children as any) as unknown as Element;
    },
    createText: (text) => {
      return h('span', {}, [text]) as unknown as Text;
    },
    createComment: () => {
      // TODO: 暂时不实现
      return null as unknown as Comment;
    },
    createFragment: () => {
      return document.createDocumentFragment() as unknown as Element;
    },
  };
};
