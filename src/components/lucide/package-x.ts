export default class LucidePackageX extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-package-x');
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
      'M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14'
    );
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'm7.5 4.27 9 5.15');
    svg.appendChild(path2);

    const polyline1 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline1.setAttribute('points', '3.29 7 12 12 20.71 7');
    svg.appendChild(polyline1);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '12');
    line1.setAttribute('x2', '12');
    line1.setAttribute('y1', '22');
    line1.setAttribute('y2', '12');
    svg.appendChild(line1);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'm17 13 5 5m-5 0 5-5');
    svg.appendChild(path3);

    this.appendChild(svg);
  }
}
customElements.define('lucide-package-x', LucidePackageX);
