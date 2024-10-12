export default class LucideSquareDashedKanban extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-square-dashed-kanban');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M8 7v7');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M12 7v4');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M16 7v9');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M5 3a2 2 0 0 0-2 2');
    svg.appendChild(path4);

    const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path5.setAttribute('d', 'M9 3h1');
    svg.appendChild(path5);

    const path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path6.setAttribute('d', 'M14 3h1');
    svg.appendChild(path6);

    const path7 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path7.setAttribute('d', 'M19 3a2 2 0 0 1 2 2');
    svg.appendChild(path7);

    const path8 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path8.setAttribute('d', 'M21 9v1');
    svg.appendChild(path8);

    const path9 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path9.setAttribute('d', 'M21 14v1');
    svg.appendChild(path9);

    const path10 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path10.setAttribute('d', 'M21 19a2 2 0 0 1-2 2');
    svg.appendChild(path10);

    const path11 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path11.setAttribute('d', 'M14 21h1');
    svg.appendChild(path11);

    const path12 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path12.setAttribute('d', 'M9 21h1');
    svg.appendChild(path12);

    const path13 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path13.setAttribute('d', 'M5 21a2 2 0 0 1-2-2');
    svg.appendChild(path13);

    const path14 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path14.setAttribute('d', 'M3 14v1');
    svg.appendChild(path14);

    const path15 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path15.setAttribute('d', 'M3 9v1');
    svg.appendChild(path15);

    this.appendChild(svg);
  }
}
customElements.define('lucide-square-dashed-kanban', LucideSquareDashedKanban);
