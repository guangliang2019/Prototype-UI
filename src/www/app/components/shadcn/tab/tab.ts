import { DocComponent } from '@/www/components/doc-component';

export default class TabDoc extends DocComponent {
  protected _doc = {
    title: 'Tab',
    id: 'shadcn-tab',
    desc: 'Tabs are used to organize content on the page.',
    route: ['Shadcn', 'Tab'],
    links: [],
    sections: [],
  };
}

customElements.define('shadcn-tab-doc', TabDoc);
