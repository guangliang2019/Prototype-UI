import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component';
import './select-basic';

export default class ShadcnSelectDoc extends DocComponent {
  protected _doc: Doc = {
    title: 'Select',
    id: 'shadcn-select',
    desc: 'Displays a select or a component that looks like a select.',
    route: ['Shadcn', 'select'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'shadcn-select-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('shadcn-select-doc', ShadcnSelectDoc);
