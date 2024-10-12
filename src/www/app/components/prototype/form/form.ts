import { Doc, DocComponent } from '@/www/components/doc-component';
import './form-basic';
import '@/prototype/form';

export default class FormDoc extends DocComponent {
  protected _doc: Doc = {
    id: 'prototype-form',
    title: 'Form',
    desc: 'Form',
    route: ['Prototype', 'Form'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'form-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('form-doc', FormDoc);
