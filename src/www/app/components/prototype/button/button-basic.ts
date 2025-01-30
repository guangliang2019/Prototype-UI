
import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class ButtonBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    return Div({ class: 'flex flex-col items-center justify-center' }, [
      h('div', { class: 'text-2xl' }, ['Hello, Button!']),
    ]);
  };
}

customElements.define('button-basic', ButtonBasic);
