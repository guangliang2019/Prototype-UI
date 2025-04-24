# The `setup` Function (Core of Prototype Definition)

In Proto UI, the `setup` function is the heart of every Prototype. You can think of it as the "body" of the Prototype, while other properties serve as auxiliary configuration.

Every Prototype must define a `setup` function. This function models the component's interaction behavior, internal state, lifecycle, and how it connects to the rendered view. It has two parts:

1. Function Body – defines behavior, state, and lifecycle.
2. Return Value – defines how the structure should be rendered.

---

## Basic Example

    const MyPrototype = definePrototype({
      name: 'my-prototype',
      setup: (p) => {
        p.event.on('click', () => p.debug.log('Hello, Proto UI!'));

        return (renderer) => renderer.createElement('div', {}, ['Click me!']);
      },
    });

---

## Function Body: Modeling the Full Behavior

The `setup` function runs before the component instance is created. The argument `p` provides access to all systems needed for modeling an interactive unit—including state, events, view, context, and more.

### Overview of the `PrototypeAPI` (`p`)

| Subsystem | Description                                          |
| --------- | ---------------------------------------------------- |
| props     | External props and change detection                  |
| state     | Internal state unit with finite-state semantics      |
| event     | User interaction binding/listening                   |
| lifecycle | Hooks into prototype lifecycle                       |
| context   | Communication across Prototypes                      |
| view      | Low-level control over rendering and native elements |
| role      | Semantic roles (e.g. trigger, content)               |
| debug     | Debugging tools (effective during development only)  |

These systems are loosely coupled and fully composable, allowing prototypes to remain self-contained yet easy to integrate.

---

## Return Value: The Render Function

The `setup` function returns a render function. This function receives a `renderer` and should return a tree of elements.

    return (renderer) => {
      const h = renderer.createElement;
      return h('div', {}, [
        h('span', { style: 'color:red' }, ['red text']),
        h('span', { style: 'color:blue' }, ['blue text']),
      ]);
    };

This structure will be wrapped inside the root node of the prototype:

    <my-prototype>
      <div>
        <span style="color:red">red text</span>
        <span style="color:blue">blue text</span>
      </div>
    </my-prototype>

---

## The Root Node

Every Prototype is anchored to a unique, immutable root node. All interaction bindings are scoped to this root. If a child element requires its own interactions, it should be promoted to a standalone Prototype and integrated via `context`.

---

## Rendering Mechanism and Design Philosophy

Proto UI does not provide a framework-like reactive rendering engine. Instead, rendering is split into two categories:

1. Interaction-driven updates (no re-render needed)  
   For example, `hover` states can be expressed via state + styles—no full redraw needed.

2. Data-driven updates (requires re-render)  
   For example, updating the selected item or changing a view explicitly—requires calling `p.view.update()` to trigger rendering.

This distinction helps maintain clear boundaries and improves performance predictability.

---

## Intended Use and Limitations

Proto UI’s Prototype system is not designed for building full business UIs or complete pages. Instead, it is optimized for highly cohesive, cross-platform interaction units.

We recommend:

- For heavy UI logic or complex data flow: use your preferred framework (React, Vue, Solid, etc.)
- For atomic, reusable, and framework-neutral interaction units: use Prototypes

Some capabilities are intentionally limited to preserve composability, predictability, and neutrality.

---

## Summary

The `setup` function is not a container for business logic. It is an entry point for modeling behavior-driven components.

Proto UI encourages developers to think in terms of interaction units—self-contained, semantically meaningful building blocks. While this requires stronger modeling skills, it enables powerful expressiveness, fine control, and broad platform compatibility.

---

## Contributor Notes: Help Us Build More Prototypes

The `setup` API is stable and fully supports behavior modeling and structural rendering through a VNode-style interface.

We're now working on:

- JSX/TSX template support via plugins (e.g. Babel/Vite)
- A domain-specific language (DSL) to abstract prototypes across languages (TypeScript → Swift, Dart, etc.)
- Visual devtools: state tracking, render graph inspection, debug overlays

---

## How to Contribute

This document explains the core of how Prototypes behave and render. As you can imagine—we need more Prototypes.

Each design system needs its components rebuilt from scratch. It’s a massive effort, and we need your help.

You can view the current prototype coverage and missing components here:  
[Prototype Coverage Diff](https://github.com/xxx)

Pick a component, explore the `setup` API, and help us expand the system!
