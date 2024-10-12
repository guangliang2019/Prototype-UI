import { Doc, DocComponent } from '@/www/components/doc-component';
import './scroll-area-basic';
import '@/prototype/scroll-area';

export default class ScrollAreaDoc extends DocComponent {
  protected _doc: Doc = {
    id: 'prototype-scroll-area',
    title: 'Scroll Area',
    desc: 'Scroll Area',
    route: ['Prototype', 'Scroll Area'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'scroll-area-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('scroll-area-doc', ScrollAreaDoc);
