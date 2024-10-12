export default class LucideBike extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-bike');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '18.5');
    circle1.setAttribute('cy', '17.5');
    circle1.setAttribute('r', '3.5');
    svg.appendChild(circle1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '5.5');
    circle2.setAttribute('cy', '17.5');
    circle2.setAttribute('r', '3.5');
    svg.appendChild(circle2);

    const circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle3.setAttribute('cx', '15');
    circle3.setAttribute('cy', '5');
    circle3.setAttribute('r', '1');
    svg.appendChild(circle3);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M12 17.5V14l-3-3 4-3 2 3h2');
    svg.appendChild(path1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-bike', LucideBike);
