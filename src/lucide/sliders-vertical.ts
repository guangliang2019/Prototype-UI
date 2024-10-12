export default class LucideSlidersVertical extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-sliders-vertical');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '4');
    line1.setAttribute('x2', '4');
    line1.setAttribute('y1', '21');
    line1.setAttribute('y2', '14');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '4');
    line2.setAttribute('x2', '4');
    line2.setAttribute('y1', '10');
    line2.setAttribute('y2', '3');
    svg.appendChild(line2);

    const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line3.setAttribute('x1', '12');
    line3.setAttribute('x2', '12');
    line3.setAttribute('y1', '21');
    line3.setAttribute('y2', '12');
    svg.appendChild(line3);

    const line4 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line4.setAttribute('x1', '12');
    line4.setAttribute('x2', '12');
    line4.setAttribute('y1', '8');
    line4.setAttribute('y2', '3');
    svg.appendChild(line4);

    const line5 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line5.setAttribute('x1', '20');
    line5.setAttribute('x2', '20');
    line5.setAttribute('y1', '21');
    line5.setAttribute('y2', '16');
    svg.appendChild(line5);

    const line6 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line6.setAttribute('x1', '20');
    line6.setAttribute('x2', '20');
    line6.setAttribute('y1', '12');
    line6.setAttribute('y2', '3');
    svg.appendChild(line6);

    const line7 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line7.setAttribute('x1', '2');
    line7.setAttribute('x2', '6');
    line7.setAttribute('y1', '14');
    line7.setAttribute('y2', '14');
    svg.appendChild(line7);

    const line8 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line8.setAttribute('x1', '10');
    line8.setAttribute('x2', '14');
    line8.setAttribute('y1', '8');
    line8.setAttribute('y2', '8');
    svg.appendChild(line8);

    const line9 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line9.setAttribute('x1', '18');
    line9.setAttribute('x2', '22');
    line9.setAttribute('y1', '16');
    line9.setAttribute('y2', '16');
    svg.appendChild(line9);

    this.appendChild(svg);
  }
}
customElements.define('lucide-sliders-vertical', LucideSlidersVertical);
