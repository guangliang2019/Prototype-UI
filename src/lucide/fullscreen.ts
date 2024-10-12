export default class LucideFullscreen extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-fullscreen');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M3 7V5a2 2 0 0 1 2-2h2');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M17 3h2a2 2 0 0 1 2 2v2');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M21 17v2a2 2 0 0 1-2 2h-2');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M7 21H5a2 2 0 0 1-2-2v-2');
    svg.appendChild(path4);

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '10');
    rect1.setAttribute('height', '8');
    rect1.setAttribute('x', '7');
    rect1.setAttribute('y', '8');
    rect1.setAttribute('rx', '1');
    svg.appendChild(rect1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-fullscreen', LucideFullscreen);
