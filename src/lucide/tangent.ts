export default class LucideTangent extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-tangent');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '17');
    circle1.setAttribute('cy', '4');
    circle1.setAttribute('r', '2');
    svg.appendChild(circle1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M15.59 5.41 5.41 15.59');
    svg.appendChild(path1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '4');
    circle2.setAttribute('cy', '17');
    circle2.setAttribute('r', '2');
    svg.appendChild(circle2);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M12 22s-4-9-1.5-11.5S22 12 22 12');
    svg.appendChild(path2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-tangent', LucideTangent);
