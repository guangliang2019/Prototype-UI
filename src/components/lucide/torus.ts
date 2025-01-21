export default class LucideTorus extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-torus');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const ellipse1 = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ellipse1.setAttribute('cx', '12');
    ellipse1.setAttribute('cy', '11');
    ellipse1.setAttribute('rx', '3');
    ellipse1.setAttribute('ry', '2');
    svg.appendChild(ellipse1);

    const ellipse2 = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ellipse2.setAttribute('cx', '12');
    ellipse2.setAttribute('cy', '12.5');
    ellipse2.setAttribute('rx', '10');
    ellipse2.setAttribute('ry', '8.5');
    svg.appendChild(ellipse2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-torus', LucideTorus);
