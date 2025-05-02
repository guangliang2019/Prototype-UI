import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import '@/components/shadcn';
import { HIGHLIGHT_RULE } from '@/www/utils/regex';

export default class ShadcnToggleBasic extends DocCode {
    protected _code = '<shadcn-toggle></shadcn-toggle>';
    protected _highlightRules: HighlightRule[] = [
        HIGHLIGHT_RULE.shadcnTagName,
    ];

    protected _preview = () => {
        return Div({}, [h('shadcn-toggle')]);
    };
}

customElements.define('shadcn-toggle-basic', ShadcnToggleBasic);