export default class LucideBoomBox extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-boom-box');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M8 8v1');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M12 8v1');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M16 8v1');
    svg.appendChild(path4);

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '20');
    rect1.setAttribute('height', '12');
    rect1.setAttribute('x', '2');
    rect1.setAttribute('y', '9');
    rect1.setAttribute('rx', '2');
    svg.appendChild(rect1);

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '8');
    circle1.setAttribute('cy', '15');
    circle1.setAttribute('r', '2');
    svg.appendChild(circle1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '16');
    circle2.setAttribute('cy', '15');
    circle2.setAttribute('r', '2');
    svg.appendChild(circle2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-boom-box', LucideBoomBox);