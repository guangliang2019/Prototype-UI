import { ContextProvider } from '../../../common';
import { Div, h, Main, P, PrototypeTabContent, Span } from '../../../utils/dom';
import { Doc, DocContext } from './interface';

export default abstract class DocComponent extends ContextProvider<DocContext> {
  protected _doc: Doc | undefined = undefined;

  constructor() {
    super();
    this._key = 'doc';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setContext({
      doc: this._doc,
    });
    this._render();
  }

  private _render() {
    if (!this._doc) {
      throw new Error(
        "DocComponent should be initialized with '_doc' property before connectedCallback"
      );
    }
    const content = PrototypeTabContent({ value: this._doc.title, style: 'display: none' }, [
      Main(
        {
          class:
            'flex relative flex-1 py-6 lg:gap-10 items-start justify-between md:ml-8 lg:ml-10 lg:py-8 max-w-[1104px] lg:w-[calc(100vw-240px-4rem)] md:w-[calc(100vw-220px-3.5rem)]',
        },
        [
          Div({ class: 'w-full' }, [
            h('doc-breadcrumb'),
            Div({ class: 'space-y-2' }, [
              h('h1', { class: 'scroll-m-20 text-3xl font-bold tracking-tight' }, [
                this._doc.title ?? '',
              ]),
              P({ class: 'text-base text-muted-foreground' }, [
                Span(
                  {
                    style: 'display: inline-block; vertical-align: top; text-decoration: inherit;',
                  },
                  [this._doc.desc ?? '']
                ),
              ]),
            ]),
            Div({ class: 'pb-12 pt-8' }, [
              // TODO: 下面这个 Tab 逻辑，未来应该封装到 doc-code 或者其他的组件里面，只是放在这里临时调试
              h('doc-tab', { 'default-value': 'Preview' }, [
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
                h('doc-tab-content', { value: 'Preview', style: 'display: none' }, ['Preview']),
                h('doc-tab-content', { value: 'Code', style: 'display: none' }, ['Code']),
              ]),
            ]),
          ]),
          h('doc-anchor'),
        ]
      ),
    ]);
    this.appendChild(content);
  }
}
