export default class LucideQrCode extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-qr-code');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '5');
    rect1.setAttribute('height', '5');
    rect1.setAttribute('x', '3');
    rect1.setAttribute('y', '3');
    rect1.setAttribute('rx', '1');
    svg.appendChild(rect1);

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect2.setAttribute('width', '5');
    rect2.setAttribute('height', '5');
    rect2.setAttribute('x', '16');
    rect2.setAttribute('y', '3');
    rect2.setAttribute('rx', '1');
    svg.appendChild(rect2);

    const rect3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect3.setAttribute('width', '5');
    rect3.setAttribute('height', '5');
    rect3.setAttribute('x', '3');
    rect3.setAttribute('y', '16');
    rect3.setAttribute('rx', '1');
    svg.appendChild(rect3);

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M21 16h-3a2 2 0 0 0-2 2v3');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M21 21v.01');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M12 7v3a2 2 0 0 1-2 2H7');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M3 12h.01');
    svg.appendChild(path4);

    const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path5.setAttribute('d', 'M12 3h.01');
    svg.appendChild(path5);

    const path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path6.setAttribute('d', 'M12 16v.01');
    svg.appendChild(path6);

    const path7 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path7.setAttribute('d', 'M16 12h1');
    svg.appendChild(path7);

    const path8 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path8.setAttribute('d', 'M21 12v.01');
    svg.appendChild(path8);

    const path9 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path9.setAttribute('d', 'M12 21v-1');
    svg.appendChild(path9);

    this.appendChild(svg);
  }
}
customElements.define('lucide-qr-code', LucideQrCode);
