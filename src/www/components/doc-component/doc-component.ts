import { ContextProvider } from '@/components/common';
import { A, Div, h, Main, P, PrototypeTabsContent, Span } from '@/www/utils/dom';
import { Doc, DocContext } from './interface';
import markdown from './doc-section/markdown';

export default abstract class DocComponent extends ContextProvider<{
  'doc': DocContext;
}> {
  protected abstract _doc: Doc;
  protected _providerKeys = ['doc' as const];

  connectedCallback() {
    super.connectedCallback();
    this.setContext('doc', {
      doc: this._doc,
    });
    this._setup();
  }

  private _setup() {
    if (!this._doc) {
      throw new Error(
        "DocComponent should be initialized with '_doc' property before connectedCallback"
      );
    }

    const sections = this._doc.sections;
    const content = PrototypeTabsContent({ value: this._doc.id }, [
      Main(
        {
          class:
            'lg:ml-[calc(2.5rem+240px)] md:ml-[calc(2rem+220px)] flex relative flex-1 py-6 lg:gap-10 items-start justify-between  lg:py-8 max-w-[1104px] lg:w-[calc(100vw-240px-4rem)] md:w-[calc(100vw-220px-6rem)] sm:w-full xs:w-[100vw]',
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
            Div(
              { class: 'pb-12 pt-8' },
              sections.map((sections) => {
                const fragment = document.createDocumentFragment();
                // 第一个章节与大标题共用一个标题，所以标题可能为空字符串
                sections.title &&
                  fragment.appendChild(
                    h(
                      'h2',
                      {
                        class:
                          'font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
                        id: sections.title,
                      },
                      [
                        A({
                          class: 'font-medium underline underline-offset-4 subheading-anchor',
                          'aria-label': 'Link to section',
                          href: `#${sections.title}`,
                        }),
                        // 这里并非失误，title 用于显示，而 a 标签用于定位，但后续可能会添加点击标题定位的功能，所以暂时保留这行注释
                        sections.title,
                      ]
                    )
                  );

                sections.contents.forEach((content) => {
                  content.title &&
                    fragment.appendChild(
                      h(
                        'h3',
                        {
                          class:
                            'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
                          id: content.title,
                        },
                        [
                          A({
                            class: 'font-medium underline underline-offset-4 subheading-anchor',
                            'aria-label': 'Link to section',
                            href: `#${content.title}`,
                          }),
                          content.title,
                        ]
                      )
                    );
                  switch (content.type) {
                    case 'code':
                      fragment.appendChild(h(content.content));
                      break;
                    case 'markdown':
                      fragment.appendChild(markdown(content.content));
                      break;
                  }
                });

                return fragment;
              })
            ),
          ]),
          h('doc-anchor'),
        ]
      ),
    ]);
    this.appendChild(content);
  }
}
