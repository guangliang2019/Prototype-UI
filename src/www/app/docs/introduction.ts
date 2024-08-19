import DocsComponent from '../../components/docs-component/docs-component';
import { Doc } from '../../components/docs-component/interface';

class DocsIntroduction extends DocsComponent {
  constructor() {
    super();
    this._doc = {
      title: 'Introduction',
      desc: 'The web component version of Headless UI & Shadcn/ui. Still in progress.',
      route: ['Docs', 'introduction'],
      links: [],
      sections: [],
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define('docs-introduction', DocsIntroduction);
