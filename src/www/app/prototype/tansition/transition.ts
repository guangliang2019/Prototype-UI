import { DocComponent } from '@/www/components/doc-component';

export default class TransitionDoc extends DocComponent {
  protected _doc = {
    title: 'Transition',
    desc: 'Transition is used to show or hide content.',
    route: ['Prototype', 'Transition'],
    links: [],
    sections: [],
  };
}

customElements.define('transition-doc', TransitionDoc);
