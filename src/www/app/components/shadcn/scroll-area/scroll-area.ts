import { Doc, DocComponent } from '@/www/components/doc-component';
import './scroll-area-basic';
import '@/prototype/scroll-area';

export default class ShadcnScrollAreaDoc extends DocComponent {
  protected _doc: Doc = {
    id: 'shadcn-scroll-area',
    title: 'Scroll Area',
    desc: 'Scroll Area',
    route: ['Shadcn', 'Scroll Area'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'shadcn-scroll-area-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('shadcn-scroll-area-doc', ShadcnScrollAreaDoc);
