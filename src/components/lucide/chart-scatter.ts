export default class LucideChartScatter extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-chart-scatter');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '7.5');
    circle1.setAttribute('cy', '7.5');
    circle1.setAttribute('r', '.5');
    circle1.setAttribute('fill', 'currentColor');
    svg.appendChild(circle1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '18.5');
    circle2.setAttribute('cy', '5.5');
    circle2.setAttribute('r', '.5');
    circle2.setAttribute('fill', 'currentColor');
    svg.appendChild(circle2);

    const circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle3.setAttribute('cx', '11.5');
    circle3.setAttribute('cy', '11.5');
    circle3.setAttribute('r', '.5');
    circle3.setAttribute('fill', 'currentColor');
    svg.appendChild(circle3);

    const circle4 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle4.setAttribute('cx', '7.5');
    circle4.setAttribute('cy', '16.5');
    circle4.setAttribute('r', '.5');
    circle4.setAttribute('fill', 'currentColor');
    svg.appendChild(circle4);

    const circle5 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle5.setAttribute('cx', '17.5');
    circle5.setAttribute('cy', '14.5');
    circle5.setAttribute('r', '.5');
    circle5.setAttribute('fill', 'currentColor');
    svg.appendChild(circle5);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M3 3v16a2 2 0 0 0 2 2h16');
    svg.appendChild(path1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-chart-scatter', LucideChartScatter);
