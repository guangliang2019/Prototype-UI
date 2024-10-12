export default class LucideWaypoints extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-waypoints');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '12');
    circle1.setAttribute('cy', '4.5');
    circle1.setAttribute('r', '2.5');
    svg.appendChild(circle1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'm10.2 6.3-3.9 3.9');
    svg.appendChild(path1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '4.5');
    circle2.setAttribute('cy', '12');
    circle2.setAttribute('r', '2.5');
    svg.appendChild(circle2);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M7 12h10');
    svg.appendChild(path2);

    const circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle3.setAttribute('cx', '19.5');
    circle3.setAttribute('cy', '12');
    circle3.setAttribute('r', '2.5');
    svg.appendChild(circle3);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'm13.8 17.7 3.9-3.9');
    svg.appendChild(path3);

    const circle4 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle4.setAttribute('cx', '12');
    circle4.setAttribute('cy', '19.5');
    circle4.setAttribute('r', '2.5');
    svg.appendChild(circle4);

    this.appendChild(svg);
  }
}
customElements.define('lucide-waypoints', LucideWaypoints);
