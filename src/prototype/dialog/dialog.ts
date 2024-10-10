import { ContextProvider } from '@/common';
import { DialogContext, DialogProps } from './interface';

export default class PrototypeDialog
  extends ContextProvider<{
    'prototype-dialog': DialogContext;
  }>
  implements DialogProps
{
  protected _providerKeys = ['prototype-dialog' as const];
  protected _consumerKeys = [];

  /**
   * 是否显示弹窗, 该属性为响应式属性
   */
  private _visible: boolean = false;
  // prettier-ignore
  get visible() { return this._visible; }
  set visible(value) {
    if (value === this._visible) return;
    this._visible = value;
    if (this._visible) {
      this._provideValues['prototype-dialog'].open();
      this.setAttribute('visible', '');
    } else {
      this._provideValues['prototype-dialog'].close();
      this.removeAttribute('visible');
    }
  }
  // prettier-ignore
  get open() { return () => (this.visible = true); }
  // prettier-ignore
  get close() { return () => (this.visible = false); }

  connectedCallback() {
    super.connectedCallback();
    this.visible = this.getAttribute('visible') !== null;
    this.setContext('prototype-dialog', {
      visible: this.visible,
    });
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    const mapping: Record<string, any> = {
      'visible': () => {
        this.visible = newValue !== null;
        this.visible && oldValue !== newValue ? this.open() : this.close();
      },
    };

    mapping[name]?.();
  }
}

customElements.define('prototype-dialog', PrototypeDialog);
