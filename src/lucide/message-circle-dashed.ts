export default class LucideMessageCircleDashed extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-message-circle-dashed');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M13.5 3.1c-.5 0-1-.1-1.5-.1s-1 .1-1.5.1');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M19.3 6.8a10.45 10.45 0 0 0-2.1-2.1');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M20.9 13.5c.1-.5.1-1 .1-1.5s-.1-1-.1-1.5');
    svg.appendChild(path3);

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M17.2 19.3a10.45 10.45 0 0 0 2.1-2.1');
    svg.appendChild(path4);

    const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path5.setAttribute('d', 'M10.5 20.9c.5.1 1 .1 1.5.1s1-.1 1.5-.1');
    svg.appendChild(path5);

    const path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path6.setAttribute('d', 'M3.5 17.5 2 22l4.5-1.5');
    svg.appendChild(path6);

    const path7 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path7.setAttribute('d', 'M3.1 10.5c0 .5-.1 1-.1 1.5s.1 1 .1 1.5');
    svg.appendChild(path7);

    const path8 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path8.setAttribute('d', 'M6.8 4.7a10.45 10.45 0 0 0-2.1 2.1');
    svg.appendChild(path8);

    this.appendChild(svg);
  }
}
customElements.define('lucide-message-circle-dashed', LucideMessageCircleDashed);
