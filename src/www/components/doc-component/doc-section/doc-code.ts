import { Div, h } from '@/utils/dom';
import { DocContext } from '../interface';
import { ContextConsumer } from '@/common';

export default abstract class DocCode extends ContextConsumer<DocContext> {
  protected _key = 'doc';
  /**
   * 代码块的预览组件
   * 强烈建议：赋值时用箭头函数，防止 this 指向问题
   */
  protected abstract _preview: () => Element;
  /**
   * 代码块的代码内容
   */
  protected abstract _code: string;

  connectedCallback() {
    super.connectedCallback();
    this._render();
  }

  private _render() {
    const content = h('doc-tab', { 'default-value': 'Preview' }, [
      Div({ class: 'group relative my-4 flex flex-col space-y-2' }, [
        Div(
          {
            class:
              'relative inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0',
          },
          [
            h('doc-tab-trigger', { value: 'Preview' }, ['Preview']),
            h('doc-tab-trigger', { value: 'Code' }, ['Code']),
            h('doc-tab-indicator', {}, []),
          ]
        ),
        h('doc-tab-content', { value: 'Preview', style: 'display: none' }, [
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
        h('doc-tab-content', { value: 'Code', style: 'display: none' }, [this._code]),
      ]),
    ]);

    this.appendChild(content);
  }
}
