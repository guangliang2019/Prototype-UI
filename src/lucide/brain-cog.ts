export default class LucideBrainCog extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-brain-cog');
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
      'M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588 4 4 0 0 0 7.636 2.106 3.2 3.2 0 0 0 .164-.546c.028-.13.306-.13.335 0a3.2 3.2 0 0 0 .163.546 4 4 0 0 0 7.636-2.106 4 4 0 0 0 .556-6.588 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5'
    );
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M17.599 6.5a3 3 0 0 0 .399-1.375');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M6.003 5.125A3 3 0 0 0 6.401 6.5');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M3.477 10.896a4 4 0 0 1 .585-.396');
    svg.appendChild(path4);

    const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path5.setAttribute('d', 'M19.938 10.5a4 4 0 0 1 .585.396');
    svg.appendChild(path5);

    const path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path6.setAttribute('d', 'M6 18a4 4 0 0 1-1.967-.516');
    svg.appendChild(path6);

    const path7 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path7.setAttribute('d', 'M19.967 17.484A4 4 0 0 1 18 18');
    svg.appendChild(path7);

    const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle1.setAttribute('cx', '12');
    circle1.setAttribute('cy', '12');
    circle1.setAttribute('r', '3');
    svg.appendChild(circle1);

    const path8 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path8.setAttribute('d', 'm15.7 10.4-.9.4');
    svg.appendChild(path8);

    const path9 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path9.setAttribute('d', 'm9.2 13.2-.9.4');
    svg.appendChild(path9);

    const path10 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path10.setAttribute('d', 'm13.6 15.7-.4-.9');
    svg.appendChild(path10);

    const path11 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path11.setAttribute('d', 'm10.8 9.2-.4-.9');
    svg.appendChild(path11);

    const path12 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path12.setAttribute('d', 'm15.7 13.5-.9-.4');
    svg.appendChild(path12);

    const path13 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path13.setAttribute('d', 'm9.2 10.9-.9-.4');
    svg.appendChild(path13);

    const path14 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path14.setAttribute('d', 'm10.5 15.7.4-.9');
    svg.appendChild(path14);

    const path15 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path15.setAttribute('d', 'm13.1 9.2.4-.9');
    svg.appendChild(path15);

    this.appendChild(svg);
  }
}
customElements.define('lucide-brain-cog', LucideBrainCog);
