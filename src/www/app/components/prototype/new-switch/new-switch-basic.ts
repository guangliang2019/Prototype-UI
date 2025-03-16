import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';



export default class NewSwitchBasic extends DocCode {
    protected _code = ``;

    protected _highlightRules: HighlightRule[] = [];

    protected _preview = () => {
        return Div({ class: 'flex flex-col items-center justify-center gap-6 p-6' }, [
            // 基础用法
            Div({ class: 'w-full flex flex-col gap-4' }, [
                h('h3', { class: 'text-lg font-medium' }, ['基础用法']),
                Div({ class: 'flex items-center gap-2' }, [
                    h('prototype-new-switch', { checked: true }),
                    h('span', {}, ['选中状态'])
                ])
            ]),

        ]);
    };
}

customElements.define('new-switch-basic', NewSwitchBasic);