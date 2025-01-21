export default class LucideSwords extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-swords');
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

    const polyline2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline2.setAttribute('points', '14.5 6.5 18 3 21 3 21 6 17.5 9.5');
    svg.appendChild(polyline2);

    const line4 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line4.setAttribute('x1', '5');
    line4.setAttribute('x2', '9');
    line4.setAttribute('y1', '14');
    line4.setAttribute('y2', '18');
    svg.appendChild(line4);

    const line5 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line5.setAttribute('x1', '7');
    line5.setAttribute('x2', '4');
    line5.setAttribute('y1', '17');
    line5.setAttribute('y2', '20');
    svg.appendChild(line5);

    const line6 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line6.setAttribute('x1', '3');
    line6.setAttribute('x2', '5');
    line6.setAttribute('y1', '19');
    line6.setAttribute('y2', '21');
    svg.appendChild(line6);

    this.appendChild(svg);
  }
}
customElements.define('lucide-swords', LucideSwords);
