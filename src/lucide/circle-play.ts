export default class LucideCirclePlay extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-circle-play');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '12');
    circle1.setAttribute('cy', '12');
    circle1.setAttribute('r', '10');
    svg.appendChild(circle1);

    const polygon1 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon1.setAttribute('points', '10 8 16 12 10 16 10 8');
    svg.appendChild(polygon1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-circle-play', LucideCirclePlay);