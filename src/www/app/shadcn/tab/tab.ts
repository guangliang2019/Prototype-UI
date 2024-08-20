import { DocComponent } from '../../../components/doc-component';

export default class TabDoc extends DocComponent {
  constructor() {
    super();
    this._doc = {
      title: 'Tab',
      desc: 'Tabs are used to organize content on the page.',
      route: ['Shadcn', 'Tab'],
      links: [],
      sections: [],
    };
  }
  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define('tab-doc', TabDoc);
