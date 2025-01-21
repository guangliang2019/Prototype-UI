export default class LucideInstagram extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-instagram');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '20');
    rect1.setAttribute('height', '20');
    rect1.setAttribute('x', '2');
    rect1.setAttribute('y', '2');
    rect1.setAttribute('rx', '5');
    rect1.setAttribute('ry', '5');
    svg.appendChild(rect1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z');
    svg.appendChild(path1);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '17.5');
    line1.setAttribute('x2', '17.51');
    line1.setAttribute('y1', '6.5');
    line1.setAttribute('y2', '6.5');
    svg.appendChild(line1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-instagram', LucideInstagram);
