export default class LucideBatteryCharging extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide', 'lucide-battery-charging');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1');
    svg.appendChild(path2);

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'm11 7-3 5h4l-3 5');
    svg.appendChild(path3);

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '22');
    line1.setAttribute('x2', '22');
    line1.setAttribute('y1', '11');
    line1.setAttribute('y2', '13');
    svg.appendChild(line1);

    this.appendChild(svg);
  }
}
customElements.define('lucide-battery-charging', LucideBatteryCharging);
