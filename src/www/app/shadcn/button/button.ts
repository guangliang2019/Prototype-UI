import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component';
import './button-basic';

export default class ButtonDoc extends DocComponent {
  protected _doc: Doc = {
    title: 'Button',
    desc: 'Displays a button or a component that looks like a button.',
    route: ['Shadcn', 'button'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'button-basic',
          },
        ],
      },
      {
        title: 'Examples',
        contents: [
          {
            title: 'Primary',
            type: 'code',
            key: 'primary',
            content: 'button-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('button-doc', ButtonDoc);
