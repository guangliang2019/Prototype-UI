import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import '@/components/shadcn';
import { HIGHLIGHT_RULE } from '@/www/utils/regex';

export default class ShadcnButtonGhost extends DocCode {
  protected _code = '<shadcn-button variant="ghost">Ghost</shadcn-button>';
  protected _highlightRules: HighlightRule[] = [
    HIGHLIGHT_RULE.shadcnTagName,
    HIGHLIGHT_RULE.upperCamelCase,
  ];

  protected _preview = () => {
    return Div({}, [h('shadcn-button', { variant: 'ghost' }, ['Ghost'])]);
  };
}

customElements.define('shadcn-button-ghost', ShadcnButtonGhost);
