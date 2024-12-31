import { PrototypeTabsTrigger } from '@/prototype';
export default class ShadcnTabsTrigger extends PrototypeTabsTrigger {
  // 用户添加的 class 属性
  private _class = '';
  // 组件自身的 class 属性
  private _computedClass = '';
  connectedCallback() {
    super.connectedCallback();
    this._class = this.className || '';

    this._setup();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _setup() {
    this._computedClass =
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow';

    this.className = [this._computedClass, this._class].join(' ').trimEnd();
  }
}

customElements.define('shadcn-tabs-trigger', ShadcnTabsTrigger);