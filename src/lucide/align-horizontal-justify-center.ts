export default class LucideAlignHorizontalJustifyCenter extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-align-horizontal-justify-center');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '6');
    rect1.setAttribute('height', '14');
    rect1.setAttribute('x', '2');
    rect1.setAttribute('y', '5');
    rect1.setAttribute('rx', '2');
    svg.appendChild(rect1);

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect2.setAttribute('width', '6');
    rect2.setAttribute('height', '10');
    rect2.setAttribute('x', '16');
    rect2.setAttribute('y', '7');
    rect2.setAttribute('rx', '2');
    svg.appendChild(rect2);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M12 2v20');
    svg.appendChild(path1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-align-horizontal-justify-center', LucideAlignHorizontalJustifyCenter);