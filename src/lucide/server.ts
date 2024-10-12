export default class LucideServer extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-server');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '20');
    rect1.setAttribute('height', '8');
    rect1.setAttribute('x', '2');
    rect1.setAttribute('y', '2');
    rect1.setAttribute('rx', '2');
    rect1.setAttribute('ry', '2');
    svg.appendChild(rect1);

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect2.setAttribute('width', '20');
    rect2.setAttribute('height', '8');
    rect2.setAttribute('x', '2');
    rect2.setAttribute('y', '14');
    rect2.setAttribute('rx', '2');
    rect2.setAttribute('ry', '2');
    svg.appendChild(rect2);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '6');
    line1.setAttribute('x2', '6.01');
    line1.setAttribute('y1', '6');
    line1.setAttribute('y2', '6');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '6');
    line2.setAttribute('x2', '6.01');
    line2.setAttribute('y1', '18');
    line2.setAttribute('y2', '18');
    svg.appendChild(line2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-server', LucideServer);
