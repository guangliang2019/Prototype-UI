export default class LucideGripVertical extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-grip-vertical');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '9');
    circle1.setAttribute('cy', '12');
    circle1.setAttribute('r', '1');
    svg.appendChild(circle1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '9');
    circle2.setAttribute('cy', '5');
    circle2.setAttribute('r', '1');
    svg.appendChild(circle2);

    const circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle3.setAttribute('cx', '9');
    circle3.setAttribute('cy', '19');
    circle3.setAttribute('r', '1');
    svg.appendChild(circle3);

    const circle4 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle4.setAttribute('cx', '15');
    circle4.setAttribute('cy', '12');
    circle4.setAttribute('r', '1');
    svg.appendChild(circle4);

    const circle5 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle5.setAttribute('cx', '15');
    circle5.setAttribute('cy', '5');
    circle5.setAttribute('r', '1');
    svg.appendChild(circle5);

    const circle6 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle6.setAttribute('cx', '15');
    circle6.setAttribute('cy', '19');
    circle6.setAttribute('r', '1');
    svg.appendChild(circle6);

    this.appendChild(svg);
  }
}
customElements.define('lucide-grip-vertical', LucideGripVertical);
