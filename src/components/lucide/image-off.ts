export default class LucideImageOff extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-image-off');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '2');
    line1.setAttribute('x2', '22');
    line1.setAttribute('y1', '2');
    line1.setAttribute('y2', '22');
    svg.appendChild(line1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M10.41 10.41a2 2 0 1 1-2.83-2.83');
    svg.appendChild(path1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '13.5');
    line2.setAttribute('x2', '6');
    line2.setAttribute('y1', '13.5');
    line2.setAttribute('y2', '21');
    svg.appendChild(line2);

    const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line3.setAttribute('x1', '18');
    line3.setAttribute('x2', '21');
    line3.setAttribute('y1', '12');
    line3.setAttribute('y2', '15');
    svg.appendChild(line3);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute(
      'd',
      'M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59'
    );
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M21 15V5a2 2 0 0 0-2-2H9');
    svg.appendChild(path3);

    this.appendChild(svg);
  }
}
customElements.define('lucide-image-off', LucideImageOff);
