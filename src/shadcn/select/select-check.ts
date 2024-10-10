import { ContextConsumer } from '@/common';
import { ShadcnSelectContext } from './interface';

export default class ShadcnSelectCheck extends ContextConsumer<ShadcnSelectContext> {
  protected _consumerKeys =(['shadcn-select', 'prototype-select']);

  connectedCallback() {
    super.connectedCallback();
    // if (!this._contextValues['shadcn-select']) return;

    this._contextValues['shadcn-select'].checkRef = this;
    if (this.children.length > 0 || this.textContent !== '') {
      this._contextValues['shadcn-select'].updateRef('checkRef', this);
      return;
    }
    this.className = 'w-4 h-4 invisible data-[selected]:visible';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 15 15');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    svg.classList.add('shadcn-icon', 'shadcn-select-check');

    const check = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    check.setAttribute(
      'd',
      'M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z'
    );
    check.setAttribute('fill', 'currentColor');
    check.setAttribute('fill-rule', 'evenodd');
    check.setAttribute('clip-rule', 'evenodd');
    svg.appendChild(check);

    this.appendChild(svg);
  }
}

customElements.define('shadcn-select-check', ShadcnSelectCheck);
