import { Div, h, Span } from '@/www/utils/dom';
import { DocContext } from '../interface';
import { ContextConsumer } from '@/common';
import { HighlightRule } from './interface';
import { splitByHighlightRules } from '@/www/utils/regex';

export default abstract class DocCode extends ContextConsumer<{
  'doc': DocContext;
}> {
  protected _consumerKeys = ['doc' as const];
  /**
   * 代码块的预览组件
   * 强烈建议：赋值时用箭头函数，防止 this 指向问题
   */
  protected abstract _preview: () => Element;
  /**
   * 代码块的代码内容
   */
  protected abstract _code: string;
  protected abstract _highlightRules: HighlightRule[];

  connectedCallback() {
    super.connectedCallback();
    this._setup();
  }

  private _renderCodeBlock() {
    const codeBlock = h(
      'pre',
      // prettier-ignore
      { class: 'mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-30 py-4 dark:bg-zinc-900' },
      [
        h(
          'code',
          {
            class:
              'flex flex-col relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm max-w-[calc(100vw-960px-6rem)]',
          },
          this._code
            .trim()
            .split('\n')
            .map((line) =>
              Span(
                { class: 'px-4 py-0.5 w-full inline-block min-h-4' },
                splitByHighlightRules(line, this._highlightRules).map((item) =>
                  Span({ class: item.className || 'text-muted-foreground' }, [item.text])
                )
              )
            )
        ),
      ]
    );

    return codeBlock;
  }

  private _setup() {
    const content = h('doc-tabs', { 'default-value': 'Preview' }, [
      Div({ class: 'group relative my-4 flex flex-col space-y-2' }, [
        Div(
          {
            class:
              'relative inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0',
          },
          [
            h('doc-tabs-trigger', { value: 'Preview' }, ['Preview']),
            h('doc-tabs-trigger', { value: 'Code' }, ['Code']),
            h('doc-tabs-indicator', {}, []),
          ]
        ),
        h('doc-tabs-content', { value: 'Preview', style: 'display: none' }, [
          Div(
            {
              class:
                'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border',
            },
            [
              Div(
                {
                  class: 'flex items-center justify-between p-4',
                },
                ['Select Theme', Div({}, ['Copy as...'])]
              ),
              Div({ style: 'min-height: 350px', class: 'flex items-center justify-center' }, [
                this._preview(),
              ]),
            ]
          ),
        ]),
        h('doc-tabs-content', { value: 'Code', style: 'display: none' }, [this._renderCodeBlock()]),
      ]),
    ]);

    this.appendChild(content);
  }
}
