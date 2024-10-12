export default class LucideRatio extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-ratio');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '12');
    rect1.setAttribute('height', '20');
    rect1.setAttribute('x', '6');
    rect1.setAttribute('y', '2');
    rect1.setAttribute('rx', '2');
    svg.appendChild(rect1);

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect2.setAttribute('width', '20');
    rect2.setAttribute('height', '12');
    rect2.setAttribute('x', '2');
    rect2.setAttribute('y', '6');
    rect2.setAttribute('rx', '2');
    svg.appendChild(rect2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-ratio', LucideRatio);
