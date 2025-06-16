import { RendererAPI } from '@/core/interface';
import { h } from 'vue';

// TODO: 这里要用h函数去进行渲染
export const createVueRenderer = (): RendererAPI => {
  return {
    createElement: (type, props, ...children) => {
      console.log('1111');
      return h(type as string, props, children as any) as unknown as Element;
    },
    createText: (text) => {
      console.log('222');
      return h('span', {}, [text]) as unknown as Text;
    },
    createComment: () => {
      // TODO: 暂时不实现
      console.log('333');
      return null as unknown as Comment;
    },
    createFragment: () => {
      console.log('444');
      return document.createDocumentFragment() as unknown as Element;
    },
  };
};
