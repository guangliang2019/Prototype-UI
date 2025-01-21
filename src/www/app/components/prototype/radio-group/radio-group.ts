import { Doc, DocComponent } from '@/www/components/doc-component';
import './radio-group-basic';
import '@/components/prototype/select';
import '@/components/shadcn/button';

export default class SelectDoc extends DocComponent {
  protected _doc: Doc = {
    id: 'prototype-radio-group',
    title: 'Radio Group',
    desc: 'Displays a list of options for the user to pick from—triggered by a button.',
    route: ['Prototype', 'Radio Group'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'radio-group-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('radio-group-doc', SelectDoc);
