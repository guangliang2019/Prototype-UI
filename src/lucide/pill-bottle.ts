export default class LucidePillBottle extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-pill-bottle');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7');
    svg.appendChild(path2);

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '16');
    rect1.setAttribute('height', '5');
    rect1.setAttribute('x', '4');
    rect1.setAttribute('y', '2');
    rect1.setAttribute('rx', '1');
    svg.appendChild(rect1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-pill-bottle', LucidePillBottle);
