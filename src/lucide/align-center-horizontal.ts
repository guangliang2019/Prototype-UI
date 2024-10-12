export default class LucideAlignCenterHorizontal extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-align-center-horizontal');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M2 12h20');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1');
    svg.appendChild(path4);

    const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path5.setAttribute('d', 'M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1');
    svg.appendChild(path5);

    this.appendChild(svg);
  }
}
customElements.define('lucide-align-center-horizontal', LucideAlignCenterHorizontal);
