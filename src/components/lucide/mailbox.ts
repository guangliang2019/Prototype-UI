export default class LucideMailbox extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-mailbox');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute(
      'd',
      'M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z'
    );
    svg.appendChild(path1);

    const polyline1 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline1.setAttribute('points', '15,9 18,9 18,11');
    svg.appendChild(polyline1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2');
    svg.appendChild(path2);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '6');
    line1.setAttribute('x2', '7');
    line1.setAttribute('y1', '10');
    line1.setAttribute('y2', '10');
    svg.appendChild(line1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-mailbox', LucideMailbox);
