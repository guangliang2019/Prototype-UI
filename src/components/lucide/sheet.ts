export default class LucideSheet extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-sheet');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '18');
    rect1.setAttribute('height', '18');
    rect1.setAttribute('x', '3');
    rect1.setAttribute('y', '3');
    rect1.setAttribute('rx', '2');
    rect1.setAttribute('ry', '2');
    svg.appendChild(rect1);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '3');
    line1.setAttribute('x2', '21');
    line1.setAttribute('y1', '9');
    line1.setAttribute('y2', '9');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '3');
    line2.setAttribute('x2', '21');
    line2.setAttribute('y1', '15');
    line2.setAttribute('y2', '15');
    svg.appendChild(line2);

    const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line3.setAttribute('x1', '9');
    line3.setAttribute('x2', '9');
    line3.setAttribute('y1', '9');
    line3.setAttribute('y2', '21');
    svg.appendChild(line3);

    const line4 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line4.setAttribute('x1', '15');
    line4.setAttribute('x2', '15');
    line4.setAttribute('y1', '9');
    line4.setAttribute('y2', '21');
    svg.appendChild(line4);

    this.appendChild(svg);
  }
}
customElements.define('lucide-sheet', LucideSheet);
