export default class LucideLayoutPanelTop extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-layout-panel-top');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '18');
    rect1.setAttribute('height', '7');
    rect1.setAttribute('x', '3');
    rect1.setAttribute('y', '3');
    rect1.setAttribute('rx', '1');
    svg.appendChild(rect1);

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect2.setAttribute('width', '7');
    rect2.setAttribute('height', '7');
    rect2.setAttribute('x', '3');
    rect2.setAttribute('y', '14');
    rect2.setAttribute('rx', '1');
    svg.appendChild(rect2);

    const rect3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect3.setAttribute('width', '7');
    rect3.setAttribute('height', '7');
    rect3.setAttribute('x', '14');
    rect3.setAttribute('y', '14');
    rect3.setAttribute('rx', '1');
    svg.appendChild(rect3);

    this.appendChild(svg);
  }
}
customElements.define('lucide-layout-panel-top', LucideLayoutPanelTop);
