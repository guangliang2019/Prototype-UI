export default class LucideChartColumnStacked extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-chart-column-stacked');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M11 13H7');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M19 9h-4');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M3 3v16a2 2 0 0 0 2 2h16');
    svg.appendChild(path3);

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('x', '15');
    rect1.setAttribute('y', '5');
    rect1.setAttribute('width', '4');
    rect1.setAttribute('height', '12');
    rect1.setAttribute('rx', '1');
    svg.appendChild(rect1);

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect2.setAttribute('x', '7');
    rect2.setAttribute('y', '8');
    rect2.setAttribute('width', '4');
    rect2.setAttribute('height', '9');
    rect2.setAttribute('rx', '1');
    svg.appendChild(rect2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-chart-column-stacked', LucideChartColumnStacked);
