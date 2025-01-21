import { Doc, DocComponent } from '@/www/components/doc-component';
import './resizable-basic';
import '@/components/prototype/resizable';

export default class ResizableDoc extends DocComponent {
  protected _doc: Doc = {
    id: 'prototype-resizable',
    title: 'Resizable',
    desc: 'Accessible resizable panel groups and layouts with keyboard support.',
    route: ['Prototype', 'Resizable'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'resizable-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('resizable-doc', ResizableDoc);
