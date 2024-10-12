export default class LucideAlbum extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-album');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '18');
    rect1.setAttribute('height', '18');
    rect1.setAttribute('x', '3');
    rect1.setAttribute('y', '3');
    rect1.setAttribute('rx', '2');
    rect1.setAttribute('ry', '2');
    svg.appendChild(rect1);

    const polyline1 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline1.setAttribute('points', '11 3 11 11 14 8 17 11 17 3');
    svg.appendChild(polyline1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-album', LucideAlbum);
