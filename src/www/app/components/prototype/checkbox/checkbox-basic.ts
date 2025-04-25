import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class CheckboxBasic extends DocCode {
    protected _code = ``;

    protected _highlightRules: HighlightRule[] = [];

    protected _preview = () => {
        return Div({ class: 'flex flex-col items-center justify-center gap-6 p-6' }, [

            Div({ class: 'w-full flex flex-col gap-4' }, [

                Div({ class: 'flex items-center gap-2' }, [
                    h('prototype-checkbox', { checked: true, style: 'position: relative; width: 40px; height: 20px; border-radius: 10px; background-color: #ccc; display: inline-block; --checkbox-width: 20px; --checkbox-height: 20px; --checkbox-thumb-size: 16px;' }, [
                        h('prototype-checkbox-indicator', { style: 'display: flex; align-items: center; justify-content: center; width: 16px; height: 16px; background-color: #2563eb; border-radius: 2px; color: white;' }, [
                            h('svg', {
                                width: '12',
                                height: '12',
                                viewBox: '0 0 12 12',
                                fill: 'none'
                            }, [
                                h('path', {
                                    d: 'M10 3L4.5 8.5L2 6',
                                    stroke: 'currentColor',
                                    'stroke-width': '2',
                                    'stroke-linecap': 'round',
                                    'stroke-linejoin': 'round'
                                }, [])
                            ])
                        ])
                    ]),
                    h('span', {}, [''])
                ])
            ]),

        ]);
    };
}

customElements.define('checkbox-basic', CheckboxBasic);