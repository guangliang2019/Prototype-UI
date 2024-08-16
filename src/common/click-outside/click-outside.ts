/**
 * Click Outside Component
 * 
 * @link https://github.com/guangliang2019/Prototype-UI/blob/main/src/common/click-outside/click-outside.ts
 * @author guangliang2019
 * @date 2024-08-11
 */

interface ClickOutsideProps {
  onClickOutside: (event: MouseEvent) => void;
}

const DEFAULT_CLICK_OUTSIDE_PROPS = {
  onClickOutside: (_: MouseEvent) => {},
};

export default class ClickOutside extends HTMLElement implements ClickOutsideProps {
  public onClickOutside = DEFAULT_CLICK_OUTSIDE_PROPS['onClickOutside'];

  connectedCallback() {
    this._handleClickOutside = this._handleClickOutside.bind(this);
    window.addEventListener('click', this._handleClickOutside);
  }

  disconnectedCallback() {
    window.removeEventListener('click', this._handleClickOutside);
  }

  private _handleClickOutside(event: MouseEvent) {
    if (!this.contains(event.target as Node)) {
      this.onClickOutside(event);
    }
  }
}

customElements.define('click-outside', ClickOutside);
