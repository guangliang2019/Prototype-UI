import { Doc, DocComponent } from "@/www/components/doc-component";
import './card-basic';

export default class CardDoc extends DocComponent {
  protected _doc: Doc = {
    title: 'Card',
    id: 'shadcn-card',
    desc: 'Card are used to organize content on the page.',
    route: ['Shadcn','Card'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'shadcn-card-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('shadcn-card-doc',CardDoc);