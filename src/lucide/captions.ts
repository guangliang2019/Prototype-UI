export default class LucideCaptions extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-captions');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '18');
    rect1.setAttribute('height', '14');
    rect1.setAttribute('x', '3');
    rect1.setAttribute('y', '5');
    rect1.setAttribute('rx', '2');
    rect1.setAttribute('ry', '2');
    svg.appendChild(rect1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M7 15h4M15 15h2M7 11h2M13 11h4');
    svg.appendChild(path1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-captions', LucideCaptions);
