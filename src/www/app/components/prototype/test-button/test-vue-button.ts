import { Doc, DocComponent } from '@/www/components/doc-component';
  
import './test-vue-button-basic';
import '@/components/testvue/button';

export default class TestVueButtonDoc extends DocComponent {
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

customElements.define('test-vue-button-doc', TestVueButtonDoc);
