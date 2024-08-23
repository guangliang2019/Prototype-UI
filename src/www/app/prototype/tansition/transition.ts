import { Doc, DocComponent } from '@/www/components/doc-component';
import './transition-basic';

export default class TransitionDoc extends DocComponent {
  protected _doc: Doc = {
    id: 'prototype-transition',
    title: 'Transition',
    desc: 'Transition is used to show or hide content.',
    route: ['Prototype', 'Transition'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'transition-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('transition-doc', TransitionDoc);
