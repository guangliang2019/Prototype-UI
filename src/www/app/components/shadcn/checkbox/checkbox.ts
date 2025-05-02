import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component';
import './checkbox-basic';

export default class ShadcnCheckboxDoc extends DocComponent {
    protected _doc: Doc = {
        title: 'Checkbox',
        id: 'shadcn-checkbox',
        desc: 'A checkbox component.',
        route: ['Shadcn', 'Checkbox'],
        links: [],
        sections: [
            {
                title: '',
                contents: [
                    {
                        type: 'code',
                        key: '',
                        content: 'shadcn-checkbox-basic',
                    },
                ],
            },
        ],
    };
}

customElements.define('shadcn-checkbox-doc', ShadcnCheckboxDoc);