import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component';
import './button-basic';
import './button-primary';
import './button-secondary';
import './button-outline';
import './button-link';
import './button-destructive';
import './button-ghost';

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
            content: 'button-primary',
          },
          {
            title: 'Secondary',
            type: 'code',
            key: 'secondary',
            content: 'button-secondary',
          },
          {
            title: 'Outline',
            type: 'code',
            key: 'outline',
            content: 'button-outline',
          },
          {
            title: 'Ghost',
            type: 'code',
            key: 'ghost',
            content: 'button-ghost',
          },
          {
            title: 'Link',
            type: 'code',
            key: 'link',
            content: 'button-link',
          },
          {
            title: 'Destructive',
            type: 'code',
            key: 'destructive',
            content: 'button-destructive',
          },
        ],
      },
    ],
  };
}

customElements.define('button-doc', ButtonDoc);
