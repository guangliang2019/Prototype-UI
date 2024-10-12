export default class LucideChartNoAxesColumn extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-chart-no-axes-column');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '18');
    line1.setAttribute('x2', '18');
    line1.setAttribute('y1', '20');
    line1.setAttribute('y2', '10');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '12');
    line2.setAttribute('x2', '12');
    line2.setAttribute('y1', '20');
    line2.setAttribute('y2', '4');
    svg.appendChild(line2);

    const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line3.setAttribute('x1', '6');
    line3.setAttribute('x2', '6');
    line3.setAttribute('y1', '20');
    line3.setAttribute('y2', '14');
    svg.appendChild(line3);

    this.appendChild(svg);
  }
}
customElements.define('lucide-chart-no-axes-column', LucideChartNoAxesColumn);
