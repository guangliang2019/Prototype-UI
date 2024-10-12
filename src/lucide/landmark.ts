export default class LucideLandmark extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-landmark');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '3');
    line1.setAttribute('x2', '21');
    line1.setAttribute('y1', '22');
    line1.setAttribute('y2', '22');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '6');
    line2.setAttribute('x2', '6');
    line2.setAttribute('y1', '18');
    line2.setAttribute('y2', '11');
    svg.appendChild(line2);

    const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line3.setAttribute('x1', '10');
    line3.setAttribute('x2', '10');
    line3.setAttribute('y1', '18');
    line3.setAttribute('y2', '11');
    svg.appendChild(line3);

    const line4 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line4.setAttribute('x1', '14');
    line4.setAttribute('x2', '14');
    line4.setAttribute('y1', '18');
    line4.setAttribute('y2', '11');
    svg.appendChild(line4);

    const line5 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line5.setAttribute('x1', '18');
    line5.setAttribute('x2', '18');
    line5.setAttribute('y1', '18');
    line5.setAttribute('y2', '11');
    svg.appendChild(line5);

    const polygon1 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon1.setAttribute('points', '12 2 20 7 4 7');
    svg.appendChild(polygon1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-landmark', LucideLandmark);
