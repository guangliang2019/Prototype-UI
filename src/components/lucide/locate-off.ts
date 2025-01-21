export default class LucideLocateOff extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-locate-off');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '2');
    line1.setAttribute('x2', '5');
    line1.setAttribute('y1', '12');
    line1.setAttribute('y2', '12');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '19');
    line2.setAttribute('x2', '22');
    line2.setAttribute('y1', '12');
    line2.setAttribute('y2', '12');
    svg.appendChild(line2);

    const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line3.setAttribute('x1', '12');
    line3.setAttribute('x2', '12');
    line3.setAttribute('y1', '2');
    line3.setAttribute('y2', '5');
    svg.appendChild(line3);

    const line4 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line4.setAttribute('x1', '12');
    line4.setAttribute('x2', '12');
    line4.setAttribute('y1', '19');
    line4.setAttribute('y2', '22');
    svg.appendChild(line4);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute(
      'd',
      'M7.11 7.11C5.83 8.39 5 10.1 5 12c0 3.87 3.13 7 7 7 1.9 0 3.61-.83 4.89-2.11'
    );
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute(
      'd',
      'M18.71 13.96c.19-.63.29-1.29.29-1.96 0-3.87-3.13-7-7-7-.67 0-1.33.1-1.96.29'
    );
    svg.appendChild(path2);

    const line5 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line5.setAttribute('x1', '2');
    line5.setAttribute('x2', '22');
    line5.setAttribute('y1', '2');
    line5.setAttribute('y2', '22');
    svg.appendChild(line5);

    this.appendChild(svg);
  }
}
customElements.define('lucide-locate-off', LucideLocateOff);
