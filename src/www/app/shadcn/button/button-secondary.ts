import { Div, h } from '@/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import '@/shadcn';
import { HIGHLIGHT_RULE } from '@/utils/regex';

export default class ShadcnButtonSecondary extends DocCode {
  protected _code = '<shadcn-button>Secondary</shadcn-button>';
  protected _highlightRules: HighlightRule[] = [
    HIGHLIGHT_RULE.shadcnTagName,
    HIGHLIGHT_RULE.upperCamelCase,
  ];

  protected _preview = () => {
    return Div({}, [h('shadcn-button', {}, ['Secondary'])]);
  };
}

customElements.define('shadcn-button-secondary', ShadcnButtonSecondary);
