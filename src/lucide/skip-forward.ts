export default class LucideSkipForward extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-skip-forward');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const polygon1 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon1.setAttribute('points', '5 4 15 12 5 20 5 4');
    svg.appendChild(polygon1);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '19');
    line1.setAttribute('x2', '19');
    line1.setAttribute('y1', '5');
    line1.setAttribute('y2', '19');
    svg.appendChild(line1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-skip-forward', LucideSkipForward);
