// TODO: 处理 transtion 结束时的回调，改为使用 onTransitionEnd
// TODO: 处理 transition 未结束时的表现，确保正确取消监听

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DEFALUT_TRANSITION_PROPS, type TransitionProps } from './interface';

@customElement('headless-transition')
export class HeadlessTransition extends LitElement implements TransitionProps {
  @property({ type: Boolean }) show = DEFALUT_TRANSITION_PROPS['show'];
  @property({ type: Boolean }) unmount = DEFALUT_TRANSITION_PROPS['unmount'];
  @property({ type: Boolean }) appear = DEFALUT_TRANSITION_PROPS['appear'];
  @property({ type: Function }) beforeEnter = DEFALUT_TRANSITION_PROPS['beforeEnter'];
  @property({ type: Function }) afterEnter = DEFALUT_TRANSITION_PROPS['afterEnter'];
  @property({ type: Function }) beforeLeave = DEFALUT_TRANSITION_PROPS['beforeLeave'];
  @property({ type: Function }) afterLeave = DEFALUT_TRANSITION_PROPS['afterLeave'];
  @property({ type: String }) beforeEnterClass = DEFALUT_TRANSITION_PROPS['beforeEnterClass'];
  @property({ type: String }) afterEnterClass = DEFALUT_TRANSITION_PROPS['afterEnterClass'];
  @property({ type: String }) beforeLeaveClass = DEFALUT_TRANSITION_PROPS['beforeLeaveClass'];
  @property({ type: String }) afterLeaveClass = DEFALUT_TRANSITION_PROPS['afterLeaveClass'];

  createRenderRoot() {
    return this; // 直接返回 `this`，不创建 Shadow DOM
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('show')) {
      this.toggleVisibility();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.appear && this.show) {
      this.enter();
    }
  }

  private toggleVisibility() {
    if (this.show) {
      this.enter();
    } else {
      this.leave();
    }
  }

  private enter() {
    if (this.beforeEnter) this.beforeEnter();

    if (this.beforeEnterClass) {
      this.classList.add(this.beforeEnterClass);
    }

    setTimeout(() => {
      if (this.beforeEnterClass) {
        this.classList.remove(this.beforeEnterClass);
      }

      if (this.afterEnterClass) {
        this.classList.add(this.afterEnterClass);
      }

      if (this.afterEnter) this.afterEnter();
    }, 300);
  }

  private leave() {
    if (this.beforeLeave) this.beforeLeave();

    if (this.beforeLeaveClass) {
      this.classList.add(this.beforeLeaveClass);
    }

    setTimeout(() => {
      if (this.beforeLeaveClass) {
        this.classList.remove(this.beforeLeaveClass);
      }

      if (this.afterLeaveClass) {
        this.classList.add(this.afterLeaveClass);
      }

      if (this.afterLeave) this.afterLeave();

      if (this.unmount) {
        this.remove();
      }
    }, 300);
  }

  render() {
    return html`<slot></slot>`;
  }
}