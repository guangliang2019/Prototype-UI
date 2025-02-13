
import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class TestButtonBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    return Div({ class: 'flex flex-col items-center justify-center' }, [
      h('div', { class: 'text-2xl' }, ['Hello, Test-button!']),
    ]);
  };
}

customElements.define('test-button-basic', TestButtonBasic);
