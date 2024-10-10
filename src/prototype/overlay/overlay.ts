import { ClickOutside, ContextConsumer } from '@/common';
import { OverlayProps, OpenOverlayEventDetail } from './interface';

export default class PrototypeOverlay<T extends Record<string, Object> = {}>
  extends ContextConsumer<T>
  implements OverlayProps
{
  protected _consumerKeys = ['prototype-overlay'];
  protected _content = document.createElement('click-outside') as ClickOutside;
  protected _target?: HTMLElement;
  protected _closestRelative: HTMLElement = this;

  target?: string = undefined;
  overlayKey: string = '__default__';
  unmount: boolean = false;

  private _opened: boolean = false;

  onClickOutside: (event: MouseEvent) => void = (_: MouseEvent) => {};

  connectedCallback(): void {
    super.connectedCallback();
    this.style.position = 'relative';
    // 将所有初始子节点转移到 this._content
    while (this.firstChild) {
      this._content.appendChild(this.firstChild);
    }
    if (!this._target) {
      this.target = this.getAttribute('target') ?? undefined;
      // Overlay 默认以自己的位置作为目标插入位置，如果有 target 则以 target 为准
      this._target = this.target ? document.querySelector(this.target) || document.body : this;
    }

    // 找到 target 最近的 relative 父元素
    this._closestRelative = this._target === this ? this : this.findClosestRelative(this._target);

    // TODO: autoOpen
    this._content.onClickOutside = (e) => {
      this._opened ? this.onClickOutside(e) : null;
    };
  }

  // Overlay 本身位置与编写位置相同，但是 content 会在实际渲染时「投放」到目标位置
  open() {
    if (this._opened) return;
    this._opened = true;
    this._closestRelative.appendChild(this._content);

    const overlayOpenEvent = new CustomEvent<OpenOverlayEventDetail>('overlay-open', {
      bubbles: true,
      composed: true,
      detail: {
        overlayKey: this.overlayKey,
        overlay: this,
      },
    });
    this.setAttribute('data-open', '');
    this.dispatchEvent(overlayOpenEvent);
  }

  close() {
    if (!this._opened) return;
    this._opened = false;

    this.removeAttribute('data-open');
    this._closestRelative.removeChild(this._content!);
  }

  static get observedAttributes(): string[] {
    return ['class', 'style'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    // 监听 class 或 style 属性的变化，并将其应用到 _content 上
    if (name === 'class' && newValue !== '' && oldValue !== newValue) {
      // 将类应用到_content，同时移除组件自身的类
      this._content.className = newValue;
      this.className = ''; // 保持组件自身的class为空或设置为默认值
    } else if (name === 'style' && newValue !== 'position: relative;' && oldValue !== newValue) {
      // 将样式应用到_content，同时清除组件自身的样式
      this._content.style.cssText = newValue;
      this._content.style.position = 'absolute';
      this.style.cssText = 'position: relative;'; // 仅保持组件本身的position样式
    }
  }

  // 根据给定 DOM 寻找最近的 relative 父元素
  private findClosestRelative(element: HTMLElement): HTMLElement {
    let currentElement = element;
    while (currentElement && currentElement !== document.body) {
      const style = window.getComputedStyle(currentElement);
      if (style.position === 'relative' || style.position === 'absolute') {
        return currentElement;
      }
      currentElement = currentElement.parentElement!;
    }
    return document.body; // Fallback to the body if no positioned parent is found
  }
}

customElements.define('prototype-overlay', PrototypeOverlay);
