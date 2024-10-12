export default class LucideSkipBack extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-skip-back');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const polygon1 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon1.setAttribute('points', '19 20 9 12 19 4 19 20');
    svg.appendChild(polygon1);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '5');
    line1.setAttribute('x2', '5');
    line1.setAttribute('y1', '19');
    line1.setAttribute('y2', '5');
    svg.appendChild(line1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-skip-back', LucideSkipBack);
