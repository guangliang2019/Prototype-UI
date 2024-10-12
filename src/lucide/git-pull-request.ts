export default class LucideGitPullRequest extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-git-pull-request');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '18');
    circle1.setAttribute('cy', '18');
    circle1.setAttribute('r', '3');
    svg.appendChild(circle1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '6');
    circle2.setAttribute('cy', '6');
    circle2.setAttribute('r', '3');
    svg.appendChild(circle2);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M13 6h3a2 2 0 0 1 2 2v7');
    svg.appendChild(path1);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '6');
    line1.setAttribute('x2', '6');
    line1.setAttribute('y1', '9');
    line1.setAttribute('y2', '21');
    svg.appendChild(line1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-git-pull-request', LucideGitPullRequest);
