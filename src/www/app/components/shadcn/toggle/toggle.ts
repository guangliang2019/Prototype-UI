import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component';
import './toggle-basic';

export default class ShadcnToggleDoc extends DocComponent {
    protected _doc: Doc = {
        title: 'Toggle',
        id: 'shadcn-toggle',
        desc: 'A toggle component.',
        route: ['Shadcn', 'Toggle'],
        links: [],
        sections: [
            {
                title: '',
                contents: [
                    {
                        type: 'code',
                        key: '',
                        content: 'shadcn-toggle-basic',
                    },
                ],
            },
        ],
    };
}

customElements.define('shadcn-toggle-doc', ShadcnToggleDoc);