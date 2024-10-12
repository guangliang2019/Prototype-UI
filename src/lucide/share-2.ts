export default class LucideShare2 extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-share-2');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '18');
    circle1.setAttribute('cy', '5');
    circle1.setAttribute('r', '3');
    svg.appendChild(circle1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '6');
    circle2.setAttribute('cy', '12');
    circle2.setAttribute('r', '3');
    svg.appendChild(circle2);

    const circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle3.setAttribute('cx', '18');
    circle3.setAttribute('cy', '19');
    circle3.setAttribute('r', '3');
    svg.appendChild(circle3);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '8.59');
    line1.setAttribute('x2', '15.42');
    line1.setAttribute('y1', '13.51');
    line1.setAttribute('y2', '17.49');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '15.41');
    line2.setAttribute('x2', '8.59');
    line2.setAttribute('y1', '6.51');
    line2.setAttribute('y2', '10.49');
    svg.appendChild(line2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-share-2', LucideShare2);
