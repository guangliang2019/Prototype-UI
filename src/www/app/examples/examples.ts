import { h } from '@/www/utils/dom';

export default class ExamplesPage extends HTMLElement {
  connectedCallback() {
    this._setup();
  }

  private _setup() {
    const fragment = document.createDocumentFragment();
    const bannerCls =
      'w-full mx-auto flex flex-col items-start gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10';
    const titleCls =
      'text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] hidden md:block';
    const subTitleCls = 'max-w-2xl text-lg font-light text-foreground';
    fragment.appendChild(
      h('div', { class: 'container relative flex flex-col' }, [
        h('div', { class: bannerCls }, [
          h('h1', { class: titleCls }, ['Check out some examples']),
          h('p', { class: subTitleCls }, [
            'Dashboard, cards, authentication. Some examples built using the components.',
            h('br'),
            'Use this as a guide to build your own.',
          ]),
          h('div', { class: 'flex w-full items-center justify-start gap-2 py-2' }, [
            h('shadcn-button', { variant: 'primary', class: 'h-8 px-3 text-xs' }, ['Get started']),
            h('shadcn-button', { variant: 'ghost', class: 'h-8 px-3 text-xs' }, ['Components']),
          ]),
        ]),
        h('iframe', {
          class: 'w-full h-[800px] rounded-[0.5rem] border bg-background shadow',
          src: window.origin + '/examples/mail/index.html',
        }),
        h('footer', { class: 'py-6 md:px-8 md:py-0' }, [
          h(
            'div',
            {
              class: 'flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row',
            },
            [
              h(
                'p',
                {
                  class:
                    'text-balance text-center text-sm leading-loose text-muted-foreground md:text-left',
                },
                ['Build by 广亮, inspired by shadcn/ui, The source code is available on GitHub.']
              ),
            ]
          ),
        ]),
      ])
    );
    this.appendChild(fragment);
  }
}

customElements.define('examples-page', ExamplesPage);
