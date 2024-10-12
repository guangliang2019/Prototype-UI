export default class LucideNetwork extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-network');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('x', '16');
    rect1.setAttribute('y', '16');
    rect1.setAttribute('width', '6');
    rect1.setAttribute('height', '6');
    rect1.setAttribute('rx', '1');
    svg.appendChild(rect1);

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect2.setAttribute('x', '2');
    rect2.setAttribute('y', '16');
    rect2.setAttribute('width', '6');
    rect2.setAttribute('height', '6');
    rect2.setAttribute('rx', '1');
    svg.appendChild(rect2);

    const rect3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect3.setAttribute('x', '9');
    rect3.setAttribute('y', '2');
    rect3.setAttribute('width', '6');
    rect3.setAttribute('height', '6');
    rect3.setAttribute('rx', '1');
    svg.appendChild(rect3);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M12 12V8');
    svg.appendChild(path2);

    this.appendChild(svg);
  }
}
customElements.define('lucide-network', LucideNetwork);
