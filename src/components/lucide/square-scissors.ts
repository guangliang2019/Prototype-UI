export default class LucideSquareScissors extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-square-scissors');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '20');
    rect1.setAttribute('height', '20');
    rect1.setAttribute('x', '2');
    rect1.setAttribute('y', '2');
    rect1.setAttribute('rx', '2');
    svg.appendChild(rect1);

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '8');
    circle1.setAttribute('cy', '8');
    circle1.setAttribute('r', '2');
    svg.appendChild(circle1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M9.414 9.414 12 12');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M14.8 14.8 18 18');
    svg.appendChild(path2);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '8');
    circle2.setAttribute('cy', '16');
    circle2.setAttribute('r', '2');
    svg.appendChild(circle2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'm18 6-8.586 8.586');
    svg.appendChild(path3);

    this.appendChild(svg);
  }
}
customElements.define('lucide-square-scissors', LucideSquareScissors);
