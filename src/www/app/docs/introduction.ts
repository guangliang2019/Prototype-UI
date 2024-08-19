import DocsComponent from '../../components/docs-component/docs-component';
import { Doc } from '../../components/docs-component/interface';

class DocsIntroduction extends DocsComponent {
  constructor() {
    super();
    this._doc = {
      title: 'Introduction',
      desc: 'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
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
