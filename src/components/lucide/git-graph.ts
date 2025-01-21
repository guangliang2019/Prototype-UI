export default class LucideGitGraph extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-git-graph');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '5');
    circle1.setAttribute('cy', '6');
    circle1.setAttribute('r', '3');
    svg.appendChild(circle1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M5 9v6');
    svg.appendChild(path1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '5');
    circle2.setAttribute('cy', '18');
    circle2.setAttribute('r', '3');
    svg.appendChild(circle2);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M12 3v18');
    svg.appendChild(path2);

    const circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle3.setAttribute('cx', '19');
    circle3.setAttribute('cy', '6');
    circle3.setAttribute('r', '3');
    svg.appendChild(circle3);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M16 15.7A9 9 0 0 0 19 9');
    svg.appendChild(path3);

    this.appendChild(svg);
  }
}
customElements.define('lucide-git-graph', LucideGitGraph);
