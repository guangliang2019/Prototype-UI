export default class LucideShapes extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-shapes');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute(
      'd',
      'M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z'
    );
    svg.appendChild(path1);

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('x', '3');
    rect1.setAttribute('y', '14');
    rect1.setAttribute('width', '7');
    rect1.setAttribute('height', '7');
    rect1.setAttribute('rx', '1');
    svg.appendChild(rect1);

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '17.5');
    circle1.setAttribute('cy', '17.5');
    circle1.setAttribute('r', '3.5');
    svg.appendChild(circle1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-shapes', LucideShapes);
