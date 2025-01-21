export default class LucideChartCandlestick extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-chart-candlestick');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M9 5v4');
    svg.appendChild(path1);

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '4');
    rect1.setAttribute('height', '6');
    rect1.setAttribute('x', '7');
    rect1.setAttribute('y', '9');
    rect1.setAttribute('rx', '1');
    svg.appendChild(rect1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M9 15v2');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M17 3v2');
    svg.appendChild(path3);

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect2.setAttribute('width', '4');
    rect2.setAttribute('height', '8');
    rect2.setAttribute('x', '15');
    rect2.setAttribute('y', '5');
    rect2.setAttribute('rx', '1');
    svg.appendChild(rect2);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M17 13v3');
    svg.appendChild(path4);

    const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path5.setAttribute('d', 'M3 3v16a2 2 0 0 0 2 2h16');
    svg.appendChild(path5);

    this.appendChild(svg);
  }
}
customElements.define('lucide-chart-candlestick', LucideChartCandlestick);
