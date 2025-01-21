export default class LucideToyBrick extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-toy-brick');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '18');
    rect1.setAttribute('height', '12');
    rect1.setAttribute('x', '3');
    rect1.setAttribute('y', '8');
    rect1.setAttribute('rx', '1');
    svg.appendChild(rect1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3');
    svg.appendChild(path2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-toy-brick', LucideToyBrick);
