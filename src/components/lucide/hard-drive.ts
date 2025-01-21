export default class LucideHardDrive extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-hard-drive');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '22');
    line1.setAttribute('x2', '2');
    line1.setAttribute('y1', '12');
    line1.setAttribute('y2', '12');
    svg.appendChild(line1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute(
      'd',
      'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z'
    );
    svg.appendChild(path1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '6');
    line2.setAttribute('x2', '6.01');
    line2.setAttribute('y1', '16');
    line2.setAttribute('y2', '16');
    svg.appendChild(line2);

    const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line3.setAttribute('x1', '10');
    line3.setAttribute('x2', '10.01');
    line3.setAttribute('y1', '16');
    line3.setAttribute('y2', '16');
    svg.appendChild(line3);

    this.appendChild(svg);
  }
}
customElements.define('lucide-hard-drive', LucideHardDrive);
