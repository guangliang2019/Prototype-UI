import { Doc, DocComponent } from '@/www/components/doc-component';
  
import './test-button-basic';
import '@/components/prototype/test-button';

export default class TestButtonDoc extends DocComponent {
  protected _doc: Doc = {
    id: 'prototype-test-button',
    title: 'TestButton',
    desc: 'Describe TestButton',
    route: ['Prototype', 'TestButton'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
              type: 'code',
              key: '',
              content: 'test-button-basic',
            }
        ],
      },
    ],
  };
}

customElements.define('test-button-doc', TestButtonDoc);
