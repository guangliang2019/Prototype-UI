export default class LucideUserRoundSearch extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-user-round-search');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '10');
    circle1.setAttribute('cy', '8');
    circle1.setAttribute('r', '5');
    svg.appendChild(circle1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M2 21a8 8 0 0 1 10.434-7.62');
    svg.appendChild(path1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '18');
    circle2.setAttribute('cy', '18');
    circle2.setAttribute('r', '3');
    svg.appendChild(circle2);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'm22 22-1.9-1.9');
    svg.appendChild(path2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-user-round-search', LucideUserRoundSearch);
