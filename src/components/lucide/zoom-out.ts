export default class LucideZoomOut extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-zoom-out');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '11');
    circle1.setAttribute('cy', '11');
    circle1.setAttribute('r', '8');
    svg.appendChild(circle1);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '21');
    line1.setAttribute('x2', '16.65');
    line1.setAttribute('y1', '21');
    line1.setAttribute('y2', '16.65');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '8');
    line2.setAttribute('x2', '14');
    line2.setAttribute('y1', '11');
    line2.setAttribute('y2', '11');
    svg.appendChild(line2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-zoom-out', LucideZoomOut);
