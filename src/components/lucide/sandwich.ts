export default class LucideSandwich extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-sandwich');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'm2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'm6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2');
    svg.appendChild(path4);

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '20');
    rect1.setAttribute('height', '4');
    rect1.setAttribute('x', '2');
    rect1.setAttribute('y', '11');
    rect1.setAttribute('rx', '1');
    svg.appendChild(rect1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-sandwich', LucideSandwich);
