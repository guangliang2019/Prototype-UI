import '@/prototype/tab';
import { Aside, Div, h } from '@/www/utils/dom';
class WebsiteAside extends HTMLElement {
  private _index: Record<string, { title: string; value: string }[]> = {};
  constructor() {
    super();
    this._index = {
      'Getting Started': [
        {
          title: 'Introduction',
          value: 'docs-introduction',
        },
      ],
      'Shadcn UI': [
        {
          title: 'Button',
          value: 'shadcn-button',
        },
        {
          title: 'Tab',
          value: 'shadcn-tab',
        },
        {
          title: 'Select',
          value: 'shadcn-select',
        },
        {
          title: 'Input',
          value: 'shadcn-input',
        },
      ],
      'Prototype UI': [
        {
          title: 'Tab',
          value: 'prototype-tab',
        },
        {
          title: 'Transition',
          value: 'prototype-transition',
        },
        {
          title: 'Select',
          value: 'prototype-select',
        },
        {
          title: 'Form',
          value: 'prototype-form',
        },
      ],
    };
  }

  private _render() {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(
      Div({ class: 'pb-4' }, [
        h('h4', { class: 'mb-1 rounded-md px-2 py-1 text-sm font-semibold' }, ['Getting Started']),
        Div({ class: 'grid grid-flow-row auto-rows-max text-sm' }, [
          this._renderItems(this._index['Getting Started']),
        ]),
      ])
    );

    fragment.appendChild(
      Div({ class: 'pb-4' }, [
        h('h4', { class: 'mb-1 rounded-md px-2 py-1 text-sm font-semibold' }, ['Shadcn UI']),
        Div({ class: 'grid grid-flow-row auto-rows-max text-sm' }, [
          this._renderItems(this._index['Shadcn UI']),
        ]),
      ])
    );

    fragment.appendChild(
      Div({ class: 'pb-4' }, [
        h('h4', { class: 'mb-1 rounded-md px-2 py-1 text-sm font-semibold' }, ['Prototype UI']),
        Div({ class: 'grid grid-flow-row auto-rows-max text-sm' }, [
          this._renderItems(this._index['Prototype UI']),
        ]),
      ])
    );

    this.appendChild(
      Aside(
        {
          class:
            'fixed md:w-[220px] lg:w-[240px] top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:block',
        },
        [Div({ class: 'relative overflow-hidden h-full py-6 pr-6 lg:py-8' }, [fragment])]
      )
    );
  }

  private _renderItems(items: { title: string; value: string }[]) {
    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      fragment.appendChild(
        h('website-aside-item', {
          title: item.title,
          value: item.value,
        })
      );
    });

    return fragment;
  }

  connectedCallback() {
    this._render();
  }
}

customElements.define('website-aside', WebsiteAside);
