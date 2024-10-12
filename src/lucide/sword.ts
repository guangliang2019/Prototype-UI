export default class LucideSword extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-sword');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const polyline1 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline1.setAttribute('points', '14.5 17.5 3 6 3 3 6 3 17.5 14.5');
    svg.appendChild(polyline1);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '13');
    line1.setAttribute('x2', '19');
    line1.setAttribute('y1', '19');
    line1.setAttribute('y2', '13');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '16');
    line2.setAttribute('x2', '20');
    line2.setAttribute('y1', '16');
    line2.setAttribute('y2', '20');
    svg.appendChild(line2);

    const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line3.setAttribute('x1', '19');
    line3.setAttribute('x2', '21');
    line3.setAttribute('y1', '21');
    line3.setAttribute('y2', '19');
    svg.appendChild(line3);

    this.appendChild(svg);
  }
}
customElements.define('lucide-sword', LucideSword);