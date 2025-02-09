import { Doc, DocComponent } from '@/www/components/doc-component';

import './test-tab-basic';
import '@/components/prototype/test-tab';

export default class TestTabDoc extends DocComponent {
  protected _doc: Doc = {
    id: 'prototype-test-tab',
    title: 'TestTab',
    desc: 'Describe TestTab',
    route: ['Prototype', 'TestTab'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'test-tab-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('test-tab-doc', TestTabDoc);
