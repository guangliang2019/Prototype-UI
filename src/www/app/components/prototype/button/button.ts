import { Doc, DocComponent } from '@/www/components/doc-component';
  
import './button-basic';
import '@/components/prototype/button';

export default class ButtonDoc extends DocComponent {
  protected _doc: Doc = {
    id: 'prototype-button',
    title: 'Button',
    desc: 'Describe Button',
    route: ['Prototype', 'Button'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
              type: 'code',
              key: '',
              content: 'button-basic',
            }
        ],
      },
    ],
  };
}

customElements.define('button-doc', ButtonDoc);
