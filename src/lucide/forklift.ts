export default class LucideForklift extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-forklift');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M12 12H5a2 2 0 0 0-2 2v5');
    svg.appendChild(path1);

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '13');
    circle1.setAttribute('cy', '19');
    circle1.setAttribute('r', '2');
    svg.appendChild(circle1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '5');
    circle2.setAttribute('cy', '19');
    circle2.setAttribute('r', '2');
    svg.appendChild(circle2);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M8 19h3m5-17v17h6M6 12V7c0-1.1.9-2 2-2h3l5 5');
    svg.appendChild(path2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-forklift', LucideForklift);
