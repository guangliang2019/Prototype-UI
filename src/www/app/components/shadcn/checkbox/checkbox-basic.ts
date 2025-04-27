import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import '@/components/shadcn';
import { HIGHLIGHT_RULE } from '@/www/utils/regex';

export default class ShadcnCheckboxBasic extends DocCode {
    protected _code = '<shadcn-checkbox></shadcn-checkbox>';
    protected _highlightRules: HighlightRule[] = [
        HIGHLIGHT_RULE.shadcnTagName,
    ];

    protected _preview = () => {
        return Div({}, [h('shadcn-checkbox')]);
    };
}

customElements.define('shadcn-checkbox-basic', ShadcnCheckboxBasic);