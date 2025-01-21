export default class LucideCodesandbox extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-codesandbox');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute(
      'd',
      'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'
    );
    svg.appendChild(path1);

    const polyline1 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline1.setAttribute('points', '7.5 4.21 12 6.81 16.5 4.21');
    svg.appendChild(polyline1);

    const polyline2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline2.setAttribute('points', '7.5 19.79 7.5 14.6 3 12');
    svg.appendChild(polyline2);

    const polyline3 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline3.setAttribute('points', '21 12 16.5 14.6 16.5 19.79');
    svg.appendChild(polyline3);

    const polyline4 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline4.setAttribute('points', '3.27 6.96 12 12.01 20.73 6.96');
    svg.appendChild(polyline4);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '12');
    line1.setAttribute('x2', '12');
    line1.setAttribute('y1', '22.08');
    line1.setAttribute('y2', '12');
    svg.appendChild(line1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-codesandbox', LucideCodesandbox);
