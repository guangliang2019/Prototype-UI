import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component';
import './button-basic';
import './button-primary';
import './button-secondary';
import './button-outline';
import './button-link';
import './button-destructive';
import './button-ghost';

export default class ShadcnButtonDoc extends DocComponent {
  protected _doc: Doc = {
    title: 'Button',
    id: 'shadcn-button',
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
            content: 'shadcn-button-basic',
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
            content: 'shadcn-button-primary',
          },
          {
            title: 'Secondary',
            type: 'code',
            key: 'secondary',
            content: 'shadcn-button-secondary',
          },
          {
            title: 'Outline',
            type: 'code',
            key: 'outline',
            content: 'shadcn-button-outline',
          },
          {
            title: 'Ghost',
            type: 'code',
            key: 'ghost',
            content: 'shadcn-button-ghost',
          },
          {
            title: 'Link',
            type: 'code',
            key: 'link',
            content: 'shadcn-button-link',
          },
          {
            title: 'Destructive',
            type: 'code',
            key: 'destructive',
            content: 'shadcn-button-destructive',
          },
        ],
      },
    ],
  };
}

customElements.define('shadcn-button-doc', ShadcnButtonDoc);
