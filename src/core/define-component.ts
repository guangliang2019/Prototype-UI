// lifecycle
export const connectedCallbacks = Symbol('hooked-web-component connectedCallbacks');
export const disconnectedCallbacks = Symbol('hooked-web-component disconnectedCallbacks');
export const createdCallbacks = Symbol('hooked-web-component createdCallbacks');

// props
export const initProps = Symbol('hooked-web-component initProps');

// flags
export const canUseHooksFlag = Symbol('hooked-web-component canUseHooksFlag');

/**
 * Define a web component with hooks.
 *
 * @param setup
 * A function to declare your component, you can use **hooks** in setup.
 *
 * Should return a `HTMLElement` or `void`.
 * @returns An anonymous class extends `HTMLElement`, can be used as a **web component** or other things.
 */
export const defineComponent = <T>(
  setup: (self: Component<T> & T) => HTMLElement | void
): Constructor<Component<T>> => {
  return class extends HTMLElement {
    [canUseHooksFlag] = true;

    [initProps]: T = null as any;

    [createdCallbacks]: Set<() => void> = new Set();
    [connectedCallbacks]: Set<() => void> = new Set();
    [disconnectedCallbacks]: Set<() => void> = new Set();

    constructor(args: T) {
      super();
      this[initProps] = args;
      setup(this as unknown as Component<T> & T);
    }

    connectedCallback() {
      this[connectedCallbacks].forEach((callback) => callback());
    }

    disconnectedCallback() {
      this[disconnectedCallbacks].forEach((callback) => callback());
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

    adoptedCallback() {}

    static get observedAttributes() {
      return [];
    }

    render() {}
    update() {}
  };
};

export interface Component<T> extends HTMLElement {
  [canUseHooksFlag]: boolean;
  [initProps]: T;
  [createdCallbacks]: Set<() => void>;
  [connectedCallbacks]: Set<() => void>;
  [disconnectedCallbacks]: Set<() => void>;

  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
  adoptedCallback(): void;
  render(): void;
  update(): void;
}

type Constructor<T> = new (args: any) => T;
