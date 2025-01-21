export default class LucideRadius extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-radius');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M20.34 17.52a10 10 0 1 0-2.82 2.82');
    svg.appendChild(path1);

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '19');
    circle1.setAttribute('cy', '19');
    circle1.setAttribute('r', '2');
    svg.appendChild(circle1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'm13.41 13.41 4.18 4.18');
    svg.appendChild(path2);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '12');
    circle2.setAttribute('cy', '12');
    circle2.setAttribute('r', '2');
    svg.appendChild(circle2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-radius', LucideRadius);
