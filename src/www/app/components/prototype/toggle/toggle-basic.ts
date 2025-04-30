import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class ToggleBasic extends DocCode {
    protected _code = ``;

    protected _highlightRules: HighlightRule[] = [];

    protected _preview = () => {
        return Div({ class: 'flex flex-col items-center justify-center gap-6 p-6' }, [

            Div({ class: 'w-full flex flex-col gap-4' }, [

                Div({ class: 'flex items-center gap-2' }, [
                    h('prototype-toggle', { pressed: true, style: 'position: relative; width: 30px; height: 30px; border-radius: 5px; background-color: #ccc; display: inline-block;' }, [
                        h('prototype-toggle-content', { style: 'display: flex; align-items: center; justify-content: center; width: 18px; height: 18px; background-color: #2563eb; border-radius: 50%; color: white; position: absolute; left: 20px; top: 1px; transition: left 0.2s;' }, [
                            h('svg', {
                                width: '12',
                                height: '12',
                                viewBox: '0 0 12 12',
                                fill: 'none'
                            }, [
                                h('circle', {
                                    cx: '6',
                                    cy: '6',
                                    r: '5',
                                    stroke: 'currentColor',
                                    'stroke-width': '2'
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

customElements.define('toggle-basic', ToggleBasic);

