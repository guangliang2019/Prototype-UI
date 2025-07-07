import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class TestButtonBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  // TODO: 需要写一个 测试组件 先测试一下 VueAdapter 的 button 组件
  protected _preview = () => {
    return Div({ class: 'flex flex-col items-center justify-center w-full h-[350px]' }, [
      h(
        'div',
        {
          class: 'w-full h-full',
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

customElements.define('test-button-basic', TestButtonBasic);
