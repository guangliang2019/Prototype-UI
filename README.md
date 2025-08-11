# Proto UI

**One UI Protocol. Any Platform.**  
Decouple interaction logic from visual design, enabling any design system and any tech stack to interoperate, combine, and progressively enhance.

[English](README.md) | [简体中文](README.zh-CN.md)

---

## Why We Believe This Will Work

Proto UI is not a paper concept — it’s distilled from real-world production experience.  
In my previous role, I spent two years building an enterprise-grade design system and component library across **Flutter, Swift, Kotlin, Vue2, Vue3, React, and WeChat Mini Programs**.

All platforms ran on a unified programming paradigm, achieving:

- Consistent interaction logic across multiple platforms
- Decoupling of visual design and interaction behavior
- Progressive capability enhancement (accessibility, platform-specific features, interaction replacements)

Proto UI abstracts this practice into a universal modeling method and formalizes it as a protocol:

> **Prototype → Adapter → Component → Host Runtime**  
> This allows any tech stack to reuse the same interaction logic and composition patterns.

---

## What We Have Completed

✅ **Web Component adapter & compiler**  
✅ **Headless UI prototypes** (Button / Menu / Dialog, etc.)  
✅ **Shadcn UI prototypes** (partially complete)  
✅ Core protocol APIs: `p.event` / `p.state` / `p.context` / `p.lifecycle` / `p.props`  
✅ Automatic event lifecycle management & `asHook` conflict warnings

---

## What We’re Building Next

- **Cross-platform adapters**: Qt / Flutter / React Native / Web
- **Cross-design-system composition**: mix Material + Fluent freely
- **Cross-technology bridging**: mix React components and Web Components with a semantic bridge beyond `postMessage`
- **Progressive enhancement**: accessibility mode, child/elder-friendly modes, swappable interaction logic

**Once implemented in the protocol core, these capabilities will automatically be available to all prototyped component libraries — no rewrites required.**

---

## Why Join Now

- The protocol core is already stable; future adapter work will rarely need refactoring
- Early contributors can directly influence core APIs and specifications
- Any adapter or prototype you connect will automatically benefit from all future protocol enhancements

---

## How to Contribute

1. **Explore the protocol chain**  
   Clone this repo, run `examples/`, and see how a Prototype runs on a host platform through an Adapter.
2. **Build an adapter**  
   Follow the [Adapter Development Guide](link-to-doc) to support your preferred platform or framework.
3. **Contribute a prototype**  
   Abstract common interaction patterns into Prototypes that can serve any platform.
4. **Propose ideas**  
   Discuss cross-platform interaction patterns, progressive enhancement capabilities, and protocol extensions.

---

## Links

- [Documentation site](link-to-doc-site) (full overview & guides)
- [Issue tracker](link-to-issues) (adapter tasks & core API discussions)
- Community chat (Discord / QQ / Slack)

---

> **Note**  
> Proto UI is in an early stage — its core feasibility is already validated, and we are building out more adapter chains.  
> We welcome all discussions, adapters, and prototype contributions for cross-technology UI protocols.
