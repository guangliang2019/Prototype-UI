export default class LucideNotebookTabs extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-notebook-tabs');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M2 6h4');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M2 10h4');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M2 14h4');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M2 18h4');
    svg.appendChild(path4);

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '16');
    rect1.setAttribute('height', '20');
    rect1.setAttribute('x', '4');
    rect1.setAttribute('y', '2');
    rect1.setAttribute('rx', '2');
    svg.appendChild(rect1);

    const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path5.setAttribute('d', 'M15 2v20');
    svg.appendChild(path5);

    const path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path6.setAttribute('d', 'M15 7h5');
    svg.appendChild(path6);

    const path7 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path7.setAttribute('d', 'M15 12h5');
    svg.appendChild(path7);

    const path8 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path8.setAttribute('d', 'M15 17h5');
    svg.appendChild(path8);

    this.appendChild(svg);
  }
}
customElements.define('lucide-notebook-tabs', LucideNotebookTabs);
