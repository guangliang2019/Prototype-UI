(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver((i) => {
    for (const r of i)
      if (r.type === 'childList')
        for (const c of r.addedNodes) c.tagName === 'LINK' && c.rel === 'modulepreload' && s(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(i) {
    const r = {};
    return (
      i.integrity && (r.integrity = i.integrity),
      i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : i.crossOrigin === 'anonymous'
          ? (r.credentials = 'omit')
          : (r.credentials = 'same-origin'),
      r
    );
  }
  function s(i) {
    if (i.ep) return;
    i.ep = !0;
    const r = t(i);
    fetch(i.href, r);
  }
})();
function E(o, e, t) {
  let s = 0,
    i = o.length - 1;
  for (; s <= i; ) {
    const r = s + Math.floor((i - s) / 2),
      c = t(e, o[r]);
    if (c === 0) return r;
    c > 0 ? (s = r + 1) : (i = r - 1);
  }
  return s;
}
function F(o, e) {
  if (e(o)) return o;
  const t = o.children;
  for (let s = 0; s < t.length; s++) {
    const i = F(t[s], e);
    if (i !== null) return i;
  }
  return null;
}
function n(o, e = {}, t = []) {
  const s = document.createElement(o);
  e &&
    Object.entries(e).forEach(([r, c]) => {
      r !== 'children' && (r.slice(0, 2) === 'on' ? (s[r] = c) : s.setAttribute(r, c));
    });
  const i = document.createDocumentFragment();
  return (
    t.forEach((r) => {
      typeof r == 'string'
        ? i.appendChild(document.createTextNode(r))
        : r instanceof Node && i.appendChild(r);
    }),
    s.appendChild(i),
    s
  );
}
function a(o = {}, e = []) {
  return n('div', o, e);
}
function x(o = {}, e = []) {
  return n('span', o, e);
}
function P(o = {}, e = []) {
  return n('p', o, e);
}
function Q(o = {}, e = []) {
  return n('main', o, e);
}
function J(o = {}, e = []) {
  return n('aside', o, e);
}
function ee(o = {}, e = []) {
  return n('nav', o, e);
}
function te(o = {}, e = []) {
  return n('ul', o, e);
}
function se(o = {}, e = []) {
  return n('li', o, e);
}
function S(o = {}, e = []) {
  return n('a', o, e);
}
function ne(o = {}, e = []) {
  return n('prototype-tab-content', o, e);
}
function b(o = {}, e = []) {
  return n('prototype-tab-trigger', o, e);
}
function L(o, e) {
  const t = o.compareDocumentPosition(e);
  return t & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : t & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
}
const oe = { onClickOutside: (o) => {} };
class ie extends HTMLElement {
  constructor() {
    super(...arguments), (this.onClickOutside = oe.onClickOutside);
  }
  connectedCallback() {
    (this._handleClickOutside = this._handleClickOutside.bind(this)),
      window.addEventListener('mousedown', this._handleClickOutside);
  }
  disconnectedCallback() {
    window.removeEventListener('mousedown', this._handleClickOutside);
  }
  _handleClickOutside(e) {
    this.contains(e.target) || this.onClickOutside(e);
  }
}
customElements.define('click-outside', ie);
var N, M;
const z = Symbol('setConsumerContext'),
  R = Symbol('requestContext');
class d extends HTMLElement {
  constructor() {
    super(...arguments),
      (this._contextValues = {}),
      (this._contextListeners = new Map()),
      (this.addContextListener = (e, t) => {
        this._contextListeners.has(e) || this._contextListeners.set(e, new Set()),
          this._contextListeners.get(e).add(t);
      }),
      (this.removeContextListener = (e, t) => {
        this._contextListeners.has(e) && this._contextListeners.get(e).delete(t);
      }),
      (this[N] = (e) => {
        const t = new CustomEvent('request-context', {
          bubbles: !0,
          composed: !0,
          detail: { key: e, consumer: this },
        });
        this.dispatchEvent(t);
      });
  }
  get contextValues() {
    return this._contextValues;
  }
  get consumerKeys() {
    return this._consumerKeys;
  }
  connectedCallback() {
    this.consumerKeys.forEach(this[R]);
  }
  [((M = z), (N = R), M)](e, t, s) {
    this._contextValues[e] === void 0 && (this._contextValues[e] = {}),
      (this._contextValues[e] = t),
      this._contextListeners.has(e) &&
        this._contextListeners.get(e).forEach((i) => i(this._contextValues[e], s));
  }
}
class p {
  constructor() {
    (this._providerEntryMap = new Map()), (this._consumerEntryMap = new Map());
  }
  static getInstance() {
    return p._instance || (p._instance = new p()), p._instance;
  }
  addProvider(e) {
    e.providerKeys.forEach((s) => {
      this._providerEntryMap.has(s) || this._providerEntryMap.set(s, new WeakMap()),
        this._providerEntryMap
          .get(s)
          ?.set(e, { consumersWeakSet: new WeakSet(), consumersSet: new Set() });
    });
    const t = this._findConsumers(e);
    e.providerKeys.forEach((s) => {
      t[s].forEach((i) => {
        this._consumerEntryMap.get(s)?.get(i) && this._removeConsumer(i),
          this.addConsumer(s, e, i),
          i[R](s);
      });
    });
  }
  removeProvider(e) {
    e.providerKeys.forEach((t) => {
      const s = this._providerEntryMap.get(t)?.get(e);
      if (!s) return;
      const { consumersSet: i } = s;
      i.forEach((r) => {
        this._removeConsumer(r), r[R](t);
      }),
        this._providerEntryMap.get(t)?.delete(e);
    });
  }
  addConsumer(e, t, s) {
    if (!this._providerEntryMap.get(e)?.get(t))
      throw new Error(`ContextManager: No provider found for consumer: ${String(s)}`);
    this._consumerEntryMap.has(e) || this._consumerEntryMap.set(e, new WeakMap());
    const i = this._providerEntryMap.get(e).get(t);
    i.consumersWeakSet.add(s), i.consumersSet.add(s), this._consumerEntryMap.get(e).set(s, t);
  }
  _removeConsumer(e) {
    e.consumerKeys.forEach((t) => {
      const s = this._consumerEntryMap.get(t)?.get(e);
      if (s) {
        const i = this._providerEntryMap.get(t)?.get(s);
        i && (i.consumersWeakSet.delete(e), i.consumersSet.delete(e));
      }
    });
  }
  _findConsumers(e) {
    const t = {};
    e.providerKeys.forEach((r) => {
      t[r] = [];
    });
    const s = [e],
      i = [e.providerKeys];
    for (; s.length; ) {
      const r = s.shift(),
        c = i.shift();
      if (!c)
        throw new Error(`ContextManager: keyFlag is undefined, This should not happen. 
Please contact the developer! https://github.com/guangliang2019`);
      !r ||
        c.length === 0 ||
        (r instanceof m &&
          r !== e &&
          (c.forEach((l) => {
            r.providerKeys.includes(l) && c.splice(c.indexOf(l), 1);
          }),
          c.length === 0)) ||
        (r instanceof d &&
          c.forEach((l) => {
            r.consumerKeys.includes(l) && t[l].push(r);
          }),
        Array.from(r.children).forEach((l) => {
          i.push(c.slice(0)), s.push(l);
        }));
    }
    return t;
  }
  updateContext(e, t, s, i) {
    const r = this._providerEntryMap.get(e)?.get(t);
    r &&
      r.consumersSet.forEach((c) => {
        c[z](e, s, i);
      });
  }
  getConsumers(e, t) {
    return Array.from(this._providerEntryMap.get(e)?.get(t)?.consumersSet || []);
  }
}
class m extends d {
  constructor() {
    super(),
      (this._provideValues = {}),
      (this._consumerKeys = []),
      (this.handleRequestContext = this.handleRequestContext.bind(this));
  }
  get provideValues() {
    return this._provideValues;
  }
  get providerKeys() {
    return this._providerKeys;
  }
  connectedCallback() {
    this.addEventListener('request-context', this.handleRequestContext),
      p.getInstance().addProvider(this);
  }
  disconnectedCallback() {
    this.removeEventListener('request-context', this.handleRequestContext),
      p.getInstance().removeProvider(this);
  }
  setContext(e, t, s = !0) {
    this._provideValues[e] === void 0 && (this._provideValues[e] = {}),
      Object.assign(this._provideValues[e], t),
      s && p.getInstance().updateContext(e, this, this._provideValues[e], Object.keys(t));
  }
  handleRequestContext(e) {
    const { key: t, consumer: s } = e.detail;
    this._providerKeys.includes(t) &&
      this !== s &&
      (e.stopPropagation(),
      p.getInstance().addConsumer(t, this, s),
      this._provideValues[t] === void 0 && (this._provideValues[t] = {}),
      p.getInstance().updateContext(t, this, this._provideValues[t], []));
  }
}
class y extends d {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-trigger']),
      (this._pendingEventListeners = []),
      (this._pendingDispatchEvents = []),
      (this.focus = (e) => {
        this._target === this ? super.focus(e) : this._target?.focus(e);
      }),
      (this.blur = () => (this._target === this ? super.blur : this._target?.blur()));
  }
  addEventListener(...e) {
    this._target
      ? this._target === this
        ? super.addEventListener(...e)
        : this._target.addEventListener(...e)
      : this._pendingEventListeners.push(e);
  }
  removeEventListener(...e) {
    this._target === this
      ? super.removeEventListener(...e)
      : this._target.removeEventListener(...e);
  }
  dispatchEvent(e) {
    return this._target
      ? this._target === this
        ? super.dispatchEvent(e)
        : this._target.dispatchEvent(e)
      : (this._pendingDispatchEvents.push(e), !1);
  }
  connectedCallback() {
    super.connectedCallback();
    const e = F(this, (t) => {
      if (!(t instanceof y)) return !1;
      const s = t.children,
        i = [];
      for (let r = 0; r < s.length; r++) s[r] instanceof y && i.push(s[r]);
      return i.length !== 1;
    });
    (this._target = e),
      this._pendingEventListeners.forEach((t) => this.addEventListener(...t)),
      this._pendingDispatchEvents.forEach((t) => this.dispatchEvent(t)),
      this._target === this ? (this.tabIndex = 0) : (this.tabIndex = -1);
  }
  static get observedAttributes() {
    return ['tabindex'];
  }
  attributeChangedCallback(e, t, s) {
    this._target !== this &&
      e === 'tabindex' &&
      s !== null &&
      t !== s &&
      ((this._target.tabIndex = Number(s)), this.removeAttribute('tabindex'));
  }
}
class B extends m {
  constructor() {
    super(...arguments),
      (this._providerKeys = ['prototype-tab']),
      (this._defaultValue = ''),
      (this._index = -1),
      (this._tabValue = ''),
      (this._tabRefs = []),
      (this._tabs = []),
      (this._changTab = (e, t = !1) => {
        if (
          ((this._index = this._tabs.indexOf(e)),
          this.setContext('prototype-tab', { index: this._index, tabValue: e }),
          t)
        ) {
          const s = this._tabs.findIndex((i) => i === e);
          s !== -1 && this._tabRefs[s].focus();
        }
      });
  }
  get defaultValue() {
    return this._defaultValue;
  }
  get changTab() {
    return this._changTab.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(),
      (this._defaultValue = this.getAttribute('default-value') || ''),
      (this._index = this._tabs.indexOf(this._defaultValue)),
      this.setContext('prototype-tab', {
        tabValue: this._tabValue,
        tabs: this._tabs,
        tabRefs: this._tabRefs,
        index: this._index,
        defaultValue: this._defaultValue,
        changeTab: this.changTab,
      });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
customElements.define('prototype-tab', B);
class j extends d {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-tab']),
      (this._value = ''),
      (this._handlePrototypeTabContextChange = (e) => {
        e.tabValue === this._value && (this.style.display = 'unset'),
          e.tabValue !== this._value && (this.style.display = 'none');
      });
  }
  get value() {
    return this._value;
  }
  connectedCallback() {
    super.connectedCallback(),
      (this._value = this.getAttribute('value') || ''),
      this.addContextListener('prototype-tab', this._handlePrototypeTabContextChange);
  }
  disconnectedCallback() {
    this.removeContextListener('prototype-tab', this._handlePrototypeTabContextChange);
  }
}
customElements.define('prototype-tab-content', j);
class H extends y {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-tab']),
      (this._value = ''),
      (this._handlePrototypeTabContextChange = (e) => {
        e.tabValue === this._value
          ? ((this.tabIndex = 0), this.setAttribute('data-selected', ''))
          : ((this.tabIndex = -1), this.removeAttribute('data-selected'));
      }),
      (this._handleClick = () => this._contextValues['prototype-tab'].changeTab(this._value)),
      (this._handleKeydown = (e) => {
        const t = this._contextValues['prototype-tab'],
          s = t.tabs.indexOf(this._value),
          i = (s + 1) % t.tabs.length,
          r = (s - 1 + t.tabs.length) % t.tabs.length;
        (e.key === 'ArrowRight' || e.key === 'ArrowDown') &&
          (e.preventDefault(), t.changeTab(t.tabs[i], !0)),
          (e.key === 'ArrowLeft' || e.key === 'ArrowUp') &&
            (e.preventDefault(), t.changeTab(t.tabs[r], !0));
      });
  }
  get value() {
    return this._value;
  }
  connectedCallback() {
    super.connectedCallback(),
      (this.style.cursor = 'pointer'),
      (this._value = this.getAttribute('value') || '');
    const e = this._contextValues['prototype-tab'],
      t = E(e.tabRefs, this, L);
    e.tabRefs.splice(t, 0, this),
      e.tabs.splice(t, 0, this._value),
      this.addEventListener('click', this._handleClick),
      this.addEventListener('keydown', this._handleKeydown),
      this.addContextListener('prototype-tab', this._handlePrototypeTabContextChange),
      this._value === this.contextValues['prototype-tab'].defaultValue &&
        this.contextValues['prototype-tab'].changeTab(this._value);
  }
  attributeChangedCallback(e, t, s) {
    super.attributeChangedCallback(e, t, s);
  }
  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick),
      this.removeEventListener('keydown', this._handleKeydown),
      this.removeContextListener('prototype-tab', this._handlePrototypeTabContextChange);
    const e = this._contextValues['prototype-tab'],
      t = E(e.tabRefs, this, L);
    e.tabs.splice(t, 1), e.tabRefs.splice(t, 1);
  }
}
customElements.define('prototype-tab-trigger', H);
class U extends d {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-tab']),
      (this._currentTabRef = null),
      (this._resizeObserver = new ResizeObserver((e) => {
        if (this._tabChangedFlag) {
          this._tabChangedFlag = !1;
          return;
        }
        this.onTabResize(this.contextValues['prototype-tab']);
      })),
      (this._tabChangedFlag = !1),
      (this._handlePrototypeTabContextChange = (e) => {
        this._currentTabRef && this._resizeObserver.unobserve(this._currentTabRef),
          (this._tabChangedFlag = !0),
          (this._currentTabRef = e.tabRefs[e.index]),
          this._currentTabRef && this._resizeObserver.observe(this._currentTabRef),
          this.onTabChange(e);
      }),
      (this.onTabChange = () => {}),
      (this.onTabResize = () => {});
  }
  connectedCallback() {
    super.connectedCallback();
    const e = this._contextValues['prototype-tab'];
    e.tabRefs.length > 0 &&
      e.index !== -1 &&
      ((this._currentTabRef = e.tabRefs[e.index]),
      this._resizeObserver.observe(this._currentTabRef)),
      this.addContextListener('prototype-tab', this._handlePrototypeTabContextChange);
  }
  disconnectedCallback() {
    this._resizeObserver.unobserve(this._currentTabRef),
      this.removeContextListener('prototype-tab', this._handlePrototypeTabContextChange);
  }
}
customElements.define('prototype-tab-indicator', U);
class re extends HTMLElement {
  constructor() {
    super(...arguments), (this._svg = null);
  }
  connectedCallback() {
    this._setup();
  }
  _setup() {
    const e = new DOMParser();
    this._svg = e.parseFromString(
      ` <svg viewBox="0 0 438.549 438.549" class="h-4 w-4">
          <path fill="currentColor" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path>
        </svg>`,
      'text/html'
    );
    const t = this._svg.documentElement.querySelector('svg'),
      s = document.createDocumentFragment();
    s.appendChild(
      S(
        {
          target: '_blank',
          rel: 'noopener noreferrer',
          href: 'https://github.com/guangliang2019/Prototype-UI',
        },
        [
          a(
            {
              class:
                'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground py-2 h-8 w-8 px-0',
            },
            [t ?? '', x({ class: 'sr-only' }, ['GitHub'])]
          ),
        ]
      )
    ),
      this.append(s);
  }
}
customElements.define('github-button', re);
class ae extends HTMLElement {
  constructor() {
    super(...arguments),
      (this._navItemsCls =
        'cursor-pointer transition-colors hover:text-foreground/80 text-foreground/60 data-[selected]:text-foreground');
  }
  connectedCallback() {
    this._setup();
  }
  _setup() {
    this.appendChild(
      n(
        'header',
        {
          class:
            'flex justify-center sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        },
        [
          a({ class: 'container flex h-14 items-center' }, [
            x({ class: 'font-bold mr-6' }, ['shadcn/web']),
            ee({ class: 'relative flex items-center gap-4 text-sm lg:gap-6' }, [
              b({ value: 'docs', class: this._navItemsCls }, ['Docs']),
              b({ value: 'docs', class: this._navItemsCls }, ['Components']),
              b({ value: 'blocks', class: this._navItemsCls }, ['Blocks']),
              b({ value: 'charts', class: this._navItemsCls }, ['Charts']),
              b({ value: 'themes', class: this._navItemsCls }, ['Themes']),
              b({ value: 'examples', class: this._navItemsCls }, ['Examples']),
              b({ value: 'colors', class: this._navItemsCls }, ['Colors']),
            ]),
            a({ class: 'flex flex-1 items-center justify-between space-x-2 md:justify-end' }, [
              n('github-button'),
            ]),
          ]),
        ]
      )
    );
  }
}
customElements.define('website-nav', ae);
class _ {
  constructor() {
    (this.onPopState = (e) => {
      const t = window.location.pathname,
        s = this._currentPath,
        i = window.history.length;
      let r;
      i > this._prevHistoryDepth
        ? (r = 'forward')
        : i < this._prevHistoryDepth
          ? (r = 'back')
          : (r = 'go'),
        (this._prevHistoryDepth = i),
        (this._currentPath = t);
      const c = { from: s, to: t, action: r };
      this.runGuards(c).then((l) => {
        l ? this.onLocationChange(c) : history.go(-1);
      });
    }),
      (this._currentPath = window.location.pathname),
      (this._historyDepth = window.history.length),
      (this._prevHistoryDepth = this._historyDepth),
      (this._guards = []),
      window.addEventListener('popstate', this.onPopState);
  }
  static {
    this._instance = null;
  }
  static getInstance() {
    return _._instance || (_._instance = new _()), _._instance;
  }
  push(e, t) {
    const s = this._currentPath,
      i = e,
      r = { from: s, to: i, action: 'push' };
    this.runGuards(r).then((c) => {
      c &&
        (history.pushState({ ...t, from: s, to: i }, '', e),
        (this._currentPath = i),
        this._historyDepth++,
        (this._prevHistoryDepth = this._historyDepth),
        this.onLocationChange(r));
    });
  }
  replace(e, t) {
    const s = this._currentPath,
      i = e,
      r = { from: s, to: i, action: 'replace' };
    this.runGuards(r).then((c) => {
      c &&
        (history.replaceState({ ...t, from: s, to: i }, '', e),
        (this._currentPath = i),
        this.onLocationChange(r));
    });
  }
  go(e) {
    (this._historyDepth += e), history.go(e);
  }
  back() {
    this.go(-1);
  }
  forward() {
    this.go(1);
  }
  open(e) {
    window.open(e, '_blank');
  }
  addGuard(e) {
    this._guards.push(e);
  }
  removeGuard(e) {
    this._guards = this._guards.filter((t) => t !== e);
  }
  async runGuards(e) {
    for (const t of this._guards) if (!(await t(e))) return !1;
    return !0;
  }
  onLocationChange(e) {}
}
const ce = {
  'Getting Started': [
    { title: 'Introduction', value: 'docs-introduction', href: '/docs/introduction' },
  ],
  'Shadcn UI': [
    { title: 'Button', value: 'shadcn-button', href: '/components/shadcn/button' },
    { title: 'Tab', value: 'shadcn-tab', href: '/components/shadcn/tab' },
    { title: 'Select', value: 'shadcn-select', href: '/components/shadcn/select' },
    { title: 'Input', value: 'shadcn-input', href: '/components/shadcn/input' },
  ],
  'Prototype UI': [
    { title: 'Tab', value: 'prototype-tab', href: '/components/prototype/tab' },
    {
      title: 'Transition',
      value: 'prototype-transition',
      href: '/components/prototype/transition',
    },
    { title: 'Select', value: 'prototype-select', href: '/components/prototype/select' },
    { title: 'Form', value: 'prototype-form', href: '/components/prototype/form' },
    {
      title: 'Scroll Area',
      value: 'prototype-scroll-area',
      href: '/components/prototype/scroll-area',
    },
  ],
};
class le extends HTMLElement {
  constructor() {
    super(), (this._index = {}), (this._index = ce);
  }
  _setup() {
    const e = document.createDocumentFragment();
    e.appendChild(
      a({ class: 'pb-4' }, [
        n('h4', { class: 'mb-1 rounded-md px-2 py-1 text-sm font-semibold' }, ['Getting Started']),
        a({ class: 'grid grid-flow-row auto-rows-max text-sm' }, [
          this._renderItems(this._index['Getting Started']),
        ]),
      ])
    ),
      e.appendChild(
        a({ class: 'pb-4' }, [
          n('h4', { class: 'mb-1 rounded-md px-2 py-1 text-sm font-semibold' }, ['Shadcn UI']),
          a({ class: 'grid grid-flow-row auto-rows-max text-sm' }, [
            this._renderItems(this._index['Shadcn UI']),
          ]),
        ])
      ),
      e.appendChild(
        a({ class: 'pb-4' }, [
          n('h4', { class: 'mb-1 rounded-md px-2 py-1 text-sm font-semibold' }, ['Prototype UI']),
          a({ class: 'grid grid-flow-row auto-rows-max text-sm' }, [
            this._renderItems(this._index['Prototype UI']),
          ]),
        ])
      ),
      this.appendChild(
        J(
          {
            class:
              'fixed md:w-[220px] lg:w-[240px] top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:block',
          },
          [a({ class: 'relative overflow-hidden h-full py-6 pr-6 lg:py-8' }, [e])]
        )
      );
  }
  _renderItems(e) {
    const t = document.createDocumentFragment();
    return (
      e.forEach((s) => {
        t.appendChild(n('website-aside-item', { title: s.title, value: s.value, href: s.href }));
      }),
      t
    );
  }
  connectedCallback() {
    this._setup();
  }
}
customElements.define('website-aside', le);
class he extends HTMLElement {
  constructor() {
    super(...arguments), (this._title = ''), (this._value = ''), (this._href = '');
  }
  connectedCallback() {
    (this._value = this.getAttribute('value') || ''),
      (this._title = this.getAttribute('title') || ''),
      (this._href = this.getAttribute('href') || ''),
      this._setup(),
      (this.onclick = () => {
        _.getInstance().push(this._href);
      });
  }
  _setup() {
    this.appendChild(
      b(
        {
          class:
            'cursor-pointer group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground data-[selected]:text-foreground',
          value: this._value,
        },
        [this._title]
      )
    );
  }
}
customElements.define('website-aside-item', he);
class de extends d {
  constructor() {
    super(...arguments), (this._consumerKeys = ['doc']), (this.svg = null);
  }
  connectedCallback() {
    super.connectedCallback(), this._setup();
  }
  _setup() {
    if (this.svg === null) {
      const i = new DOMParser();
      this.svg = i.parseFromString(
        `
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        `,
        'text/html'
      );
    }
    const e = this.svg.documentElement.querySelector('svg'),
      t = document.createDocumentFragment(),
      s = this._contextValues.doc.doc.route;
    for (let i = 0; i < s.length; i++) {
      const r = s[i];
      i < s.length - 1
        ? (t.appendChild(a({ class: 'truncate' }, [r])), t.appendChild(e))
        : t.appendChild(a({ class: 'text-foreground' }, [r]));
    }
    this.appendChild(
      a({ class: 'mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground' }, [
        t,
      ])
    );
  }
}
customElements.define('doc-breadcrumb', de);
class ue extends HTMLElement {
  connectedCallback() {
    this._setup();
  }
  _setup() {
    this.appendChild(
      a({ class: 'hidden text-sm xl:block w-[300px]' }, [
        a({ class: 'fixed top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12' }, [
          a({ class: 'space-y-2' }, [
            P({ class: 'font-medium' }, ['On This Page']),
            te({ class: 'm-0 list-none' }, [
              se({ class: 'mt-0 pt-2' }, [
                S(
                  {
                    href: '#faq',
                    class:
                      'inline-block no-underline transition-colors hover:text-foreground text-muted-foreground',
                  },
                  ['FAQ']
                ),
              ]),
            ]),
          ]),
        ]),
      ])
    );
  }
}
customElements.define('doc-anchor', ue);
class f extends m {
  constructor() {
    super(...arguments), (this._providerKeys = ['doc']);
  }
  connectedCallback() {
    super.connectedCallback(), this.setContext('doc', { doc: this._doc }), this._setup();
  }
  _setup() {
    if (!this._doc)
      throw new Error(
        "DocComponent should be initialized with '_doc' property before connectedCallback"
      );
    const e = this._doc.sections,
      t = ne({ value: this._doc.id, style: 'display: none' }, [
        Q(
          {
            class:
              'lg:ml-[calc(2.5rem+240px)] md:ml-[calc(2rem+220px)] flex relative flex-1 py-6 lg:gap-10 items-start justify-between  lg:py-8 max-w-[1104px] lg:w-[calc(100vw-240px-4rem)] md:w-[calc(100vw-220px-6rem)] sm:w-full xs:w-[100vw]',
          },
          [
            a({ class: 'w-full' }, [
              n('doc-breadcrumb'),
              a({ class: 'space-y-2' }, [
                n('h1', { class: 'scroll-m-20 text-3xl font-bold tracking-tight' }, [
                  this._doc.title ?? '',
                ]),
                P({ class: 'text-base text-muted-foreground' }, [
                  x(
                    {
                      style:
                        'display: inline-block; vertical-align: top; text-decoration: inherit;',
                    },
                    [this._doc.desc ?? '']
                  ),
                ]),
              ]),
              a(
                { class: 'pb-12 pt-8' },
                e.map((s) => {
                  const i = document.createDocumentFragment();
                  return (
                    s.title &&
                      i.appendChild(
                        n(
                          'h2',
                          {
                            class:
                              'font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
                            id: s.title,
                          },
                          [
                            S({
                              class: 'font-medium underline underline-offset-4 subheading-anchor',
                              'aria-label': 'Link to section',
                              href: `#${s.title}`,
                            }),
                            s.title,
                          ]
                        )
                      ),
                    s.contents.forEach((r) => {
                      switch (
                        (r.title &&
                          i.appendChild(
                            n(
                              'h3',
                              {
                                class:
                                  'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
                                id: r.title,
                              },
                              [
                                S({
                                  class:
                                    'font-medium underline underline-offset-4 subheading-anchor',
                                  'aria-label': 'Link to section',
                                  href: `#${r.title}`,
                                }),
                                r.title,
                              ]
                            )
                          ),
                        r.type)
                      ) {
                        case 'code':
                          i.appendChild(n(r.content));
                          break;
                        case 'text':
                          i.appendChild(
                            P({ class: 'leading-7 [&:not(:first-child)]:mt-6' }, [r.content])
                          );
                          break;
                      }
                    }),
                    i
                  );
                })
              ),
            ]),
            n('doc-anchor'),
          ]
        ),
      ]);
    this.appendChild(t);
  }
}
class pe extends B {
  connectedCallback() {
    super.connectedCallback(), (this.className = 'relative mr-auto w-full');
  }
}
class me extends j {}
class fe extends H {
  connectedCallback() {
    super.connectedCallback(),
      (this.style.transition = 'all 0.09s ease-in-out'),
      (this.className =
        'inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[selected]:border-b-primary data-[selected]:text-foreground data-[selected]:shadow-none');
  }
}
class be extends U {
  constructor() {
    super(...arguments),
      (this._currentTabIndex = 0),
      (this.__resizeObserver = new ResizeObserver((e) => {
        this.onTabResize(this.contextValues['prototype-tab']);
      }));
  }
  _getOffsetRight(e) {
    const t = e;
    return t.parentElement.offsetWidth - (t.offsetWidth + t.offsetLeft);
  }
  _leadingDebounce(e, t) {
    let s = null,
      i = !1;
    return function (...r) {
      s || (e(...r), (i = !0)),
        s && clearTimeout(s),
        (s = setTimeout(() => {
          i || e(...r), (i = !1), (s = null);
        }, t));
    };
  }
  connectedCallback() {
    super.connectedCallback(),
      (this.style.willChange = 'width left right'),
      this.__resizeObserver.observe(this.parentElement),
      (this.className = 'absolute -mb-[34px] h-0.5 bg-primary'),
      (this.onTabResize = this._leadingDebounce((e) => {
        const t = e.tabRefs[e.index];
        (this.style.transition = ''),
          (this.style.left = `${t.offsetLeft}px`),
          (this.style.right = `${this._getOffsetRight(t)}px`),
          (this.style.width = `${t.offsetWidth}px`);
      }, 100)),
      (this.onTabChange = (e) => {
        requestAnimationFrame(() => {
          (this.style.width = 'unset'),
            (this.style.transition =
              this._currentTabIndex < e.index
                ? 'left .12s ease-out .09s, right .12s ease-out'
                : 'left .12s ease-out, right .12s ease-out .09s'),
            (this._currentTabIndex = e.index);
          const t = e.tabRefs[e.index];
          (this.style.right = `${this._getOffsetRight(t)}px`),
            (this.style.left = `${t.offsetLeft}px`);
        });
      });
  }
  disconnectedCallback() {
    this.__resizeObserver.disconnect();
  }
}
customElements.define('doc-tab', pe);
customElements.define('doc-tab-content', me);
customElements.define('doc-tab-trigger', fe);
customElements.define('doc-tab-indicator', be);
function ge(o, e) {
  let t = [],
    s = 0;
  for (; s < o.length; ) {
    let i = { index: 1 / 0, endIndex: 1 / 0, regexIndex: -1, matchText: '' };
    if (
      (e.forEach((r, c) => {
        let l = o.substring(s).search(r.regex);
        if (l !== -1) {
          l += s;
          const w = o.substring(l).match(r.regex);
          if (w) {
            const k = w[0].length;
            l < i.index &&
              (i = { index: l, endIndex: l + k, regexIndex: c, matchText: o.substring(l, l + k) });
          }
        }
      }),
      s < i.index && t.push({ text: o.slice(s, i.index), className: '' }),
      i.regexIndex !== -1)
    )
      t.push({ text: i.matchText, className: e[i.regexIndex].className }), (s = i.endIndex);
    else break;
  }
  return t;
}
const h = {
  htmlTagName: {
    regex: /\b(div|span|a|p|ul|ol|li|h[1-6]|br|hr|input|form|script)\b(?=[^>]*>)/,
    className: 'html-tag-name',
  },
  shadcnTagName: { regex: /\b(shadcn-[a-z0-9-]*)\b/, className: 'custom-html-tag-name' },
  prototypeTagName: { regex: /\b(prototype-[a-z0-9-]*)\b/, className: 'custom-html-tag-name' },
  upperCamelCase: { regex: /\b[A-Z][a-z]+(?:[A-Z][a-z]+)*\b/, className: 'upper-camel-case' },
};
class u extends d {
  constructor() {
    super(...arguments), (this._consumerKeys = ['doc']);
  }
  connectedCallback() {
    super.connectedCallback(), this._setup();
  }
  _renderCodeBlock() {
    return n(
      'pre',
      {
        class:
          'mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-30 py-4 dark:bg-zinc-900',
      },
      [
        n(
          'code',
          {
            class:
              'flex flex-col relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm max-w-[calc(100vw-960px-6rem)]',
          },
          this._code
            .trim()
            .split(
              `
`
            )
            .map((t) =>
              x(
                { class: 'px-4 py-0.5 w-full inline-block min-h-4' },
                ge(t, this._highlightRules).map((s) =>
                  x({ class: s.className || 'text-muted-foreground' }, [s.text])
                )
              )
            )
        ),
      ]
    );
  }
  _setup() {
    const e = n('doc-tab', { 'default-value': 'Preview' }, [
      a({ class: 'group relative my-4 flex flex-col space-y-2' }, [
        a(
          {
            class:
              'relative inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0',
          },
          [
            n('doc-tab-trigger', { value: 'Preview' }, ['Preview']),
            n('doc-tab-trigger', { value: 'Code' }, ['Code']),
            n('doc-tab-indicator', {}, []),
          ]
        ),
        n('doc-tab-content', { value: 'Preview', style: 'display: none' }, [
          a(
            {
              class:
                'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border',
            },
            [
              a({ class: 'flex items-center justify-between p-4' }, [
                'Select Theme',
                a({}, ['Copy as...']),
              ]),
              a({ style: 'min-height: 350px', class: 'flex items-center justify-center' }, [
                this._preview(),
              ]),
            ]
          ),
        ]),
        n('doc-tab-content', { value: 'Code', style: 'display: none' }, [this._renderCodeBlock()]),
      ]),
    ]);
    this.appendChild(e);
  }
}
class T extends y {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-form']),
      (this._disabled = !1),
      (this._hover = !1),
      (this._handleMouseEnter = () => this._handleHoverChange(!0)),
      (this._handleMouseLeave = () => this._handleHoverChange(!1)),
      (this._focus = !1),
      (this._handleFocus = () => this._handleFocusChange(!0)),
      (this._handleBlur = () => this._handleFocusChange(!1)),
      (this._active = !1),
      (this._handleActive = () => this._handleActiveChange(!0)),
      (this._handleInactive = () => this._handleActiveChange(!1)),
      (this._autoFocus = !1),
      (this.onClick = () => {}),
      (this._handleEnterKeyDown = (e) => {
        this.disabled ||
          (e.key === 'Enter' &&
            (this._handleActive(), this._handleClick(), this._handleInactive()));
      }),
      (this._handleClick = () => {
        this.disabled || this.onClick();
      });
  }
  get disabled() {
    return this._disabled;
  }
  _handleDisableChange(e) {
    (this._disabled = e), e ? (this.tabIndex = -1) : (this.tabIndex = 0);
  }
  set disabled(e) {
    this._handleDisableChange(e);
  }
  _handleHoverChange(e) {
    (this._hover = e),
      this._hover ? this.setAttribute('data-hover', '') : this.removeAttribute('data-hover');
  }
  _handleFocusChange(e) {
    (this._focus = e),
      this._focus ? this.setAttribute('data-focus', '') : this.removeAttribute('data-focus');
  }
  _handleActiveChange(e) {
    (this._active = e),
      this._active ? this.setAttribute('data-active', '') : this.removeAttribute('data-active');
  }
  get autoFocus() {
    return this._autoFocus;
  }
  connectedCallback() {
    super.connectedCallback(),
      this.addEventListener('click', this._handleClick),
      (this.tabIndex = 0),
      this.addEventListener('keydown', this._handleEnterKeyDown),
      this.addEventListener('mouseenter', this._handleMouseEnter),
      this.addEventListener('mouseleave', this._handleMouseLeave),
      this.addEventListener('focus', this._handleFocus),
      this.addEventListener('blur', this._handleBlur),
      this.addEventListener('mousedown', this._handleActive),
      this.addEventListener('mouseup', this._handleInactive),
      (this._autoFocus = this.hasAttribute('autofocus')),
      this.autoFocus && this.focus();
  }
  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick),
      this.removeEventListener('keydown', this._handleEnterKeyDown),
      this.removeEventListener('mouseenter', this._handleMouseEnter),
      this.removeEventListener('mouseleave', this._handleMouseLeave),
      this.removeEventListener('focus', this._handleFocus),
      this.removeEventListener('blur', this._handleBlur),
      this.removeEventListener('mousedown', this._handleActive),
      this.removeEventListener('mouseup', this._handleInactive);
  }
  attributeChangedCallback(e, t, s) {
    ({ disabled: () => (this.disabled = s !== null) })[e]?.();
  }
  static get observedAttributes() {
    return ['disabled'];
  }
}
customElements.define('prototype-button', T);
class _e extends m {
  constructor() {
    super(...arguments),
      (this._providerKeys = ['prototype-dialog']),
      (this._consumerKeys = []),
      (this._visible = !1);
  }
  get visible() {
    return this._visible;
  }
  set visible(e) {
    e !== this._visible &&
      ((this._visible = e),
      this._visible
        ? (this._provideValues['prototype-dialog'].open(), this.setAttribute('visible', ''))
        : (this._provideValues['prototype-dialog'].close(), this.removeAttribute('visible')));
  }
  get open() {
    return () => (this.visible = !0);
  }
  get close() {
    return () => (this.visible = !1);
  }
  connectedCallback() {
    super.connectedCallback(),
      (this.visible = this.getAttribute('visible') !== null),
      this.setContext('prototype-dialog', { visible: this.visible });
  }
  attributeChangedCallback(e, t, s) {
    ({
      visible: () => {
        (this.visible = s !== null), this.visible && t !== s ? this.open() : this.close();
      },
    })[e]?.();
  }
}
customElements.define('prototype-dialog', _e);
class ye extends T {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-dialog']),
      (this.onClick = () => this._contextValues['prototype-dialog'].close());
  }
}
customElements.define('prototype-dialog-close', ye);
class C extends d {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-overlay']),
      (this._content = document.createElement('click-outside')),
      (this._closestRelative = this),
      (this.target = void 0),
      (this.overlayKey = '__default__'),
      (this.unmount = !1),
      (this._opened = !1),
      (this.onClickOutside = (e) => {});
  }
  connectedCallback() {
    for (super.connectedCallback(), this.style.position = 'relative'; this.firstChild; )
      this._content.appendChild(this.firstChild);
    this._target ||
      ((this.target = this.getAttribute('target') ?? void 0),
      (this._target = this.target ? document.querySelector(this.target) || document.body : this)),
      (this._closestRelative =
        this._target === this ? this : this.findClosestRelative(this._target)),
      (this._content.onClickOutside = (e) => {
        this._opened && this.onClickOutside(e);
      });
  }
  open() {
    if (this._opened) return;
    (this._opened = !0), this._closestRelative.appendChild(this._content);
    const e = new CustomEvent('overlay-open', {
      bubbles: !0,
      composed: !0,
      detail: { overlayKey: this.overlayKey, overlay: this },
    });
    this.setAttribute('data-open', ''), this.dispatchEvent(e);
  }
  close() {
    this._opened &&
      ((this._opened = !1),
      this.removeAttribute('data-open'),
      this._closestRelative.removeChild(this._content));
  }
  static get observedAttributes() {
    return ['class', 'style'];
  }
  attributeChangedCallback(e, t, s) {
    e === 'class' && s !== '' && t !== s
      ? ((this._content.className = s), (this.className = ''))
      : e === 'style' &&
        s !== 'position: relative;' &&
        t !== s &&
        ((this._content.style.cssText = s),
        (this._content.style.position = 'absolute'),
        (this.style.cssText = 'position: relative;'));
  }
  findClosestRelative(e) {
    let t = e;
    for (; t && t !== document.body; ) {
      const s = window.getComputedStyle(t);
      if (s.position === 'relative' || s.position === 'absolute') return t;
      t = t.parentElement;
    }
    return document.body;
  }
}
customElements.define('prototype-overlay', C);
class ve extends m {
  constructor() {
    super(...arguments), (this._providerKeys = ['prototype-overlay']), (this._consumerKeys = []);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener('overlay-open', this._handleOverlayOpen);
  }
  _handleOverlayOpen(e) {
    const { overlayKey: t, overlay: s } = e.detail,
      i = p.getInstance().getConsumers('prototype-overlay', this);
    for (const r of i)
      r instanceof C &&
        r.getAttribute('data-open') !== null &&
        r.overlayKey === t &&
        r !== s &&
        r.close();
  }
}
customElements.define('prototype-overlay-provider', ve);
class xe extends C {
  constructor() {
    super(...arguments), (this._consumerKey = 'prototype-dialog'), (this._target = document.body);
  }
  connectedCallback() {
    super.connectedCallback(),
      (this._contextValues['prototype-dialog'].open = this.open.bind(this)),
      (this._contextValues['prototype-dialog'].close = this.close.bind(this));
  }
}
customElements.define('prototype-dialog-content', xe);
class Ce extends y {
  constructor() {
    super(...arguments), (this._consumerKey = 'prototype-dialog');
  }
}
customElements.define('prototype-dialog-trigger', Ce);
class $ extends m {
  constructor() {
    super(),
      (this._providerKeys = ['prototype-select']),
      (this._consumerKeys = ['prototype-form-item']),
      (this._defaultValue = ''),
      (this._index = -1),
      (this._value = ''),
      (this._items = []),
      (this._selecting = !1),
      (this._itemRefs = []),
      (this._handleFormAction = () => {
        this._contextValues['prototype-form-item'] &&
          this._contextValues['prototype-form-item'].changeFormItemValue(this._value);
      });
    const e = { items: [] };
    this.setContext('prototype-select', e);
  }
  get defaultValue() {
    return this._defaultValue;
  }
  connectedCallback() {
    super.connectedCallback(),
      (this._defaultValue = this.getAttribute('default-value') || ''),
      (this._value = this._defaultValue),
      this.setAttribute('data-state', 'close'),
      this._handleFormAction(),
      this.setContext('prototype-select', {
        defaultValue: this._defaultValue,
        index: this._index,
        value: this._value,
        items: this._items,
        selecting: this._selecting,
        changeValue: (e, t = !1) => {
          (this._value = e),
            (this._index = this._items.indexOf(e)),
            this.setContext('prototype-select', { index: this._index, value: this._value }),
            this._handleFormAction(),
            t && this._provideValues['prototype-select'].focus(),
            this._provideValues['prototype-select'].close();
        },
        itemsRefs: this._itemRefs,
        rootRef: this,
      });
  }
}
customElements.define('prototype-select', $);
class W extends y {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-select']),
      (this._handleMouseDown = (e) => {
        const t = this._contextValues['prototype-select'];
        (t.width = this.offsetWidth),
          e.target instanceof Node && this.contains(e.target)
            ? document.activeElement === this &&
              (t.selecting ? t.close() : t.open(), this._focusSelectedItem(t))
            : t.selecting && t.close();
      }),
      (this._handleKeydown = (e) => {
        (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), this._handleFocus());
      }),
      (this._handleFocus = () => {
        const e = this._contextValues['prototype-select'];
        (e.width = this.offsetWidth),
          e.selecting ? e.close() : e.open(),
          this._focusSelectedItem(e);
      });
  }
  _focusSelectedItem(e) {
    const t = e.items.indexOf(e.value);
    t !== -1 && Array.isArray(e.itemsRefs) && e.itemsRefs.length > t
      ? requestAnimationFrame(() => {
          const s = e.itemsRefs[t];
          s && typeof s.focus == 'function'
            ? s.focus()
            : console.warn(
                `Failed to focus item at index ${t}. Item may not be properly initialized.`
              );
        })
      : console.debug(`Invalid index ${t} or itemsRefs not properly initialized.`);
  }
  connectedCallback() {
    super.connectedCallback();
    const e = this._contextValues['prototype-select'];
    (e.triggerRef = this),
      (e.focus = this.focus.bind(this)),
      this.addEventListener('mousedown', this._handleMouseDown),
      this.addEventListener('focus', this._handleFocus),
      this.addEventListener('keydown', this._handleKeydown);
  }
  disconnectedCallback() {
    this.removeEventListener('mousedown', this._handleMouseDown),
      this.removeEventListener('focus', this._handleFocus),
      this.removeEventListener('keydown', this._handleKeydown);
  }
}
customElements.define('prototype-select-trigger', W);
class G extends C {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-select']),
      (this.onClickOutside = (e) => {
        const t = this._contextValues['prototype-select'];
        e.target !== t.triggerRef && this.close();
      });
  }
  connectedCallback() {
    super.connectedCallback(), (this._contextValues['prototype-select'].contentRef = this);
    const e = this._contextValues['prototype-select'];
    (e.open = this.open.bind(this)), (e.close = this.close.bind(this));
  }
  open() {
    const e = this._contextValues['prototype-select'];
    e.selecting ||
      ((this.style.width = e.width + 'px'),
      (e.selecting = !0),
      e.rootRef.setAttribute('data-state', 'open'),
      super.open());
  }
  close() {
    const e = this._contextValues['prototype-select'];
    e.selecting &&
      (super.close(),
      e.rootRef.setAttribute('data-state', 'close'),
      e.triggerRef.focus(),
      (e.selecting = !1));
  }
}
customElements.define('prototype-select-content', G);
class q extends T {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-select']),
      (this._value = ''),
      (this._handleSelectItemMouseEnter = () => {
        this.focus();
      }),
      (this._handleSelectItemMouseLeave = () => {
        this.blur();
      }),
      (this._handlePrototypeSelectContextChange = (e) => {
        this.value === e.value
          ? this.setAttribute('data-selected', '')
          : this.removeAttribute('data-selected');
      }),
      (this._handleKeydown = (e) => {
        const t = this._contextValues['prototype-select'],
          s = t.items.indexOf(this._value),
          i = (s + 1) % t.items.length,
          r = (s - 1 + t.items.length) % t.items.length;
        (e.key === 'ArrowRight' || e.key === 'ArrowDown') &&
          (e.preventDefault(), t.itemsRefs[i].focus()),
          (e.key === 'ArrowLeft' || e.key === 'ArrowUp') &&
            (e.preventDefault(), t.itemsRefs[r].focus()),
          (e.key === 'Enter' || e.key === ' ') &&
            (e.preventDefault(), t.changeValue(this._value, !0)),
          e.key === 'Tab' && t.close();
      });
  }
  get value() {
    return this._value;
  }
  connectedCallback() {
    super.connectedCallback(), (this.tabIndex = -1);
    const e = this._contextValues['prototype-select'];
    (this._value = this.getAttribute('value') || ''),
      e.defaultValue === this.value && this.setAttribute('data-selected', '');
    const t = E(e.itemsRefs, this, L);
    e.itemsRefs.splice(t, 0, this),
      e.items.splice(t, 0, this._value),
      this.addEventListener('mouseenter', this._handleSelectItemMouseEnter),
      this.addEventListener('mouseleave', this._handleSelectItemMouseLeave),
      this.addEventListener('keydown', this._handleKeydown),
      this.addContextListener('prototype-select', this._handlePrototypeSelectContextChange),
      (this.onClick = () => {
        e.changeValue(this.value, !0);
      });
  }
  disconnectedCallback() {
    this.removeEventListener('mouseenter', this._handleSelectItemMouseEnter),
      this.removeEventListener('mouseleave', this._handleSelectItemMouseLeave),
      this.removeEventListener('keydown', this._handleKeydown),
      this.removeContextListener('prototype-select', this._handlePrototypeSelectContextChange);
    const e = this._contextValues['prototype-select'],
      t = E(e.itemsRefs, this, L);
    e.items.splice(t, 1), e.itemsRefs.splice(t, 1), super.disconnectedCallback();
  }
}
customElements.define('prototype-select-item', q);
class Y extends d {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-select']),
      (this._content = document.createElement('span')),
      (this.renderValue = (e) => {
        const t = document.createElement('span');
        return (t.textContent = e), t;
      }),
      (this._handlePrototypeSelectContextChange = (e, t) => {
        t.includes('value') && this._setup();
      });
  }
  connectedCallback() {
    super.connectedCallback(),
      (this._contextValues['prototype-select'].valueRef = this),
      this._setup(),
      this.addContextListener('prototype-select', this._handlePrototypeSelectContextChange);
  }
  disconnectedCallback() {
    this.removeContextListener('prototype-select', this._handlePrototypeSelectContextChange);
  }
  _setup() {
    this.firstChild && this.removeChild(this._content);
    const e = this._contextValues['prototype-select'];
    (this._content = this.renderValue(e.value)), this.appendChild(this._content);
  }
}
customElements.define('prototype-select-value', Y);
const g = {
  open: !0,
  unmount: !1,
  appear: !1,
  beforeEnter: void 0,
  afterEnter: void 0,
  beforeLeave: void 0,
  afterLeave: void 0,
};
class we extends HTMLElement {
  constructor() {
    super(...arguments),
      (this._state = 'idle'),
      (this._open = g.open),
      (this.appear = g.appear),
      (this.unmount = g.unmount),
      (this.beforeEnter = g.beforeEnter),
      (this.afterEnter = g.afterEnter),
      (this.beforeLeave = g.beforeLeave),
      (this.afterLeave = g.afterLeave),
      (this._onTransitionEnd = () => {
        this._state === 'entering'
          ? (this._transitionTo('entered'), this.removeAttribute('data-enter'))
          : this._state === 'leaving' &&
            (this._transitionTo('left'), this.removeAttribute('data-leave'));
      });
  }
  get open() {
    return this._open;
  }
  set open(e) {
    const t = this._open;
    (this._open = e),
      t !== e &&
        (this.toggleAttribute('open', e),
        this.open ? this._transitionTo('entering') : this._transitionTo('leaving'));
  }
  static get observedAttributes() {
    return ['open', 'unmount', 'appear'];
  }
  connectedCallback() {
    this.appear && this.open && this._transitionTo('entering');
  }
  attributeChangedCallback(e, t, s) {
    ({
      open: () => {
        (this.open = s !== null),
          this.open ? this._transitionTo('entering') : this._transitionTo('leaving');
      },
      unmount: () => (this.unmount = s !== null),
      appear: () => (this.appear = s !== null),
    })[e]?.();
  }
  _transitionTo(e) {
    switch (
      (this.removeEventListener('transitionend', this._onTransitionEnd), (this._state = e), e)
    ) {
      case 'entering':
        this._enter();
        break;
      case 'leaving':
        this._leave();
        break;
      case 'entered':
        this.afterEnter?.();
        break;
      case 'left':
        this.afterLeave?.(), this.unmount && this.remove();
        break;
    }
  }
  _enter() {
    this.beforeEnter?.(),
      this.removeAttribute('data-closed'),
      this.setAttribute('data-entered', ''),
      this.setAttribute('data-enter', ''),
      requestAnimationFrame(() => {
        this.addEventListener('transitionend', this._onTransitionEnd, { once: !0 });
      });
  }
  _leave() {
    this.beforeLeave?.(),
      this.removeAttribute('data-entered'),
      this.setAttribute('data-leave', ''),
      this.setAttribute('data-closed', ''),
      requestAnimationFrame(() => {
        this.addEventListener('transitionend', this._onTransitionEnd, { once: !0 });
      });
  }
}
customElements.define('prototype-transition', we);
class X extends m {
  constructor() {
    super(),
      (this._providerKeys = ['motion-scroll']),
      (this._provideValues = { 'motion-scroll': {} }),
      (this._handleScroll = (e) => {
        const t = e.target;
        this.setContext('motion-scroll', { scrollY: t.scrollTop, scrollX: t.scrollLeft });
      }),
      (this._resizeObserver = new ResizeObserver((e) => {
        for (let t of e)
          t.target === this &&
            this.setContext('motion-scroll', {
              viewportHeight: t.contentRect.height,
              viewportWidth: t.contentRect.width,
            }),
            t.target === this._contentRef &&
              this.setContext('motion-scroll', {
                contentHeight: t.contentRect.height,
                contentWidth: t.contentRect.width,
              });
      }));
  }
  get contentRef() {
    return this._contentRef;
  }
  set contentRef(e) {
    this._contentRef !== e &&
      (this._contentRef && this._resizeObserver.unobserve(this._contentRef),
      (this._contentRef = e),
      e && this._resizeObserver.observe(e));
  }
  connectedCallback() {
    super.connectedCallback(),
      this._resizeObserver.observe(this),
      this.firstChild && (this.contentRef = this.firstChild),
      (this._provideValues['motion-scroll'].scrollTo = (e, t) => {
        this.scrollTo({ top: t, left: e, behavior: 'auto' });
      }),
      (this._provideValues['motion-scroll'].scrollY = this.contentRef?.scrollTop ?? 0),
      (this._provideValues['motion-scroll'].scrollX = this.contentRef?.scrollLeft ?? 0),
      this.addEventListener('scroll', this._handleScroll);
  }
  disconnectedCallback() {
    this._resizeObserver.disconnect(),
      this._contentRef && this._contentRef.removeEventListener('scroll', this._handleScroll),
      super.disconnectedCallback();
  }
}
customElements.define('motion-scroll', X);
class ke extends f {
  constructor() {
    super(...arguments),
      (this._doc = {
        title: 'Introduction',
        id: 'docs-introduction',
        desc: 'The web component version of Headless UI & Shadcn/ui. Still in progress.',
        route: ['Docs', 'introduction'],
        links: [],
        sections: [],
      });
  }
}
customElements.define('doc-introduction', ke);
const A = { variant: 'secondary', iconOnly: !1, disabled: !1, autoFocus: !1, onClick: () => {} },
  Ee = { shadcn: { prefix: 'shadcn' } };
function Se(o) {
  const e = o.split(' '),
    t = {};
  return (
    e.forEach((s) => {
      const i = s.match(/^(\w+-)(\d+)/);
      if (i) {
        const [r, c, l] = i;
        t[c] = `${c}${l}`;
      } else t[s] = s;
    }),
    Object.values(t).join(' ')
  );
}
class Le extends T {
  constructor() {
    super(...arguments),
      (this._iconOnly = A.iconOnly),
      (this._variant = A.variant),
      (this._class = ''),
      (this._computedClass = '');
  }
  static get observedAttributes() {
    return [...super.observedAttributes, 'variant', 'icon-only'];
  }
  attributeChangedCallback(e, t, s) {
    super.attributeChangedCallback(e, t, s),
      { variant: () => (this._variant = s), 'icon-only': () => (this._iconOnly = s !== null) }[
        e
      ]?.(),
      t !== s &&
        t !== null &&
        (e === 'variant' || e === 'icon-only' || e === 'disabled') &&
        this._setup();
  }
  connectedCallback() {
    (this._class = this.className || ''),
      super.connectedCallback(),
      (this._variant = this.getAttribute('variant') || A.variant),
      (this._iconOnly = this.hasAttribute('icon-only')),
      this._setup();
  }
  _setup() {
    let e = 'select-none whitespace-nowrap',
      t = 'inline-flex items-center justify-center gap-2',
      s = 'rounded-md',
      i = this._iconOnly ? 'h-9 w-9' : 'h-9 px-4 py-2',
      r = this.disabled ? 'cursor-arrow' : 'cursor-pointer',
      c = 'text-sm font-medium',
      l = 'transition-colors',
      w = 'disabled:pointer-events-none disabled:opacity-50',
      k = 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      I = 'shadow-sm',
      v = 'bg-secondary text-secondary-foreground  hover:bg-secondary/80',
      O = '',
      V = '';
    switch (this._variant) {
      case 'primary':
        (v = 'bg-primary text-primary-foreground hover:bg-primary/90'), (I = 'shadow-lg');
        break;
      case 'secondary':
        break;
      case 'outline':
        (v = 'bg-background hover:bg-accent hover:text-accent-foreground'),
          (O = 'border border-input');
        break;
      case 'destructive':
        v = 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
        break;
      case 'ghost':
        v = 'hover:bg-accent hover:text-accent-foreground';
        break;
      case 'link':
        (V = 'text-primary underline-offset-4 hover:underline'), (v = '');
        break;
    }
    (this._computedClass = [e, t, s, i, r, c, l, w, k, I, v, O, V].join(' ').trimEnd()),
      (this.className = Se([this._computedClass, this._class].join(' ').trimEnd()));
  }
}
customElements.define(`${Ee.shadcn.prefix}-button`, Le);
class Re extends $ {
  constructor() {
    super(...arguments),
      (this._providerKeys = ['shadcn-select', 'prototype-select']),
      (this._class = ''),
      (this._computedClass = ''),
      (this._arrowRef = document.createElement('shadcn-select-arrow')),
      (this._checkRef = document.createElement('shadcn-select-check')),
      (this._valueRef = document.createElement('shadcn-select-value'));
  }
  connectedCallback() {
    super.connectedCallback(),
      (this._provideValues['shadcn-select'] = {
        arrowRef: this._arrowRef,
        checkRef: this._checkRef,
        valueRef: this._valueRef,
        updateRef: (e, t) => {
          (this[`_${e}`] = t), this.setContext('shadcn-select', { [e]: t });
        },
      }),
      this._setup();
  }
  _setup() {
    (this._computedClass = 'block'),
      (this.className = [this._computedClass, this._class].join(' ').trimEnd());
  }
}
customElements.define('shadcn-select', Re);
class Te extends d {
  constructor() {
    super(...arguments), (this._consumerKeys = ['shadcn-select', 'prototype-select']);
  }
  connectedCallback() {
    if (
      (super.connectedCallback(),
      (this._contextValues['shadcn-select'].arrowRef = this),
      this.children.length > 0 || this.textContent !== '')
    ) {
      this._contextValues['shadcn-select'].updateRef('arrowRef', this);
      return;
    }
    this.className = 'w-4 h-4 opacity-50';
    const e = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    e.setAttribute('viewBox', '0 0 24 24'),
      e.setAttribute('fill', 'none'),
      e.setAttribute('stroke', 'currentColor'),
      e.setAttribute('stroke-width', '2'),
      e.setAttribute('stroke-linecap', 'round'),
      e.setAttribute('stroke-linejoin', 'round'),
      e.classList.add('shadcn-icon', 'shadcn-select-arrow');
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    t.setAttribute('d', 'M8.5 15L12 18.5L15.5 15'),
      t.setAttribute('stroke-width', '1.5'),
      e.appendChild(t);
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    s.setAttribute('d', 'M8.5 9L12 5.5L15.5 9'),
      s.setAttribute('stroke-width', '1.5'),
      e.appendChild(s),
      this.appendChild(e);
  }
}
customElements.define('shadcn-select-arrow', Te);
class Ae extends W {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['shadcn-select', 'prototype-select']),
      (this._class = ''),
      (this._computedClass = ''),
      (this._handleShadcnSelectContextChange = (e) => {
        this._arrowRef !== e.arrowRef && (this._arrowRef?.remove(), (this._arrowRef = e.arrowRef)),
          this._valueRef !== e.valueRef &&
            (this._valueRef?.remove(), (this._valueRef = e.valueRef));
      });
  }
  connectedCallback() {
    super.connectedCallback(),
      (this._class = this.className || ''),
      this._setup(),
      this.addContextListener('shadcn-select', this._handleShadcnSelectContextChange);
  }
  disconnectedCallback() {
    this.removeContextListener('shadcn-select', this._handleShadcnSelectContextChange),
      super.disconnectedCallback();
  }
  _setup() {
    (this._computedClass =
      'cursor-pointer flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'),
      this.contains(this._contextValues['shadcn-select'].valueRef) ||
        this.appendChild(this._contextValues['shadcn-select'].valueRef),
      (this._valueRef = this._contextValues['shadcn-select'].valueRef),
      this.contains(this._contextValues['shadcn-select'].arrowRef) ||
        this.appendChild(this._contextValues['shadcn-select'].arrowRef),
      (this._arrowRef = this._contextValues['shadcn-select'].arrowRef),
      (this.className = [this._computedClass, this._class].join(' ').trimEnd());
  }
}
customElements.define('shadcn-select-trigger', Ae);
class Pe extends G {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['shadcn-select', 'prototype-select']),
      (this._class = ''),
      (this._computedClass = '');
  }
  connectedCallback() {
    super.connectedCallback(), this._setup();
  }
  _setup() {
    const e = 'flex flex-col items-start',
      t = 'relative z-50 top-1',
      s = 'max-h-96 min-w-[8rem] p-1',
      i = 'rounded-md shadow-md',
      r = 'border',
      c = 'bg-popover text-popover-foreground',
      l = 'popover-animated-in overflow-hidden';
    (this._computedClass = [e, t, s, i, r, c, l].join(' ').trimEnd()),
      (this._computedClass = this.className =
        [this._computedClass, this._class].join(' ').trimEnd());
  }
}
customElements.define('shadcn-select-content', Pe);
class De extends q {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['shadcn-select', 'prototype-select']),
      (this._class = ''),
      (this._computedClass = ''),
      (this._checkRef = document.createElement('shadcn-select-check')),
      (this._handlePrototypeSelectValueChange = (e, t) => {
        t.includes('value') &&
          (this.value === e.value
            ? this._checkRef.setAttribute('data-selected', '')
            : this._checkRef.removeAttribute('data-selected'));
      });
  }
  connectedCallback() {
    super.connectedCallback(),
      this._setup(),
      this._handlePrototypeSelectValueChange(this._contextValues['prototype-select'], ['value']),
      this.addContextListener('prototype-select', this._handlePrototypeSelectValueChange);
  }
  disconnectedCallback() {
    this.removeContextListener('prototype-select', this._handlePrototypeSelectValueChange),
      super.disconnectedCallback();
  }
  _setup() {
    (this._computedClass =
      'relative flex justify-between w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'),
      this.contains(this._checkRef) || this.appendChild(this._checkRef),
      (this.className = [this._computedClass, this._class].join(' ').trimEnd());
  }
}
customElements.define('shadcn-select-item', De);
class Ie extends Y {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['shadcn-select', 'prototype-select']),
      (this.renderValue = (e) => {
        const t = document.createElement('span');
        return (t.textContent = e), t;
      });
  }
  connectedCallback() {
    if (
      (super.connectedCallback(),
      (this._contextValues['shadcn-select'].valueRef = this),
      this.children.length > 0 || this.textContent !== '')
    ) {
      this._contextValues['shadcn-select'].updateRef('valueRef', this);
      return;
    }
  }
}
customElements.define('shadcn-select-value', Ie);
class Oe extends d {
  constructor() {
    super(...arguments), (this._consumerKeys = ['shadcn-select', 'prototype-select']);
  }
  connectedCallback() {
    if (
      (super.connectedCallback(),
      (this._contextValues['shadcn-select'].checkRef = this),
      this.children.length > 0 || this.textContent !== '')
    ) {
      this._contextValues['shadcn-select'].updateRef('checkRef', this);
      return;
    }
    this.className = 'w-4 h-4 invisible data-[selected]:visible';
    const e = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    e.setAttribute('viewBox', '0 0 15 15'),
      e.setAttribute('fill', 'none'),
      e.setAttribute('stroke-linecap', 'round'),
      e.setAttribute('stroke-linejoin', 'round'),
      e.classList.add('shadcn-icon', 'shadcn-select-check');
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    t.setAttribute(
      'd',
      'M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z'
    ),
      t.setAttribute('fill', 'currentColor'),
      t.setAttribute('fill-rule', 'evenodd'),
      t.setAttribute('clip-rule', 'evenodd'),
      e.appendChild(t),
      this.appendChild(e);
  }
}
customElements.define('shadcn-select-check', Oe);
class Z extends d {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-form-item']),
      (this._inputRef = document.createElement('input')),
      (this._setup = () => {
        this.contains(this._inputRef) || this.appendChild(this._inputRef);
      });
  }
  connectedCallback() {
    super.connectedCallback(), this._setup();
  }
  attributeChangedCallback(e, t, s) {
    this._inputRef.setAttribute(e, s);
  }
  static get observedAttributes() {
    return [
      'placeholder',
      'type',
      'value',
      'disabled',
      'readonly',
      'name',
      'autofocus',
      'autocomplete',
    ];
  }
}
customElements.define('prototype-input', Z);
class Ve extends Z {
  connectedCallback() {
    super.connectedCallback(),
      (this._inputRef.className =
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50');
  }
}
customElements.define('shadcn-input', Ve);
class Ne extends u {
  constructor() {
    super(...arguments),
      (this._code = '<shadcn-button variant="primary">Button</shadcn-button>'),
      (this._highlightRules = [h.shadcnTagName, h.upperCamelCase]),
      (this._preview = () => a({}, [n('shadcn-button', { variant: 'primary' }, ['Button'])]));
  }
}
customElements.define('shadcn-button-basic', Ne);
class Me extends u {
  constructor() {
    super(...arguments),
      (this._code = '<shadcn-button variant="primary">Primary</shadcn-button>'),
      (this._highlightRules = [h.shadcnTagName, h.upperCamelCase]),
      (this._preview = () => a({}, [n('shadcn-button', { variant: 'primary' }, ['Primary'])]));
  }
}
customElements.define('shadcn-button-primary', Me);
class Ke extends u {
  constructor() {
    super(...arguments),
      (this._code = '<shadcn-button>Secondary</shadcn-button>'),
      (this._highlightRules = [h.shadcnTagName, h.upperCamelCase]),
      (this._preview = () => a({}, [n('shadcn-button', {}, ['Secondary'])]));
  }
}
customElements.define('shadcn-button-secondary', Ke);
class Fe extends u {
  constructor() {
    super(...arguments),
      (this._code = '<shadcn-button variant="outline">Outline</shadcn-button>'),
      (this._highlightRules = [h.shadcnTagName, h.upperCamelCase]),
      (this._preview = () => a({}, [n('shadcn-button', { variant: 'outline' }, ['Outline'])]));
  }
}
customElements.define('shadcn-button-outline', Fe);
class ze extends u {
  constructor() {
    super(...arguments),
      (this._code = '<shadcn-button variant="link">Link</shadcn-button>'),
      (this._highlightRules = [h.shadcnTagName, h.upperCamelCase]),
      (this._preview = () => a({}, [n('shadcn-button', { variant: 'link' }, ['Link'])]));
  }
}
customElements.define('shadcn-button-link', ze);
class Be extends u {
  constructor() {
    super(...arguments),
      (this._code = '<shadcn-button variant="destructive">Destructive</shadcn-button>'),
      (this._highlightRules = [h.shadcnTagName, h.upperCamelCase]),
      (this._preview = () =>
        a({}, [n('shadcn-button', { variant: 'destructive' }, ['Destructive'])]));
  }
}
customElements.define('shadcn-button-destructive', Be);
class je extends u {
  constructor() {
    super(...arguments),
      (this._code = '<shadcn-button variant="ghost">Ghost</shadcn-button>'),
      (this._highlightRules = [h.shadcnTagName, h.upperCamelCase]),
      (this._preview = () => a({}, [n('shadcn-button', { variant: 'ghost' }, ['Ghost'])]));
  }
}
customElements.define('shadcn-button-ghost', je);
class He extends f {
  constructor() {
    super(...arguments),
      (this._doc = {
        title: 'Button',
        id: 'shadcn-button',
        desc: 'Displays a button or a component that looks like a button.',
        route: ['Shadcn', 'Button'],
        links: [],
        sections: [
          { title: '', contents: [{ type: 'code', key: '', content: 'shadcn-button-basic' }] },
          {
            title: 'Examples',
            contents: [
              { title: 'Primary', type: 'code', key: 'primary', content: 'shadcn-button-primary' },
              {
                title: 'Secondary',
                type: 'code',
                key: 'secondary',
                content: 'shadcn-button-secondary',
              },
              { title: 'Outline', type: 'code', key: 'outline', content: 'shadcn-button-outline' },
              { title: 'Ghost', type: 'code', key: 'ghost', content: 'shadcn-button-ghost' },
              { title: 'Link', type: 'code', key: 'link', content: 'shadcn-button-link' },
              {
                title: 'Destructive',
                type: 'code',
                key: 'destructive',
                content: 'shadcn-button-destructive',
              },
            ],
          },
        ],
      });
  }
}
customElements.define('shadcn-button-doc', He);
class Ue extends f {
  constructor() {
    super(...arguments),
      (this._doc = {
        title: 'Tab',
        id: 'shadcn-tab',
        desc: 'Tabs are used to organize content on the page.',
        route: ['Shadcn', 'Tab'],
        links: [],
        sections: [],
      });
  }
}
customElements.define('shadcn-tab-doc', Ue);
class $e extends u {
  constructor() {
    super(...arguments),
      (this._code = 'Code component is in development'),
      (this._highlightRules = []),
      (this._preview = () => {
        const e = n('shadcn-select', { 'default-value': 'Option 2' }, [
          n('shadcn-select-trigger', { class: 'w-[180px]' }),
          n('shadcn-select-content', { class: 'flex flex-col items-center justify-center' }, [
            n('shadcn-select-item', { value: 'Option 1' }, ['Option 1']),
            n('shadcn-select-item', { value: 'Option 2' }, ['Option 2']),
            n('shadcn-select-item', { value: 'Option 3' }, ['Option 3']),
          ]),
        ]);
        return a({ class: 'flex flex-col items-center justify-center' }, [e]);
      });
  }
}
customElements.define('shadcn-select-basic', $e);
class We extends f {
  constructor() {
    super(...arguments),
      (this._doc = {
        title: 'Select',
        id: 'shadcn-select',
        desc: 'Displays a select or a component that looks like a select.',
        route: ['Shadcn', 'Select'],
        links: [],
        sections: [
          { title: '', contents: [{ type: 'code', key: '', content: 'shadcn-select-basic' }] },
        ],
      });
  }
}
customElements.define('shadcn-select-doc', We);
class Ge extends u {
  constructor() {
    super(...arguments),
      (this._code = 'Code component is in development'),
      (this._highlightRules = []),
      (this._preview = () =>
        a({ class: 'flex flex-col items-center justify-center' }, [
          n('shadcn-input', { placeholder: 'Placeholder' }),
        ]));
  }
}
customElements.define('shadcn-input-basic', Ge);
class qe extends f {
  constructor() {
    super(...arguments),
      (this._doc = {
        title: 'Input',
        id: 'shadcn-input',
        desc: 'Displays a select or a component that looks like a select.',
        route: ['Shadcn', 'Input'],
        links: [],
        sections: [
          { title: '', contents: [{ type: 'code', key: '', content: 'shadcn-input-basic' }] },
        ],
      });
  }
}
customElements.define('shadcn-input-doc', qe);
class Ye extends HTMLElement {
  connectedCallback() {
    this._setup();
  }
  _setup() {
    const e = document.createDocumentFragment();
    e.appendChild(n('shadcn-button-doc')),
      e.appendChild(n('shadcn-tab-doc')),
      e.appendChild(n('shadcn-select-doc')),
      e.appendChild(n('shadcn-input-doc')),
      this.appendChild(e),
      (this.className = 'w-full');
  }
}
customElements.define('shadcn-docs', Ye);
class Xe extends u {
  constructor() {
    super(...arguments),
      (this._code = `
<prototype-transition id="transition" class="opacity-[0.95] size-[6.25rem] block rounded-xl bg-primary shadow-lg transition duration-[400ms] data-[closed]:scale-50 data-[closed]:rotate-[-120deg] data-[closed]:opacity-0 data-[leave]:duration-[200ms] data-[leave]:ease-in-out data-[leave]:data-[closed]:scale-95 data-[leave]:data-[closed]:rotate-[0deg]">
</prototype-transition>
<shadcn-button id="button" class="mt-10">Toggle Transition</shadcn-button>

<script>
  const button = document.getElementById('button');
  const transition = document.getElementById('transition');
  button?.onClick = () => {
    transition.open = !transition.open;
  }
<\/script>`),
      (this._highlightRules = [
        h.htmlTagName,
        h.shadcnTagName,
        h.upperCamelCase,
        h.prototypeTagName,
      ]),
      (this._preview = () => {
        const e = n('shadcn-button', { class: 'mt-10' }, ['Toggle Transition']),
          t = n('prototype-transition', {
            class:
              'opacity-[0.95] size-[6.25rem] block rounded-xl bg-primary shadow-lg transition duration-[400ms] data-[closed]:scale-50 data-[closed]:rotate-[-120deg] data-[closed]:opacity-0 data-[leave]:duration-[200ms] data-[leave]:ease-in-out data-[leave]:data-[closed]:scale-95 data-[leave]:data-[closed]:rotate-[0deg]',
          });
        e.onClick = () => {
          t.open = !t.open;
        };
        const s = document.createDocumentFragment();
        return (
          s.appendChild(t),
          s.appendChild(e),
          a({ class: 'flex flex-col items-center justify-center' }, [s])
        );
      });
  }
}
customElements.define('transition-basic', Xe);
class Ze extends u {
  constructor() {
    super(...arguments),
      (this._code = `
<shadcn-button tabindex="0" class="select-none whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-md h-9 px-4 py-2 cursor-pointer text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shadow-sm bg-secondary text-secondary-foreground  hover:bg-secondary/80" data-active="">
  Toggle Overlay
</shadcn-button>
<prototype-overlay style="position: relative; width: 0px; height: 0px;"></prototype-overlay>
`),
      (this._highlightRules = [
        h.htmlTagName,
        h.shadcnTagName,
        h.upperCamelCase,
        h.prototypeTagName,
      ]),
      (this._preview = () => {
        const e = n('shadcn-button', {}, ['Toggle Overlay']);
        n('prototype-overlay', { style: 'top: 20px' }, ['Overlay Content']);
        const t = n('div', { class: '-bottom-10' }, ['Overlay Content']),
          s = new C();
        return (
          s.setAttribute('style', 'top: 20px'),
          s.appendChild(t),
          (e.onClick = () => {
            s.getAttribute('data-open') === null ? s.open() : s.close();
          }),
          a({}, [e, s])
        );
      });
  }
}
customElements.define('overlay-test', Ze);
class Qe extends u {
  constructor() {
    super(...arguments),
      (this._code = ''),
      (this._highlightRules = []),
      (this._preview = () => {
        const e = n('motion-scroll', { class: 'bg-indigo-500 h-20 w-20 overflow-y-scroll' }, [
            n('div', {}, [
              n('div', { class: 'h-20 w-full bg-indigo-400' }, ['1']),
              n('div', { class: 'h-20 w-full bg-indigo-400' }, ['2']),
              n('div', { class: 'h-20 w-full bg-indigo-400' }, ['3']),
              n('div', { class: 'h-20 w-full bg-indigo-400' }, ['4']),
              n('div', { class: 'h-20 w-full bg-indigo-400' }, ['5']),
            ]),
          ]),
          t = document.createDocumentFragment();
        return t.appendChild(e), a({ class: 'flex flex-col items-center justify-center' }, [t]);
      });
  }
}
customElements.define('motion-scroll-test', Qe);
class Je extends f {
  constructor() {
    super(...arguments),
      (this._doc = {
        id: 'prototype-transition',
        title: 'Transition',
        desc: 'Transition is used to open or hide content.',
        route: ['Prototype', 'Transition'],
        links: [],
        sections: [
          { title: '', contents: [{ type: 'code', key: '', content: 'transition-basic' }] },
          { title: 'Overlay test', contents: [{ type: 'code', key: '', content: 'overlay-test' }] },
          {
            title: 'Motion Scroll Test',
            contents: [{ type: 'code', key: '', content: 'motion-scroll-test' }],
          },
        ],
      });
  }
}
customElements.define('transition-doc', Je);
class et extends u {
  constructor() {
    super(...arguments),
      (this._code = 'Code component is in development'),
      (this._highlightRules = []),
      (this._preview = () => {
        const e = n('prototype-select', { 'default-value': 'Option 2' }, [
          n('prototype-select-trigger', {}, ['Selected: ', n('prototype-select-value', {})]),
          n('prototype-select-content', { class: 'flex flex-col items-center justify-center' }, [
            n('prototype-select-item', { value: 'Option 1' }, ['Option 1']),
            n('prototype-select-item', { value: 'Option 2' }, ['Option 2']),
            n('prototype-select-item', { value: 'Option 3' }, ['Option 3']),
          ]),
        ]);
        return a({ class: 'flex flex-col items-center justify-center' }, [e]);
      });
  }
}
customElements.define('select-basic', et);
class tt extends f {
  constructor() {
    super(...arguments),
      (this._doc = {
        id: 'prototype-select',
        title: 'Select',
        desc: 'Displays a list of options for the user to pick from—triggered by a button.',
        route: ['Prototype', 'Select'],
        links: [],
        sections: [{ title: '', contents: [{ type: 'code', key: '', content: 'select-basic' }] }],
      });
  }
}
customElements.define('select-doc', tt);
class st extends u {
  constructor() {
    super(...arguments),
      (this._code = `<prototype-form>
  <prototype-form-item key="email">
    <prototype-form-label>Email</prototype-form-label>
    <prototype-input type="text" />
  </prototype-form-item>
  <prototype-form-item key="password">
    <prototype-form-label>Password</prototype-form-label>
    <prototype-input type="password" />
  </prototype-form-item>
  <prototype-form-submit>
    <prototype-button>Submit</prototype-button>
  </prototype-form-submit>
</prototype-form>`),
      (this._highlightRules = [h.prototypeTagName, h.upperCamelCase]),
      (this._preview = () => {
        const e = n('shadcn-select', { 'default-value': 'User 2' }, [
            n('shadcn-select-trigger', {}, [n('shadcn-select-value', {})]),
            n('shadcn-select-content', { class: 'flex flex-col items-center justify-center' }, [
              n('shadcn-select-item', { value: 'User 1' }, ['User 1']),
              n('shadcn-select-item', { value: 'User 2' }, ['User 2']),
              n('shadcn-select-item', { value: 'User 3' }, ['User 3']),
            ]),
          ]),
          t = n('shadcn-select', { 'default-value': 'Password 2' }, [
            n('shadcn-select-trigger', { class: 'w-[240px]' }, [n('shadcn-select-value', {})]),
            n('shadcn-select-content', { class: 'flex flex-col items-center justify-center' }, [
              n('shadcn-select-item', { value: 'Password 1' }, ['Password 1']),
              n('shadcn-select-item', { value: 'Password 2' }, ['Password 2']),
              n('shadcn-select-item', { value: 'Password 3' }, ['Password 3']),
            ]),
          ]),
          s = n('prototype-form', {}, [
            n('prototype-form-item', { key: 'email', class: 'mt-2' }, [
              n('prototype-form-label', {}, ['Email']),
              e,
            ]),
            n('prototype-form-item', { key: 'password', class: 'mt-2' }, [
              n('prototype-form-label', {}, ['Password']),
              n('div', {}, [t]),
            ]),
            n('prototype-form-submit', {}, [
              n('shadcn-button', { class: 'mt-4', variant: 'primary' }, ['Submit']),
            ]),
          ]);
        return (
          (s.validators = {
            same: (i) =>
              (i.email === 'User 2' && i.password === 'Password 2') ||
              (i.email === 'User 1' && i.password === 'Password 1') ||
              (i.email === 'User 3' && i.password === 'Password 3'),
          }),
          a({ class: 'flex flex-col items-center justify-center' }, [s])
        );
      });
  }
}
customElements.define('form-basic', st);
class nt extends m {
  constructor() {
    super(...arguments),
      (this._providerKeys = ['prototype-form']),
      (this._consumerKeys = []),
      (this.submit = () => {}),
      (this.data = {}),
      (this.validators = {});
  }
  connectedCallback() {
    super.connectedCallback(),
      this.setContext('prototype-form', {
        data: this.data,
        submit: () => {},
        validate: () => {
          for (const e of Object.keys(this.validators))
            if (!this.validators[e](this.data)) return !1;
          return !0;
        },
        changeData: (e, t) => {
          (this.data[e] = t), this.provideValues['prototype-form'].validate();
        },
      });
  }
}
customElements.define('prototype-form', nt);
class ot extends m {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-form']),
      (this._providerKeys = ['prototype-form-item']),
      (this._key = '');
  }
  connectedCallback() {
    super.connectedCallback(),
      (this._key = this.getAttribute('key') || ''),
      this.setContext('prototype-form-item', {
        key: this._key,
        changeFormItemValue: (e) => {
          this._contextValues['prototype-form'].changeData(this._key, e);
        },
      });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
customElements.define('prototype-form-item', ot);
class it extends d {
  constructor() {
    super(...arguments), (this._consumerKeys = ['prototype-form']);
  }
}
customElements.define('prototype-form-label', it);
class rt extends d {
  constructor() {
    super(...arguments), (this._consumerKeys = ['prototype-form']);
  }
}
customElements.define('prototype-form-message', rt);
class at extends d {
  constructor() {
    super(...arguments), (this._consumerKeys = ['prototype-form']);
  }
}
customElements.define('prototype-form-submit', at);
class ct extends f {
  constructor() {
    super(...arguments),
      (this._doc = {
        id: 'prototype-form',
        title: 'Form',
        desc: 'Form',
        route: ['Prototype', 'Form'],
        links: [],
        sections: [{ title: '', contents: [{ type: 'code', key: '', content: 'form-basic' }] }],
      });
  }
}
customElements.define('form-doc', ct);
class lt extends u {
  constructor() {
    super(...arguments),
      (this._code = 'Code component is in development'),
      (this._highlightRules = []),
      (this._preview = () =>
        a({ class: 'flex flex-col items-center justify-center relative' }, [
          n('prototype-scroll-area', { class: 'h-60 w-96 overflow-y-scroll' }, [
            n('prototype-scroll-area-content', { class: 'flex flex-col gap-4' }, [
              n('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['1']),
              n('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['2']),
              n('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['3']),
              n('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['4']),
              n('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['5']),
              n('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['6']),
              n('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['7']),
              n('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['8']),
            ]),
            n('prototype-scroll-rail', { class: 'h-60 w-4 opacity-10 z-10 top-0 right-0' }, [
              n('prototype-scroll-thumb', { class: 'w-4 bg-white z-11 right-0' }),
            ]),
          ]),
        ]));
  }
}
customElements.define('scroll-area-basic', lt);
const K = { hideDelay: 600, alwaysShowScrollbar: !1 },
  D = { direction: 'vertical' };
class ht extends X {
  constructor() {
    super(...arguments),
      (this._providerKeys = ['prototype-scroll-area', 'motion-scroll']),
      (this.hideDelay = K.hideDelay),
      (this.alwaysShowScrollbar = K.alwaysShowScrollbar);
  }
  static get observedAttributes() {
    return ['hideDelay', 'alwaysShowScrollbar'];
  }
  attributeChangedCallback(e, t, s) {
    ({
      hideDelay: () => {
        (this.hideDelay = Number(s)),
          this.setContext('prototype-scroll-area', { hideDelay: this.hideDelay });
      },
      alwaysShowScrollbar: () => {
        (this.alwaysShowScrollbar = !!s),
          this.setContext('prototype-scroll-area', {
            alwaysShowScrollbar: this.alwaysShowScrollbar,
          }),
          this.alwaysShowScrollbar && this._provideValues['prototype-scroll-area'].show();
      },
    })[e]?.();
  }
  connectedCallback() {
    super.connectedCallback(),
      this.setContext('prototype-scroll-area', {
        hideDelay: this.hideDelay,
        alwaysShowScrollbar: this.alwaysShowScrollbar,
      });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
customElements.define('prototype-scroll-area', ht);
class dt extends d {
  constructor() {
    super(...arguments), (this._consumerKeys = ['prototype-scroll-area', 'motion-scroll']);
  }
  connectedCallback() {
    super.connectedCallback(), (this._contextValues['prototype-scroll-area'].contentRef = this);
  }
}
customElements.define('prototype-scroll-content', dt);
class ut extends m {
  constructor() {
    super(...arguments),
      (this._providerKeys = ['prototype-scroll-rail']),
      (this._consumerKeys = ['prototype-scroll-area', 'motion-scroll']),
      (this._direction = D.direction);
  }
  get direction() {
    return this._direction;
  }
  connectedCallback() {
    super.connectedCallback(),
      (this.style.position = 'absolute'),
      (this._direction =
        this.getAttribute('direction') === 'horizontal' ? 'horizontal' : D.direction),
      this.setContext('prototype-scroll-rail', { direction: this._direction });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
customElements.define('prototype-scroll-rail', ut);
class pt extends d {
  constructor() {
    super(...arguments),
      (this._consumerKeys = ['prototype-scroll-area', 'motion-scroll', 'prototype-scroll-rail']),
      (this._direction = D.direction),
      (this._scale = -1),
      (this._handleScroll = (e, t = []) => {
        switch (this._direction) {
          case 'horizontal':
            this._scale === -1 && (this._scale = e.viewportWidth / e.contentWidth),
              this.style.willChange === '' && (this.style.willChange = 'left right width'),
              (t.includes('scrollX') || this.style.left === '') &&
                (this.style.left = `${this._scale * e.scrollX}px`),
              (t.includes('viewportWidth') ||
                t.includes('contentWidth') ||
                this.style.width === '') &&
                ((this._scale = e.viewportWidth / e.contentWidth),
                (this.style.width = `${this._scale * e.viewportWidth}px`),
                (this.style.left = `${this._scale * e.scrollX}px`));
            break;
          case 'vertical':
            this._scale === -1 && (this._scale = e.viewportHeight / e.contentHeight),
              this.style.willChange === '' && (this.style.willChange = 'top bottom height'),
              (t.includes('scrollY') || this.style.top === '') &&
                (this.style.top = `${this._scale * e.scrollY}px`),
              (t.includes('viewportHeight') ||
                t.includes('contentHeight') ||
                this.style.height === '') &&
                ((this._scale = e.viewportHeight / e.contentHeight),
                (this.style.height = `${this._scale * e.viewportHeight}px`),
                (this.style.top = `${this._scale * e.scrollY}px`));
            break;
        }
      }),
      (this._isDragging = !1),
      (this._initialMousePosition = 0),
      (this._initialScrollPosition = 0),
      (this._startDragging = (e) => {
        (this._isDragging = !0),
          (this._initialMousePosition = this._direction === 'horizontal' ? e.clientX : e.clientY),
          (this._initialScrollPosition =
            this._direction === 'horizontal'
              ? this._contextValues['motion-scroll'].scrollX
              : this._contextValues['motion-scroll'].scrollY);
      }),
      (this._onDrag = (e) => {
        if (!this._isDragging) return;
        const s =
          (this._direction === 'horizontal' ? e.clientX : e.clientY) - this._initialMousePosition;
        if (s !== 0) {
          switch (this._direction) {
            case 'horizontal':
              this._contextValues['motion-scroll'].scrollTo(
                this._initialScrollPosition + s / this._scale,
                this._contextValues['motion-scroll'].scrollY
              );
              break;
            case 'vertical':
              this._contextValues['motion-scroll'].scrollTo(
                this._contextValues['motion-scroll'].scrollX,
                this._initialScrollPosition + s / this._scale
              );
              break;
          }
          this._handleScroll(this._contextValues['motion-scroll']);
        }
      }),
      (this._stopDragging = () => {
        this._isDragging = !1;
      });
  }
  connectedCallback() {
    super.connectedCallback(),
      (this.style.cursor = 'pointer'),
      (this.style.position = 'absolute'),
      (this._direction = this._contextValues['prototype-scroll-rail'].direction),
      this._handleScroll(this._contextValues['motion-scroll']),
      this.addContextListener('motion-scroll', this._handleScroll),
      this.addEventListener('mousedown', this._startDragging),
      document.addEventListener('mousemove', this._onDrag),
      document.addEventListener('mouseup', this._stopDragging);
  }
  disconnectedCallback() {
    this.removeContextListener('motion-scroll', this._handleScroll),
      this.removeEventListener('mousedown', this._startDragging),
      document.removeEventListener('mousemove', this._onDrag),
      document.removeEventListener('mouseup', this._stopDragging);
  }
}
customElements.define('prototype-scroll-thumb', pt);
class mt extends f {
  constructor() {
    super(...arguments),
      (this._doc = {
        id: 'prototype-scroll-area',
        title: 'Scroll Area',
        desc: 'Scroll Area',
        route: ['Prototype', 'Scroll Area'],
        links: [],
        sections: [
          { title: '', contents: [{ type: 'code', key: '', content: 'scroll-area-basic' }] },
        ],
      });
  }
}
customElements.define('scroll-area-doc', mt);
class ft extends HTMLElement {
  connectedCallback() {
    this._setup();
  }
  _setup() {
    const e = document.createDocumentFragment();
    e.appendChild(n('button-doc')),
      e.appendChild(n('transition-doc')),
      e.appendChild(n('select-doc')),
      e.appendChild(n('form-doc')),
      e.appendChild(n('scroll-area-doc')),
      this.appendChild(e),
      (this.className = 'w-full');
  }
}
customElements.define('prototype-docs', ft);
class bt extends HTMLElement {
  connectedCallback() {
    this._setup();
  }
  _setup() {
    const e = document.createDocumentFragment();
    e.appendChild(
      n('div', { class: 'container relative flex flex-col' }, [
        n(
          'div',
          {
            class:
              'w-full mx-auto flex flex-col items-start gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10',
          },
          [
            n(
              'h1',
              {
                class:
                  'text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] hidden md:block',
              },
              ['Check out some examples']
            ),
            n('p', { class: 'max-w-2xl text-lg font-light text-foreground' }, [
              'Dashboard, cards, authentication. Some examples built using the components.',
              n('br'),
              'Use this as a guide to build your own.',
            ]),
            n('div', { class: 'flex w-full items-center justify-start gap-2 py-2' }, [
              n('shadcn-button', { variant: 'primary', class: 'h-8 px-3 text-xs' }, [
                'Get started',
              ]),
              n('shadcn-button', { variant: 'ghost', class: 'h-8 px-3 text-xs' }, ['Components']),
            ]),
          ]
        ),
        n('iframe', {
          class: 'w-full h-[800px] rounded-[0.5rem] border bg-background shadow',
          src: window.origin + '/examples/mail/index.html',
        }),
        n('footer', { class: 'py-6 md:px-8 md:py-0' }, [
          n(
            'div',
            { class: 'flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row' },
            [
              n(
                'p',
                {
                  class:
                    'text-balance text-center text-sm leading-loose text-muted-foreground md:text-left',
                },
                ['Build by 广亮, inspired by shadcn/ui, The source code is available on GitHub.']
              ),
            ]
          ),
        ]),
      ])
    ),
      this.appendChild(e);
  }
}
customElements.define('examples-page', bt);
class gt extends HTMLElement {
  connectedCallback() {
    const e = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    e.setAttribute('viewBox', '0 0 24 24'),
      e.setAttribute('fill', 'none'),
      e.setAttribute('stroke', 'currentColor'),
      e.setAttribute('stroke-width', '2'),
      e.setAttribute('stroke-linecap', 'round'),
      e.setAttribute('stroke-linejoin', 'round'),
      e.classList.add('lucide', 'lucide-chevrons-up-down');
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    t.setAttribute('d', 'm7 15 5 5 5-5'), e.appendChild(t);
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    s.setAttribute('d', 'm7 9 5-5 5 5'), e.appendChild(s), this.appendChild(e);
  }
}
customElements.define('lucide-chevrons-up-down', gt);
class _t extends HTMLElement {
  constructor() {
    super(...arguments),
      (this._changeNav = () => {}),
      (this._changeDocs = () => {}),
      (this._handleRouteChange = (e) => {
        const t = new URL(window.location.origin + e.to).pathname
          .split('/')
          .filter((s) => s !== '');
        switch (t[0]) {
          case 'docs':
            this._changeNav('docs'), this._changeDocs(t[1] ? `docs-${t[1]}` : 'docs-introduction');
            break;
          case 'components':
            this._changeNav('docs'), this._changeDocs(t[1] ? `${t[1]}-${t[2]}` : 'shadcn-button');
            break;
          case 'examples':
            this._changeNav('examples');
            break;
        }
        return !0;
      });
  }
  connectedCallback() {
    const e = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    (document.body.className = e),
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (t) => {
        const s = t.matches ? 'dark' : 'light';
        document.body.className = s;
      }),
      this._setup();
  }
  _setup() {
    _.getInstance().addGuard(this._handleRouteChange);
    const e = n(
        'prototype-tab',
        { 'default-value': 'docs-introduction', class: 'container flex-1 items-start' },
        [n('website-aside'), n('doc-introduction'), n('shadcn-docs'), n('prototype-docs')]
      ),
      t = n('prototype-tab', { 'default-value': 'docs' }, [
        n('website-nav'),
        n('main', { class: 'flex-1 flex justify-center' }, [
          n('prototype-tab-content', { value: 'docs' }, [e]),
          n('prototype-tab-content', { style: 'display: none', value: 'components' }, [
            'components',
          ]),
          n('prototype-tab-content', { style: 'display: none', value: 'examples' }, [
            n('examples-page'),
          ]),
        ]),
      ]);
    (this._changeNav = t.changTab), (this._changeDocs = e.changTab);
    const s = n('div', { id: 'app' }, [n('prototype-overlay-provider', {}, [t])]);
    this.appendChild(s),
      this._handleRouteChange({ from: '', to: window.location.pathname, action: 'push' });
  }
}
customElements.define('app-root', _t);
class yt extends HTMLElement {
  connectedCallback() {
    const e = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    e.setAttribute('viewBox', '0 0 24 24'),
      e.setAttribute('fill', 'none'),
      e.setAttribute('stroke', 'currentColor'),
      e.setAttribute('stroke-width', '2'),
      e.setAttribute('stroke-linecap', 'round'),
      e.setAttribute('stroke-linejoin', 'round'),
      e.classList.add('lucide', 'lucide-archive');
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    t.setAttribute('x', '2'),
      t.setAttribute('y', '3'),
      t.setAttribute('rx', '1'),
      t.setAttribute('width', '20'),
      t.setAttribute('height', '5');
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    s.setAttribute('d', 'M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8');
    const i = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    i.setAttribute('d', 'M10 12h4'),
      e.appendChild(t),
      e.appendChild(s),
      e.appendChild(i),
      this.appendChild(e);
  }
}
customElements.define('lucide-archive', yt);
