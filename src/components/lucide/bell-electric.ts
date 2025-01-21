export default class LucideBellElectric extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-bell-electric');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M18.8 4A6.3 8.7 0 0 1 20 9');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M9 9h.01');
    svg.appendChild(path2);

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '9');
    circle1.setAttribute('cy', '9');
    circle1.setAttribute('r', '7');
    svg.appendChild(circle1);

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '10');
    rect1.setAttribute('height', '6');
    rect1.setAttribute('x', '4');
    rect1.setAttribute('y', '16');
    rect1.setAttribute('rx', '2');
    svg.appendChild(rect1);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M14 19c3 0 4.6-1.6 4.6-1.6');
    svg.appendChild(path3);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '20');
    circle2.setAttribute('cy', '16');
    circle2.setAttribute('r', '2');
    svg.appendChild(circle2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-bell-electric', LucideBellElectric);
