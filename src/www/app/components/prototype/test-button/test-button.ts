import { Doc, DocComponent } from '@/www/components/doc-component';

import './test-button-basic';
import '@/components/prototype/test-button';
import { createApp } from 'vue';
import TestVueComponent from './test-vue';

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
          },
        ],
      },
    ],
  };
}

customElements.define('test-button-doc', TestButtonDoc);

requestAnimationFrame(() => {
  createApp(TestVueComponent).mount('#vue-app');
});
