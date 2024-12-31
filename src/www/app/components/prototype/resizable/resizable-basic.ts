import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class resizableBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    return Div({ class: 'preview flex min-h-[350px] w-full justify-center p-10 items-center' }, [
      h(
        'prototype-resizable',
        { class: 'flex h-full w-full max-w-md rounded-lg border md:min-w-[450px]' },
        [
          h(
            'prototype-resizable-panel',
            { class: 'flex w-full h-[200px] items-center justify-center p-6' },
            ['One']
          ),
          h('prototype-resizable-handle', { class: 'w-px min-w-px bg-border' }),
          h('prototype-resizable-panel', {}, [
            h(
              'prototype-resizable',
              { class: 'flex flex-col w-full h-[200px]', direction: 'vertical' },
              [
                h(
                  'prototype-resizable-panel',
                  { class: 'flex w-full h-full items-center justify-center p-6' },
                  ['Two']
                ),
                h('prototype-resizable-handle', { class: 'h-px min-h-px bg-border' }),
                h(
                  'prototype-resizable-panel',
                  { class: 'flex w-full h-full items-center justify-center p-6' },
                  ['Three']
                ),
              ]
            ),
          ]),
        ]
      ),
    ]);
  };
}

customElements.define('resizable-basic', resizableBasic);
