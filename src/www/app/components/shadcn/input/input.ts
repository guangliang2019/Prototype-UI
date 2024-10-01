import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component';
import './input-basic';

export default class ShadcnInputDoc extends DocComponent {
  protected _doc: Doc = {
    title: 'Input',
    id: 'shadcn-input',
    desc: 'Displays a select or a component that looks like a select.',
    route: ['Shadcn', 'Input'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'shadcn-input-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('shadcn-input-doc', ShadcnInputDoc);
