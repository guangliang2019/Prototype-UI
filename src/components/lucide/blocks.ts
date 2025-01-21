export default class LucideBlocks extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-blocks');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '7');
    rect1.setAttribute('height', '7');
    rect1.setAttribute('x', '14');
    rect1.setAttribute('y', '3');
    rect1.setAttribute('rx', '1');
    svg.appendChild(rect1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute(
      'd',
      'M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3'
    );
    svg.appendChild(path1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-blocks', LucideBlocks);
