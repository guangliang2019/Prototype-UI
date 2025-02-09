import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class TestTabBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    return Div({ class: 'flex flex-col items-center justify-center' }, [
      h('prototype-test-tab', {}, [
        h('prototype-test-tab-trigger', {}, ['Tab 1']),
        h('prototype-test-tab-trigger', {}, ['Tab 2']),
        h('prototype-test-tab-trigger', {}, ['Tab 3']),
      ]),
    ]);
  };
}

customElements.define('test-tab-basic', TestTabBasic);
