export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export class Button extends HTMLElement {
  private label: string;
  private onClick: (() => void) | undefined;

  constructor() {
    super();
    this.label = '';
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'label') {
      this.label = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.shadowRoot?.querySelector('button')?.addEventListener('click', () => {
      if (this.onClick) this.onClick();
    });
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          button {
            padding: 8px 16px;
            font-size: 16px;
            cursor: pointer;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
          }
        </style>
        <button>${this.label}</button>
      `;
    }
  }
}

customElements.define('custom-button', Button);