import { Doc, DocComponent } from '@/www/components/doc-component';
import './select-basic';
import '@/prototype/select';

export default class SelectDoc extends DocComponent {
  protected _doc: Doc = {
    id: 'prototype-select',
    title: 'Select',
    desc: 'Displays a list of options for the user to pick from—triggered by a button.',
    route: ['Prototype', 'Select'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'select-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('select-doc', SelectDoc);
