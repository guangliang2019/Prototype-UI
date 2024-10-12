export default class LucidePercent extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-percent');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '19');
    line1.setAttribute('x2', '5');
    line1.setAttribute('y1', '5');
    line1.setAttribute('y2', '19');
    svg.appendChild(line1);

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '6.5');
    circle1.setAttribute('cy', '6.5');
    circle1.setAttribute('r', '2.5');
    svg.appendChild(circle1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '17.5');
    circle2.setAttribute('cy', '17.5');
    circle2.setAttribute('r', '2.5');
    svg.appendChild(circle2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-percent', LucidePercent);
