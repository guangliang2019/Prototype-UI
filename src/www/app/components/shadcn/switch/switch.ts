import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component';
import './switch-basic';

export default class ShadcnSwitchDoc extends DocComponent {
  protected _doc: Doc = {
    title: 'Switch',
    id: 'shadcn-switch',
    desc: 'A switch component.',
    route: ['Shadcn', 'Switch'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'shadcn-switch-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('shadcn-switch-doc', ShadcnSwitchDoc);
