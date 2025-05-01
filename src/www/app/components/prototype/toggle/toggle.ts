import { Doc, DocComponent } from '@/www/components/doc-component';
import './toggle-basic';

export default class ToggleDoc extends DocComponent {
    protected _doc: Doc = {
        id: 'prototype-toggle',
        title: 'Toggle',
        desc: 'toggle组件',
        route: ['Prototype', 'Toggle'],
        links: [],
        sections: [
            {
                title: '',
                contents: [
                    
                    {
                        type: 'code',
                        key: 'basic-usage',
                        content: 'toggle-basic',
                    },
                ],
            },

        ],
    };
}

customElements.define('toggle-doc', ToggleDoc); 