import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class ToggleBasic extends DocCode {
    protected _code = ``;

    protected _highlightRules: HighlightRule[] = [];

    protected _preview = () => {
        return Div({ class: 'flex flex-col items-center justify-center gap-6 p-6' }, [

            Div({ class: 'w-full flex flex-col gap-4' }, [

                Div({ class: 'flex items-center gap-2' }, [
                    h('prototype-toggle', { pressed: true, style: 'width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center;' }, [
                        h('svg', {
                            width: '24',
                            height: '24',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: '#fff',
                            strokeWidth: '2',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            style: 'background:; border-radius: 8px;'
                        }, [
                            h('path', { d: 'M6 4h8a4 4 0 0 1 0 8H6z' }),
                            h('path', { d: 'M6 12h9a4 4 0 0 1 0 8H6z' }),
                        ])
                    ]),
                    h('span', {}, [''])
                ])
            ]),

        ]);
    };
}

customElements.define('toggle-basic', ToggleBasic);

