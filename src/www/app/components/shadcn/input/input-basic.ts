import { Div, h } from '@/www/utils/dom';
import { DocCode } from '@/www/components/doc-component';
import '@/shadcn';
import { HighlightRule } from '@/www/components/doc-component';

export default class ShadcnInputBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    return Div({ class: 'flex flex-col items-center justify-center' }, [
      h('shadcn-input', { 'placeholder': 'Placeholder', 'type': 'password' }),
    ]);
  };
}

customElements.define('shadcn-input-basic', ShadcnInputBasic);
