import { Doc, DocComponent } from '@/www/components/doc-component';
import './new-switch-basic';


export default class NewSwitchDoc extends DocComponent {
    protected _doc: Doc = {
        id: 'prototype-new-switch',
        title: 'Switch 开关',
        desc: '开关组件允许用户在两种状态之间切换',
        route: ['Prototype', 'Switch'],
        links: [],
        sections: [
            {
                title: '基础用法',
                contents: [
                    {
                        type: 'markdown',
                        key: 'basic-intro',
                        title: '基本介绍',
                        content: `Switch组件提供了一个简单的接口来表示开关状态`
                    },
                    {
                        type: 'code',
                        key: 'basic-usage',
                        title: '基础用法',
                        content: 'new-switch-basic',
                    },
                ],
            },
            
        ],
    };
}

customElements.define('new-switch-doc', NewSwitchDoc); 