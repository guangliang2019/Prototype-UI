import { Doc, DocComponent } from '@/www/components/doc-component';
import './transition-basic';
import './overlay-test';
import './motion-scroll-test';

export default class TransitionDoc extends DocComponent {
  protected _doc: Doc = {
    id: 'prototype-transition',
    title: 'Transition',
    desc: 'Transition is used to open or hide content.',
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
      {
        title: 'Overlay test',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'overlay-test',
          },
        ],
      },
      {
        title: 'Motion Scroll Test',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'motion-scroll-test',
          },
        ],
      },
    ],
  };
}

customElements.define('transition-doc', TransitionDoc);
