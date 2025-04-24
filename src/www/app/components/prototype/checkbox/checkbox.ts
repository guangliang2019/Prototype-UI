import { Doc, DocComponent } from '@/www/components/doc-component';
import './checkbox-basic';

export default class CheckboxDoc extends DocComponent {
    protected _doc: Doc = {
        id: 'prototype-Checkbox',
        title: 'Checkbox',
        desc: '复选框组件',
        route: ['Prototype', 'Checkbox'],
        links: [],
        sections: [
            {
                title: '基础用法',
                contents: [
                    {
                        type: 'markdown',
                        key: 'basic-intro',
                        title: '基本介绍',
                        content: `Checkbox组件提供了一个简单的接口来表示选择状态`
                    },
                    {
                        type: 'code',
                        key: 'basic-usage',
                        title: '基础用法',
                        content: 'Checkbox',
                    },
                ],
            },

        ],
    };
}

customElements.define('checkbox-doc', CheckboxDoc); 