import { ContextProvider } from '../../../common';
import { Div, h, Main, P, PrototypeTabContent, Span } from '../../../utils/dom';
import { Doc, DocsContext } from './interface';

export default abstract class DocsComponent extends ContextProvider<DocsContext> {
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
        "DocsComponent should be initialized with '_doc' property before connectedCallback"
      );
    }
    const content = PrototypeTabContent({ value: this._doc.title, style: 'display: none' }, [
      Main(
        {
          class:
            'flex relative flex-1 py-6 lg:gap-10 items-start justify-between md:ml-8 lg:ml-10 lg:py-8 max-w-[1104px] lg:w-[calc(100vw-240px-4rem)] md:w-[calc(100vw-220px-3.5rem)]',
        },
        [
          Div({}, [
            h('docs-breadcrumb'),
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
          ]),
          h('docs-anchor'),
        ]
      ),
    ]);
    this.appendChild(content);
  }
}
