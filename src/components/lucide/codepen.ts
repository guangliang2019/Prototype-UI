export default class LucideCodepen extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-codepen');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const polygon1 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon1.setAttribute('points', '12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2');
    svg.appendChild(polygon1);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '12');
    line1.setAttribute('x2', '12');
    line1.setAttribute('y1', '22');
    line1.setAttribute('y2', '15.5');
    svg.appendChild(line1);

    const polyline1 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline1.setAttribute('points', '22 8.5 12 15.5 2 8.5');
    svg.appendChild(polyline1);

    const polyline2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline2.setAttribute('points', '2 15.5 12 8.5 22 15.5');
    svg.appendChild(polyline2);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '12');
    line2.setAttribute('x2', '12');
    line2.setAttribute('y1', '2');
    line2.setAttribute('y2', '8.5');
    svg.appendChild(line2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-codepen', LucideCodepen);
