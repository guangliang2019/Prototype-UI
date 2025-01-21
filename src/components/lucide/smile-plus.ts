export default class LucideSmilePlus extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-smile-plus');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M22 11v1a10 10 0 1 1-9-10');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M8 14s1.5 2 4 2 4-2 4-2');
    svg.appendChild(path2);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '9');
    line1.setAttribute('x2', '9.01');
    line1.setAttribute('y1', '9');
    line1.setAttribute('y2', '9');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '15');
    line2.setAttribute('x2', '15.01');
    line2.setAttribute('y1', '9');
    line2.setAttribute('y2', '9');
    svg.appendChild(line2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M16 5h6');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M19 2v6');
    svg.appendChild(path4);

    this.appendChild(svg);
  }
}
customElements.define('lucide-smile-plus', LucideSmilePlus);
