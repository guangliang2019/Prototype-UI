export default class LucideEqualNot extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-equal-not');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '5');
    line1.setAttribute('x2', '19');
    line1.setAttribute('y1', '9');
    line1.setAttribute('y2', '9');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '5');
    line2.setAttribute('x2', '19');
    line2.setAttribute('y1', '15');
    line2.setAttribute('y2', '15');
    svg.appendChild(line2);

    const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line3.setAttribute('x1', '19');
    line3.setAttribute('x2', '5');
    line3.setAttribute('y1', '5');
    line3.setAttribute('y2', '19');
    svg.appendChild(line3);

    this.appendChild(svg);
  }
}
customElements.define('lucide-equal-not', LucideEqualNot);
