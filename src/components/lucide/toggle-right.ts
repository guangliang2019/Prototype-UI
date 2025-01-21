export default class LucideToggleRight extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-toggle-right');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '20');
    rect1.setAttribute('height', '12');
    rect1.setAttribute('x', '2');
    rect1.setAttribute('y', '6');
    rect1.setAttribute('rx', '6');
    rect1.setAttribute('ry', '6');
    svg.appendChild(rect1);

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '16');
    circle1.setAttribute('cy', '12');
    circle1.setAttribute('r', '2');
    svg.appendChild(circle1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-toggle-right', LucideToggleRight);
