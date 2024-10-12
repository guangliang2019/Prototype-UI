export default class LucideSlack extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-slack');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '3');
    rect1.setAttribute('height', '8');
    rect1.setAttribute('x', '13');
    rect1.setAttribute('y', '2');
    rect1.setAttribute('rx', '1.5');
    svg.appendChild(rect1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5');
    svg.appendChild(path1);

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect2.setAttribute('width', '3');
    rect2.setAttribute('height', '8');
    rect2.setAttribute('x', '8');
    rect2.setAttribute('y', '14');
    rect2.setAttribute('rx', '1.5');
    svg.appendChild(rect2);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5');
    svg.appendChild(path2);

    const rect3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect3.setAttribute('width', '8');
    rect3.setAttribute('height', '3');
    rect3.setAttribute('x', '14');
    rect3.setAttribute('y', '13');
    rect3.setAttribute('rx', '1.5');
    svg.appendChild(rect3);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5');
    svg.appendChild(path3);

    const rect4 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect4.setAttribute('width', '8');
    rect4.setAttribute('height', '3');
    rect4.setAttribute('x', '2');
    rect4.setAttribute('y', '8');
    rect4.setAttribute('rx', '1.5');
    svg.appendChild(rect4);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5');
    svg.appendChild(path4);

    this.appendChild(svg);
  }
}
customElements.define('lucide-slack', LucideSlack);
