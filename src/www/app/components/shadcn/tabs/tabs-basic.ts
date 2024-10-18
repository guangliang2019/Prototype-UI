import { Div, h } from '@/www/utils/dom';
import { DocCode } from '@/www/components/doc-component';
import '@/shadcn';
import { HighlightRule } from '@/www/components/doc-component';

export default class ShadcnTabsBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    const select = h('shadcn-select', { 'default-value': 'Option 2' }, [
      h('shadcn-select-trigger', { class: 'w-[180px]' }),
      h(
        'shadcn-select-content',
        {
          class: 'flex flex-col items-center justify-center',
        },
        [
          h('shadcn-select-item', { value: 'Option 1' }, ['Option 1']),
          h('shadcn-select-item', { value: 'Option 2' }, ['Option 2']),
          h('shadcn-select-item', { value: 'Option 3' }, ['Option 3']),
        ]
      ),
    ]);
    return Div({ class: 'flex flex-col items-center justify-center' }, [select]);
  };
}

customElements.define('shadcn-tabs-basic', ShadcnTabsBasic);
