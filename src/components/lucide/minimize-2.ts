export default class LucideMinimize2 extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-minimize-2');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const polyline1 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline1.setAttribute('points', '4 14 10 14 10 20');
    svg.appendChild(polyline1);

    const polyline2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline2.setAttribute('points', '20 10 14 10 14 4');
    svg.appendChild(polyline2);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '14');
    line1.setAttribute('x2', '21');
    line1.setAttribute('y1', '10');
    line1.setAttribute('y2', '3');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '3');
    line2.setAttribute('x2', '10');
    line2.setAttribute('y1', '21');
    line2.setAttribute('y2', '14');
    svg.appendChild(line2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-minimize-2', LucideMinimize2);
