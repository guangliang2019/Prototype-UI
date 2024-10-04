import { h } from '@/www/utils/dom';
import '@/www/components';
import '@/prototype';
import './docs';
import './components/shadcn';
import './components/prototype';

import '@/lucide/chevrons-up-down';
import { PrototypeTab } from '@/prototype';
import { WebsiteRouter } from '../components/website-router';
import { RouteChange } from '../components/website-router/website-router';

export default class AppRoot extends HTMLElement {
  connectedCallback() {
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.body.className = theme;

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      const newTheme = event.matches ? 'dark' : 'light';
      document.body.className = newTheme;
    });
    this._setup();
  }

  private _changeNav: (value: string, focus?: boolean | undefined) => void = () => {};
  private _changeDocs: (value: string, focus?: boolean | undefined) => void = () => {};

  private _getPath() {
    const path = window.location.pathname;
    return path.split('/').filter((item) => item !== '');
  }
  private _handleRouteChange = (reason: RouteChange) => {
    console.log(reason);
    this._changeDocs(reason.to.slice(1, -1).replace('/', '-'));
    return true;
  };

  private _setup() {
    WebsiteRouter.getInstance().addGuard(this._handleRouteChange);

    const docsTab = h(
      'prototype-tab',
      {
        'default-value': 'docs-introduction',
        class: 'container flex-1 items-start',
      },
      [h('website-aside'), h('doc-introduction'), h('shadcn-docs'), h('prototype-docs')]
    ) as PrototypeTab;
    const navTab = h('prototype-tab', { 'default-value': 'docs' }, [
      h('website-nav'),
      h('main', { class: 'flex-1 flex justify-center' }, [
        h('prototype-tab-content', { value: 'docs' }, [docsTab]),
        h('prototype-tab-content', { style: 'display: none', value: 'components' }, ['components']),
      ]),
    ]) as PrototypeTab;

    this._changeNav = navTab.changTab;
    this._changeDocs = docsTab.changTab;
    const content = h('div', { id: 'app' }, [h('prototype-overlay-provider', {}, [navTab])]);

    this.appendChild(content);

    this._handleRouteChange({ 'from': '', 'to': window.location.pathname, 'action': 'push' });
  }
}

customElements.define('app-root', AppRoot);
