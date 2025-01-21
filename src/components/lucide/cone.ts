export default class LucideCone extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-cone');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'm20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98');
    svg.appendChild(path1);

    const ellipse1 = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ellipse1.setAttribute('cx', '12');
    ellipse1.setAttribute('cy', '19');
    ellipse1.setAttribute('rx', '9');
    ellipse1.setAttribute('ry', '3');
    svg.appendChild(ellipse1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-cone', LucideCone);
