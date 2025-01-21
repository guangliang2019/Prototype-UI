export default class LucideLaptopMinimal extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-laptop-minimal');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '18');
    rect1.setAttribute('height', '12');
    rect1.setAttribute('x', '3');
    rect1.setAttribute('y', '4');
    rect1.setAttribute('rx', '2');
    rect1.setAttribute('ry', '2');
    svg.appendChild(rect1);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '2');
    line1.setAttribute('x2', '22');
    line1.setAttribute('y1', '20');
    line1.setAttribute('y2', '20');
    svg.appendChild(line1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-laptop-minimal', LucideLaptopMinimal);
