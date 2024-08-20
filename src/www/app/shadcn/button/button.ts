import { DocComponent } from '../../../components/doc-component';

export default class ButtonDoc extends DocComponent {
  protected _doc = {
    title: 'Button',
    desc: 'Displays a button or a component that looks like a button.',
    route: ['Shadcn', 'button'],
    links: [],
    sections: [],
  };
}

customElements.define('button-doc', ButtonDoc);
