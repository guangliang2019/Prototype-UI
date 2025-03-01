import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class TestTabBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    return Div({ class: 'flex flex-col items-center justify-center' }, [
      h('prototype-test-tab', { 'default-value': 'tab1' }, [
        h('prototype-test-tab-trigger', { value: 'tab1' }, ['Tab 1']),
        h('prototype-test-tab-trigger', { value: 'tab2' }, ['Tab 2']),
        h('prototype-test-tab-trigger', { value: 'tab3' }, ['Tab 3']),
        h('prototype-test-tab-trigger', { value: 'tab4' }, ['Tab 4']),
        // h('prototype-test-tab-content', {value: 'tab1'}, ['Content 1']),
        // h('prototype-test-tab-content', {value: 'tab2'}, ['Content 2']),
        // h('prototype-test-tab-content', {value: 'tab3'}, ['Content 3']),
      ]),
    ]);
  };
}

customElements.define('test-tab-basic', TestTabBasic);
