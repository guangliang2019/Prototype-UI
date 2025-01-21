export default class LucideTextSelect extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-text-select');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M5 3a2 2 0 0 0-2 2');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M19 3a2 2 0 0 1 2 2');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M21 19a2 2 0 0 1-2 2');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M5 21a2 2 0 0 1-2-2');
    svg.appendChild(path4);

    const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path5.setAttribute('d', 'M9 3h1');
    svg.appendChild(path5);

    const path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path6.setAttribute('d', 'M9 21h1');
    svg.appendChild(path6);

    const path7 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path7.setAttribute('d', 'M14 3h1');
    svg.appendChild(path7);

    const path8 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path8.setAttribute('d', 'M14 21h1');
    svg.appendChild(path8);

    const path9 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path9.setAttribute('d', 'M3 9v1');
    svg.appendChild(path9);

    const path10 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path10.setAttribute('d', 'M21 9v1');
    svg.appendChild(path10);

    const path11 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path11.setAttribute('d', 'M3 14v1');
    svg.appendChild(path11);

    const path12 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path12.setAttribute('d', 'M21 14v1');
    svg.appendChild(path12);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '7');
    line1.setAttribute('x2', '15');
    line1.setAttribute('y1', '8');
    line1.setAttribute('y2', '8');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '7');
    line2.setAttribute('x2', '17');
    line2.setAttribute('y1', '12');
    line2.setAttribute('y2', '12');
    svg.appendChild(line2);

    const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line3.setAttribute('x1', '7');
    line3.setAttribute('x2', '13');
    line3.setAttribute('y1', '16');
    line3.setAttribute('y2', '16');
    svg.appendChild(line3);

    this.appendChild(svg);
  }
}
customElements.define('lucide-text-select', LucideTextSelect);
