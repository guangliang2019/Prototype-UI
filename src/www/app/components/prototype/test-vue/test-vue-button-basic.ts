import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import { createApp } from 'vue';
import TestVueComponent from './test-vue';

export default class TestVueButtonBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  // TODO: 需要写一个 测试组件 先测试一下 VueAdapter 的 button 组件 
  protected _preview = () => {
    return Div({ class: 'flex flex-col items-center justify-center' }, [
      h(
        'button',
        {
          class: 'w-10 h-10',
          id: 'vue-app',
          onClick: () => {
            console.log('clicked1');
          },
        },
        ['Click me111']
      ),
    ]);
  };
}

customElements.define('test-vue-button-basic', TestVueButtonBasic);

// hack 一下，等 dom 加载完再挂载 vue 组件
requestAnimationFrame(() => {
  createApp(TestVueComponent).mount('#vue-app');
});
