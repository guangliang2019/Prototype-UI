import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import { createApp } from 'vue';
import TestVueComponent from './test-vue';

export default class TestButtonBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    return Div({ class: 'flex flex-col items-center justify-center' }, [
      h(
        'div',
        {
          class: 'w-10 h-10',
          id: 'vue-app',
          onClick: () => {
            console.log('clicked');
          },
        },
        ['Click me']
      ),
    ]);
  };
}

customElements.define('test-button-basic', TestButtonBasic);

// hack 一下，等 dom 加载完再挂载 vue 组件
requestAnimationFrame(() => {
  createApp(TestVueComponent).mount('#vue-app');
});
