import { Doc, DocComponent } from '@/www/components/doc-component';
  
import './test-vue-button-basic';
import '@/components/prototype/test-button';

export default class TestVueButtonDoc extends DocComponent {
  protected _doc: Doc = {
    id: 'prototype-test-vue-button',
    title: 'TestVueButton',
    desc: 'Describe TestVueButton',
    route: ['Prototype', 'TestVueButton'],
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

customElements.define('test-vue-button-doc', TestVueButtonDoc);
