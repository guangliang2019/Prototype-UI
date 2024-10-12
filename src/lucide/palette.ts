export default class LucidePalette extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-palette');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '13.5');
    circle1.setAttribute('cy', '6.5');
    circle1.setAttribute('r', '.5');
    circle1.setAttribute('fill', 'currentColor');
    svg.appendChild(circle1);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', '17.5');
    circle2.setAttribute('cy', '10.5');
    circle2.setAttribute('r', '.5');
    circle2.setAttribute('fill', 'currentColor');
    svg.appendChild(circle2);

    const circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle3.setAttribute('cx', '8.5');
    circle3.setAttribute('cy', '7.5');
    circle3.setAttribute('r', '.5');
    circle3.setAttribute('fill', 'currentColor');
    svg.appendChild(circle3);

    const circle4 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle4.setAttribute('cx', '6.5');
    circle4.setAttribute('cy', '12.5');
    circle4.setAttribute('r', '.5');
    circle4.setAttribute('fill', 'currentColor');
    svg.appendChild(circle4);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute(
      'd',
      'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z'
    );
    svg.appendChild(path1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-palette', LucidePalette);
