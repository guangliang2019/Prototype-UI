import { h } from '@/www/utils/dom';
import '@/www/components';
import '@/components/prototype';
import '@/components/motion';
import './docs';
import './components/shadcn';
import './components/prototype';
import './examples';

import '@/components/lucide/chevrons-up-down';
import { PrototypeTabs } from '@/components/prototype';
import { RouteChange, Router } from '../router';

export default class AppRoot extends HTMLElement {
  connectedCallback() {
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.body.className = theme;

    // 监听系统主题变化
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this._handleThemeChange);
    this._setup();
  }

  private _handleThemeChange = (event: MediaQueryListEvent) => {
    const newTheme = event.matches ? 'dark' : 'light';
    document.body.className = newTheme;
  };

  disconnectedCallback() {
    // Router.getInstance().removeGuard(this._handleRouteChange);
    this._changeNav = () => {};
    this._changeDocs = () => {};
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this._handleThemeChange);
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
      case 'shadcn':
        this._changeNav('docs');
        this._changeDocs(`${path[0]}-${path[1]}`);
        break;
      case 'prototype':
        this._changeNav('docs');
        this._changeDocs(`${path[0]}-${path[1]}`);
        break;
      case 'examples':
        this._changeNav('examples');
        break;
      default:
        this._changeNav('docs');
        this._changeDocs('docs-introduction');
        break;
    }
    return true;
  };

  private _setup() {
    // Router.getInstance().addGuard(this._handleRouteChange);

    const docsTab = h(
      'prototype-tabs',
      {
        'default-value': 'docs-introduction',
        class: 'container flex-1 items-start',
      },
      [h('website-aside'), h('doc-introduction'), h('shadcn-docs'), h('prototype-docs')]
    ) as PrototypeTabs;
    const navTab = h('prototype-tabs', { 'default-value': 'docs' }, [
      h('website-nav'),
      h('main', { class: 'flex-1 flex justify-center' }, [
        h('prototype-tabs-content', { value: 'docs' }, [docsTab]),
        h('prototype-tabs-content', { style: 'display: none', value: 'components' }, [
          'components',
        ]),
        h('prototype-tabs-content', { style: 'display: none', value: 'examples' }, [
          h('examples-page'),
        ]),
      ]),
    ]) as PrototypeTabs;

    this._changeNav = navTab.changTab;
    this._changeDocs = docsTab.changTab;
    const content = h('div', { id: 'app' }, [h('prototype-overlay-provider', {}, [navTab])]);

    this.appendChild(content);
    this._handleRouteChange({ 'from': '', 'to': window.location.pathname, 'action': 'push' });
  }
}

customElements.define('app-root', AppRoot);
