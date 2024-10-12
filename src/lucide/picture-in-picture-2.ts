export default class LucidePictureInPicture2 extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-picture-in-picture-2');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4');
    svg.appendChild(path1);

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '10');
    rect1.setAttribute('height', '7');
    rect1.setAttribute('x', '12');
    rect1.setAttribute('y', '13');
    rect1.setAttribute('rx', '2');
    svg.appendChild(rect1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-picture-in-picture-2', LucidePictureInPicture2);
