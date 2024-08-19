import DocsComponent from '../../../components/docs-component/docs-component';

export default class ButtonDocs extends DocsComponent {
  constructor() {
    super();
    this._doc = {
      title: 'Button',
      desc: 'Displays a button or a component that looks like a button.',
      route: ['Shadcn', 'button'],
      links: [],
      sections: [],
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define('button-docs', ButtonDocs);
