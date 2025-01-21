export default class LucideVault extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-vault');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '18');
    rect1.setAttribute('height', '18');
    rect1.setAttribute('x', '3');
    rect1.setAttribute('y', '3');
    rect1.setAttribute('rx', '2');
    svg.appendChild(rect1);

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '7.5');
    circle1.setAttribute('cy', '7.5');
    circle1.setAttribute('r', '.5');
    circle1.setAttribute('fill', 'currentColor');
    svg.appendChild(circle1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'm7.9 7.9 2.7 2.7');
    svg.appendChild(path1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '16.5');
    circle2.setAttribute('cy', '7.5');
    circle2.setAttribute('r', '.5');
    circle2.setAttribute('fill', 'currentColor');
    svg.appendChild(circle2);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'm13.4 10.6 2.7-2.7');
    svg.appendChild(path2);

    const circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle3.setAttribute('cx', '7.5');
    circle3.setAttribute('cy', '16.5');
    circle3.setAttribute('r', '.5');
    circle3.setAttribute('fill', 'currentColor');
    svg.appendChild(circle3);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'm7.9 16.1 2.7-2.7');
    svg.appendChild(path3);

    const circle4 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle4.setAttribute('cx', '16.5');
    circle4.setAttribute('cy', '16.5');
    circle4.setAttribute('r', '.5');
    circle4.setAttribute('fill', 'currentColor');
    svg.appendChild(circle4);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'm13.4 13.4 2.7 2.7');
    svg.appendChild(path4);

    const circle5 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle5.setAttribute('cx', '12');
    circle5.setAttribute('cy', '12');
    circle5.setAttribute('r', '2');
    svg.appendChild(circle5);

    this.appendChild(svg);
  }
}
customElements.define('lucide-vault', LucideVault);
