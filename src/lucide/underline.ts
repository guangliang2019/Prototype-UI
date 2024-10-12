export default class LucideUnderline extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-underline');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M6 4v6a6 6 0 0 0 12 0V4');
    svg.appendChild(path1);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '4');
    line1.setAttribute('x2', '20');
    line1.setAttribute('y1', '20');
    line1.setAttribute('y2', '20');
    svg.appendChild(line1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-underline', LucideUnderline);
