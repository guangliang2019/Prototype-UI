import { ContextConsumer } from '@/common';
import { ShadcnSelectContext } from './interface';

export default class ShadcnSelectArrow extends ContextConsumer<ShadcnSelectContext> {
  protected _consumerKeys = ['shadcn-select', 'prototype-select'];

  connectedCallback() {
    super.connectedCallback();
    this._contextValues['shadcn-select'].arrowRef = this;
    if (this.children.length > 0 || this.textContent !== '') {
      this._contextValues['shadcn-select'].updateRef('arrowRef', this);
      return;
    }
    this.className = 'w-4 h-4 opacity-50';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    svg.classList.add('shadcn-icon', 'shadcn-select-arrow');

    const arrowUp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrowUp.setAttribute('d', 'M8.5 15L12 18.5L15.5 15');
    arrowUp.setAttribute('stroke-width', '1.5');
    svg.appendChild(arrowUp);

    const arrowDown = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrowDown.setAttribute('d', 'M8.5 9L12 5.5L15.5 9');
    arrowDown.setAttribute('stroke-width', '1.5');

    svg.appendChild(arrowDown);

    this.appendChild(svg);
  }
}

customElements.define('shadcn-select-arrow', ShadcnSelectArrow);
