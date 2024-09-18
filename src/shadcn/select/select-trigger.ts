import { PrototypeSelectTrigger } from '@/prototype/select';
import '@/lucide/chevrons-up-down';
import { h } from '@/utils/dom';
export default class ShadcnSelectTrigger extends PrototypeSelectTrigger {
  // 用户添加的 class 属性
  private _class = '';
  // 组件自身的 class 属性
  private _computedClass = '';

  connectedCallback() {
    this._class = this.className || '';
    super.connectedCallback();
    this._render();
  }

  private _render() {
    this._computedClass =
      'cursor-pointer flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1';

    // TODO: 这个图标目前看起来，和原版有点区别
    this.appendChild(h('lucide-chevrons-up-down', { class: 'w-3.5 h-3.5 opacity-50' }));

    this.className = [this._computedClass, this._class].join(' ').trimEnd();
  }
}

customElements.define('shadcn-select-trigger', ShadcnSelectTrigger);
