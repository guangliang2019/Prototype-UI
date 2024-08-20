import { DocComponent } from '../../../components/doc-component';
import { Doc } from '../../../components/doc-component/interface';
import './button-basic';

export default class ButtonDoc extends DocComponent {
  protected _doc: Doc = {
    title: 'Button',
    desc: 'Displays a button or a component that looks like a button.',
    route: ['Shadcn', 'button'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'button-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('button-doc', ButtonDoc);
