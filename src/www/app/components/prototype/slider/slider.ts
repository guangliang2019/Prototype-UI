import { Doc, DocComponent } from '@/www/components/doc-component';
//import './select-basic';

export default class SliderDoc extends DocComponent {
    protected _doc: Doc = {
        id: 'prototype-slider',
        title: 'Slider',
        desc: 'Displays a list of options for the user to pick from—triggered by a button.',
        route: ['Prototype', 'Slider'],
        links: [],
        sections: [
            {
                title: '',
                contents: [
                    {
                        type: 'code',
                        key: '',
                        content: 'slider-basic',
                    },
                ],
            },
        ],
    };
}

customElements.define('slider-doc', SliderDoc);
