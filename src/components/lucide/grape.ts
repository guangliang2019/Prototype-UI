export default class LucideGrape extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-grape');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M22 5V2l-5.89 5.89');
    svg.appendChild(path1);

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '16.6');
    circle1.setAttribute('cy', '15.89');
    circle1.setAttribute('r', '3');
    svg.appendChild(circle1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '8.11');
    circle2.setAttribute('cy', '7.4');
    circle2.setAttribute('r', '3');
    svg.appendChild(circle2);

    const circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle3.setAttribute('cx', '12.35');
    circle3.setAttribute('cy', '11.65');
    circle3.setAttribute('r', '3');
    svg.appendChild(circle3);

    const circle4 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle4.setAttribute('cx', '13.91');
    circle4.setAttribute('cy', '5.85');
    circle4.setAttribute('r', '3');
    svg.appendChild(circle4);

    const circle5 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle5.setAttribute('cx', '18.15');
    circle5.setAttribute('cy', '10.09');
    circle5.setAttribute('r', '3');
    svg.appendChild(circle5);

    const circle6 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle6.setAttribute('cx', '6.56');
    circle6.setAttribute('cy', '13.2');
    circle6.setAttribute('r', '3');
    svg.appendChild(circle6);

    const circle7 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle7.setAttribute('cx', '10.8');
    circle7.setAttribute('cy', '17.44');
    circle7.setAttribute('r', '3');
    svg.appendChild(circle7);

    const circle8 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle8.setAttribute('cx', '5');
    circle8.setAttribute('cy', '19');
    circle8.setAttribute('r', '3');
    svg.appendChild(circle8);

    this.appendChild(svg);
  }
}
customElements.define('lucide-grape', LucideGrape);
