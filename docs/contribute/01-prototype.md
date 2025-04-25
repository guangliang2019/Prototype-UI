# Prototype

## What is a Prototype?

A Prototype is a framework-agnostic description of a UI component. It models the full interaction logic and structure of a component, without being tied to any specific technology. Just as modern frontend development is component-centric, Proto UI is built around the concept of Prototypes.

## What Does a Prototype Include?

Each Prototype defines a component’s interaction behavior in a neutral, platform-independent way. It typically includes:

- **Interaction Logic**: How the component responds to clicks, focus, touch, etc.
- **Structure and Style**: A structural outline of how the component should look and behave—without defining how it's implemented.
- **Configuration**: Metadata like the prototype name or component role.
- **Parameters and API**: Developer-facing or designer-facing props and callbacks.

## Relationship Between Prototypes and Components

In Proto UI, the design principle is:  
`Adapter(Prototype) => Component`.

A component is the framework-specific rendering of a Prototype. The Prototype defines the essential behavior that _every_ framework must implement, acting as the behavioral source of truth.

Prototypes often have finer granularity than components. For example, a dropdown component is usually seen as a single unit, but in Proto UI it's broken down into prototypes like `select`, `select-option`, `select-trigger`, `select-content`, `select-value`, and `select-indicator`. Each interactive element becomes an independent Prototype. This fine-grained separation boosts modularity, reusability, and recomposability.

## Design System Prototypes

Proto UI offers both Headless prototypes and styled, design-system-specific variants that match official APIs.

For example:

- We provide a `ProtoButton` and an `asButton` behavior function that can turn any Prototype into a button-like behavior unit.
- Based on `asButton`, we implement `MaterialButtonPrototype`, `ShadcnButtonPrototype`, etc., which match the visual style and APIs of those ecosystems—but are powered by our own behavior modeling system.
- You can use `QtAdapter + MaterialButtonPrototype` to get a Material-styled native Qt component, or `SolidAdapter + ShadcnButtonPrototype` to get a Solid-native Shadcn-like button.

In short: **Design Systems × Platform Adapters** is a composable matrix in Proto UI, enabling true cross-platform and cross-style development.

## Writing Prototypes

Prototypes are currently written in TypeScript. JavaScript-only platforms must compile the prototype into a framework-specific component at build time, as runtime support is limited. In the web ecosystem, both runtime and compile-time strategies are supported.

The hardest part of writing a Prototype is the `setup` function, which resembles Vue 3's `setup` in form but differs significantly in concept and purpose. The next article will cover `setup` in detail.

---

## How to Contribute (to this part)

This document introduces the concept and structure of Prototypes in Proto UI. If you're interested in building reusable, cross-platform interaction models—we'd love your help.

Right now, we're actively looking for contributors to help expand our prototype libraries across different design systems. Rebuilding each component from scratch is a massive task.

👉 You can track which Prototypes are currently missing or incomplete by checking the diff against official component libraries:  
[Component Prototype Coverage (Diff View)](https://github.com/xxx)

Feel free to pick a component, create a new Prototype, improve an existing one, or open a discussion. Every contribution helps move the system forward.
