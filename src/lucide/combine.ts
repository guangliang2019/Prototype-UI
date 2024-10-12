export default class LucideCombine extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-combine');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M10 18H5a3 3 0 0 1-3-3v-1');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M14 2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M20 2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'm7 21 3-3-3-3');
    svg.appendChild(path4);

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('x', '14');
    rect1.setAttribute('y', '14');
    rect1.setAttribute('width', '8');
    rect1.setAttribute('height', '8');
    rect1.setAttribute('rx', '2');
    svg.appendChild(rect1);

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect2.setAttribute('x', '2');
    rect2.setAttribute('y', '2');
    rect2.setAttribute('width', '8');
    rect2.setAttribute('height', '8');
    rect2.setAttribute('rx', '2');
    svg.appendChild(rect2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-combine', LucideCombine);