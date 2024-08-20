import { DocComponent } from '../../components/doc-component';

class DocIntroduction extends DocComponent {
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

customElements.define('doc-introduction', DocIntroduction);
