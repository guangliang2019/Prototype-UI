export default class LucideBookDashed extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-book-dashed');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M12 17h2');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M12 22h2');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M12 2h2');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M18 22h1a1 1 0 0 0 1-1');
    svg.appendChild(path4);

    const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path5.setAttribute('d', 'M18 2h1a1 1 0 0 1 1 1v1');
    svg.appendChild(path5);

    const path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path6.setAttribute('d', 'M20 15v2h-2');
    svg.appendChild(path6);

    const path7 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path7.setAttribute('d', 'M20 8v3');
    svg.appendChild(path7);

    const path8 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path8.setAttribute('d', 'M4 11V9');
    svg.appendChild(path8);

    const path9 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path9.setAttribute('d', 'M4 19.5V15');
    svg.appendChild(path9);

    const path10 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path10.setAttribute('d', 'M4 5v-.5A2.5 2.5 0 0 1 6.5 2H8');
    svg.appendChild(path10);

    const path11 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path11.setAttribute('d', 'M8 22H6.5a1 1 0 0 1 0-5H8');
    svg.appendChild(path11);

    this.appendChild(svg);
  }
}
customElements.define('lucide-book-dashed', LucideBookDashed);
