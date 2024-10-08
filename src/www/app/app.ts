import { h } from '@/www/utils/dom';
import '@/www/components';
import '@/prototype';
import '@/motion';
import './docs';
import './components/shadcn';
import './components/prototype';

import '@/lucide/chevrons-up-down';
import { PrototypeTab } from '@/prototype';
import { RouteChange, Router } from '../router';

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

  private _handleRouteChange = (reason: RouteChange) => {
    const path = new URL(window.location.origin + reason.to).pathname
      .split('/')
      .filter((item) => item !== '');
    switch (path[0]) {
      case 'docs':
        this._changeNav('docs');
        this._changeDocs(path[1] ? `docs-${path[1]}` : 'docs-introduction');
        break;
      case 'components':
        this._changeNav('docs');
        this._changeDocs(path[1] ? `${path[1]}-${path[2]}` : 'shadcn-button');
        break;
      default:
        break;
    }
    return true;
  };

  private _setup() {
    Router.getInstance().addGuard(this._handleRouteChange);

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
