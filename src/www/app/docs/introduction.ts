import { DocComponent } from '@/www/components/doc-component';

class DocIntroduction extends DocComponent {
  protected _doc = {
    title: 'Introduction',
    id: 'docs-introduction',
    desc: 'The web component version of Headless UI & Shadcn/ui. Still in progress.',
    route: ['Docs', 'introduction'],
    links: [],
    sections: [],
  };
}

customElements.define('doc-introduction', DocIntroduction);
