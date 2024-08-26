import { Div, h } from '@/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import '@/shadcn';
import { HIGHLIGHT_RULE } from '@/utils/regex';

export default class ShadcnButtonDestructive extends DocCode {
  protected _code = '<shadcn-button variant="destructive">Destructive</shadcn-button>';
  protected _highlightRules: HighlightRule[] = [
    HIGHLIGHT_RULE.shadcnTagName,
    HIGHLIGHT_RULE.upperCamelCase,
  ];

  protected _preview = () => {
    return Div({}, [h('shadcn-button', { variant: 'destructive' }, ['Destructive'])]);
  };
}

customElements.define('shadcn-button-destructive', ShadcnButtonDestructive);
