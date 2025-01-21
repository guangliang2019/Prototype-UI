export default class LucideFastForward extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-fast-forward');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const polygon1 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon1.setAttribute('points', '13 19 22 12 13 5 13 19');
    svg.appendChild(polygon1);

    const polygon2 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon2.setAttribute('points', '2 19 11 12 2 5 2 19');
    svg.appendChild(polygon2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-fast-forward', LucideFastForward);
