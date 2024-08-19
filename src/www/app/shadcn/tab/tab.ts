import DocsComponent from '../../../components/docs-component/docs-component';

export default class TabDocs extends DocsComponent {
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

customElements.define('tab-docs', TabDocs);
