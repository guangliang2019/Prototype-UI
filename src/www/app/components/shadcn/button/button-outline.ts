import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import '@/shadcn';
import { HIGHLIGHT_RULE } from '@/www/utils/regex';

export default class ShadcnButtonOutline extends DocCode {
  protected _code = '<shadcn-button variant="outline">Outline</shadcn-button>';
  protected _highlightRules: HighlightRule[] = [
    HIGHLIGHT_RULE.shadcnTagName,
    HIGHLIGHT_RULE.upperCamelCase,
  ];

  protected _preview = () => {
    return Div({}, [h('shadcn-button', { variant: 'outline' }, ['Outline'])]);
  };
}

customElements.define('shadcn-button-outline', ShadcnButtonOutline);
