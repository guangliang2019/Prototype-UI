import { Doc, DocComponent } from '@/www/components/doc-component';
import './tabs-basic';

export default class TabsDoc extends DocComponent {
  protected _doc: Doc = {
    title: 'Tabs',
    id: 'shadcn-tabs',
    desc: 'Tabs are used to organize content on the page.',
    route: ['Shadcn', 'Tabs'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'shadcn-tabs-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('shadcn-tabs-doc', TabsDoc);
