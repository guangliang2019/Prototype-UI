import { DocComponent } from '@/www/components/doc-component';

export default class TabDoc extends DocComponent {
  protected _doc = {
    title: 'Tab',
    desc: 'Tabs are used to organize content on the page.',
    route: ['Shadcn', 'Tab'],
    links: [],
    sections: [],
  };
}

customElements.define('tab-doc', TabDoc);
