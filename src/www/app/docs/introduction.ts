import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component/interface';

class DocIntroduction extends DocComponent {
  protected _doc: Doc = {
    title: 'Introduction',
    id: 'docs-introduction',
    desc: 'The web component version of Headless UI & Shadcn/ui. Still in progress.',
    route: ['Docs', 'introduction'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: '### test',
          },
        ],
      },
      {
        title: '',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: '### test',
          },
        ],
      },
    ],
  };
}

customElements.define('doc-introduction', DocIntroduction);
