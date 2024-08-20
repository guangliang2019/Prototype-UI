import { Div, h, Main, PrototypeTab, PrototypeTabContent } from '../../utils/dom';
import '../components';
import './docs';
import './shadcn';

export default class AppRoot extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  private _render() {
    const content = Div({ id: 'app' }, [
      PrototypeTab({ 'default-value': 'docs' }, [
        h('website-nav'),
        Main({ class: 'flex-1 flex justify-center' }, [
          PrototypeTabContent({ value: 'docs' }, [
            PrototypeTab(
              {
                'default-value': 'Introduction',
                class: 'container flex-1 items-start',
              },
              [h('website-aside'), h('doc-introduction'), h('shadcn-docs')]
            ),
          ]),
          PrototypeTabContent({ style: 'display: none', value: 'components' }, ['components']),
        ]),
      ]),
    ]);

    this.appendChild(content);
  }
}

customElements.define('app-root', AppRoot);
