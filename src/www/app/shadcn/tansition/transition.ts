import DocsComponent from "../../../components/docs-component/docs-component";

export default class TransitionDocs extends DocsComponent {
  constructor() {
    super();
    this._doc = {
      title: 'Transition',
      desc: 'Transition is used to show or hide content.',
      route: ['Prototype', 'Transition'],
      links: [],
      sections: [],
    };
  }
}

customElements.define('transition-docs', TransitionDocs);
