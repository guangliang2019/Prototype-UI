import { ContextConsumer } from '@/common';
import { OverlayProps, ShowOverlayEventDetail } from './interface';

export default class PrototypeOverlay<T extends Object>
  extends ContextConsumer<T>
  implements OverlayProps
{
  protected _key = 'prototype-overlay';
  protected _content: HTMLElement = document.createElement('div');
  protected _target?: HTMLElement;
  protected _closestRelative: HTMLElement = this;

  target?: string = undefined;
  overlayKey: string = '__default__';
  unmount: boolean = false;

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

    // TODO: autoShow
  }

  // Overlay 本身位置与编写位置相同，但是 content 会在实际渲染时「投放」到目标位置
  show() {
    this._closestRelative.appendChild(this._content);

    const overlayShowEvent = new CustomEvent<ShowOverlayEventDetail>('overlay-show', {
      bubbles: true,
      composed: true,
      detail: {
        overlayKey: this.overlayKey,
        overlay: this,
      },
    });
    this.setAttribute('data-show', '');
    this.dispatchEvent(overlayShowEvent);
  }

  close() {
    this.removeAttribute('data-show');
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
    } else if (
      name === 'style' &&
      newValue !== 'position: relative; width: 0px; height: 0px;' &&
      oldValue !== newValue
    ) {
      // 将样式应用到_content，同时清除组件自身的样式
      this._content.style.cssText = newValue;
      this._content.style.position = 'absolute';
      this.style.cssText = 'position: relative; width: 0px; height: 0px;'; // 仅保持组件本身的position样式
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
