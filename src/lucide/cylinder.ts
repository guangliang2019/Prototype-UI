export default class LucideCylinder extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-cylinder');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const ellipse1 = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ellipse1.setAttribute('cx', '12');
    ellipse1.setAttribute('cy', '5');
    ellipse1.setAttribute('rx', '9');
    ellipse1.setAttribute('ry', '3');
    svg.appendChild(ellipse1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M3 5v14a9 3 0 0 0 18 0V5');
    svg.appendChild(path1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-cylinder', LucideCylinder);