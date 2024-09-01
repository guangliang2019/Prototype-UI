export default class LucideChevronsUpDown extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    svg.classList.add('lucide', 'lucide-chevrons-up-down');

    const arrowUp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrowUp.setAttribute('d', 'm7 15 5 5 5-5');
    svg.appendChild(arrowUp);

    const arrowDown = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrowDown.setAttribute('d', 'm7 9 5-5 5 5');
    svg.appendChild(arrowDown);

    this.appendChild(svg);
  }
}

customElements.define('lucide-chevrons-up-down', LucideChevronsUpDown);
