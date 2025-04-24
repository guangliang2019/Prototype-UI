import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class CheckboxBasic extends DocCode {
    protected _code = ``;

    protected _highlightRules: HighlightRule[] = [];

    protected _preview = () => {
        return Div({ class: 'flex flex-col items-center justify-center gap-6 p-6' }, [

            Div({ class: 'w-full flex flex-col gap-4' }, [
                h('h3', { class: 'text-lg font-medium' }, ['基础用法']),

                Div({ class: 'flex items-center gap-2' }, [
                    h('prototype-checkbox', { checked: true, style: 'position: relative; width: 40px; height: 20px; border-radius: 10px; background-color: #ccc; display: inline-block; --switch-width: 40px; --switch-height: 20px; --switch-thumb-size: 16px;' }, [
                    ]),
                    h('span', {}, [''])
                ])
            ]),

        ]);
    };
}

customElements.define('checkbox-basic', CheckboxBasic);