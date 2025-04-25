import { Doc, DocComponent } from '@/www/components/doc-component';
import './checkbox-basic';

export default class CheckboxDoc extends DocComponent {
    protected _doc: Doc = {
        id: 'prototype-checkbox',
        title: 'Checkbox',
        desc: '复选框组件',
        route: ['Prototype', 'Checkbox'],
        links: [],
        sections: [
            {
                title: '',
                contents: [
                    
                    {
                        type: 'code',
                        key: 'basic-usage',
                        content: 'checkbox-basic',
                    },
                ],
            },

        ],
    };
}

customElements.define('checkbox-doc', CheckboxDoc); 