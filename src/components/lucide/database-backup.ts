export default class LucideDatabaseBackup extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-database-backup');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const ellipse1 = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ellipse1.setAttribute('cx', '12');
    ellipse1.setAttribute('cy', '5');
    ellipse1.setAttribute('rx', '9');
    ellipse1.setAttribute('ry', '3');
    svg.appendChild(ellipse1);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M3 12a9 3 0 0 0 5 2.69');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M21 9.3V5');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M3 5v14a9 3 0 0 0 6.47 2.88');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M12 12v4h4');
    svg.appendChild(path4);

    const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path5.setAttribute(
      'd',
      'M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16'
    );
    svg.appendChild(path5);

    this.appendChild(svg);
  }
}
customElements.define('lucide-database-backup', LucideDatabaseBackup);
