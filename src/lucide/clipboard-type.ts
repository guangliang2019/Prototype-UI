export default class LucideClipboardType extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-clipboard-type');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '8');
    rect1.setAttribute('height', '4');
    rect1.setAttribute('x', '8');
    rect1.setAttribute('y', '2');
    rect1.setAttribute('rx', '1');
    rect1.setAttribute('ry', '1');
    svg.appendChild(rect1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute(
      'd',
      'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'
    );
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M9 12v-1h6v1');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M11 17h2');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M12 11v6');
    svg.appendChild(path4);

    this.appendChild(svg);
  }
}
customElements.define('lucide-clipboard-type', LucideClipboardType);