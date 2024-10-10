import { PrototypeSelectTrigger } from '@/prototype/select';
import './select-arrow';
import { ShadcnSelectContext } from './interface';
export default class ShadcnSelectTrigger extends PrototypeSelectTrigger<ShadcnSelectContext> {
  protected _consumerKeys =(['shadcn-select', 'prototype-select']);
  // 用户添加的 class 属性
  private _class = '';
  // 组件自身的 class 属性
  private _computedClass = '';
  private _arrowRef?: HTMLElement;
  private _valueRef?: HTMLElement;

  private _handleShadcnSelectContextChange = (context: ShadcnSelectContext['shadcn-select']) => {
    if (this._arrowRef !== context.arrowRef) {
      this._arrowRef?.remove();
      this._arrowRef = context.arrowRef;
    }
    if (this._valueRef !== context.valueRef) {
      this._valueRef?.remove();
      this._valueRef = context.valueRef;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this._class = this.className || '';

    this._render();
    this.addContextListener('shadcn-select', this._handleShadcnSelectContextChange);
  }

  disconnectedCallback() {
    this.removeContextListener('shadcn-select', this._handleShadcnSelectContextChange);
    super.disconnectedCallback();
  }

  private _render() {
    this._computedClass =
      'cursor-pointer flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1';

    if (!this.contains(this._contextValues['shadcn-select'].valueRef))
      this.appendChild(this._contextValues['shadcn-select'].valueRef);
    this._valueRef = this._contextValues['shadcn-select'].valueRef;
    if (!this.contains(this._contextValues['shadcn-select'].arrowRef))
      this.appendChild(this._contextValues['shadcn-select'].arrowRef);
    this._arrowRef = this._contextValues['shadcn-select'].arrowRef;

    this.className = [this._computedClass, this._class].join(' ').trimEnd();
  }
}

customElements.define('shadcn-select-trigger', ShadcnSelectTrigger);
