export default class LucideBookLock extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-book-lock');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M18 6V4a2 2 0 1 0-4 0v2');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10');
    svg.appendChild(path3);

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('x', '12');
    rect1.setAttribute('y', '6');
    rect1.setAttribute('width', '8');
    rect1.setAttribute('height', '5');
    rect1.setAttribute('rx', '1');
    svg.appendChild(rect1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-book-lock', LucideBookLock);
