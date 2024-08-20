import { DocComponent } from '../../../components/doc-component';

export default class ButtonDoc extends DocComponent {
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

customElements.define('button-doc', ButtonDoc);
