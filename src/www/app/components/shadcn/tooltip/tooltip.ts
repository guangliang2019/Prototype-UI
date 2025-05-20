import { Doc, DocComponent } from '@/www/components/doc-component';
import './tooltip-basic';

export default class TooltipDoc extends DocComponent {
  protected _doc: Doc = {
    title: 'Tooltip',
    id: 'shadcn-tooltip',
    desc: 'tooltip are used to organize content on the page.',
    route: ['Shadcn', 'Tooltip'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'code',
            key: '',
            content: 'shadcn-tooltip-basic',
          },
        ],
      },
    ],
  };
}

customElements.define('shadcn-tooltip-doc', TooltipDoc);
