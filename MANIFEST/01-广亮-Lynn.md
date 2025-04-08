# 创作动机 | Motivation

Q「如果已经有太多项目，比 Prototype UI 做的更好；如果根本就没人会用这套方案」Q「如果这一切都没有意义，那么为什么要坚持？」A「因为我“想”这么做」

> Q: “What if too many projects already do better than Prototype UI? Q: “What if no one ever uses it? What if none of this means anything?”  
> A: “Because I _want_ to do it.”

现实来说，如果苦学多年的画师，有了自己独特的画风，却看到 AI 仿照他的画风画的比他还像他，画师该摔家伙走人吗？  
我觉得正式这样的考验，让创作本身的意义得以凸显，让我们能有机会直面自己身为创作者的本心。

> Imagine a painter who has spent years developing a unique style, only to see AI replicate it in seconds — sometimes better than they can.  
> Should the painter give up and walk away?  
> I believe it's precisely these moments that force us to confront the real meaning of creation —  
> where we return to the core of ourselves as creators.

Prototype UI 是一副作品，就像是孩子的涂鸦，它为什么非要有意义呢？  
即使没有任何人帮助我，我也会乐此不疲地完成它。  
我不需要理由，创作本身的快乐足以支撑我坚持完成它，而且我会让其尽可能地“有用”，因为这也是 Prototype UI 设计哲学的一环。

> Prototype UI is a work — like a child's drawing. Why must it be "meaningful"?  
> Even if no one helps me, I will joyfully complete it.  
> I need no justification — the joy of creating is enough.  
> And I will strive to make it _useful_, because utility is also part of the Prototype UI philosophy.

---

# 设计哲学 | Design Philosophy

## 简要总结 | Summary

- 交互本质由人类生理特质与设备媒介决定，故长期不变  
  → 所以项目将纯粹的 HCI 提取成描述文件
- 实现生态分层，每层可独立拓展，定制成本不高
- 产物不是“框架”或“库”，是一堆可复制、粘贴、按需修改的“代码”

> - Interaction is shaped by human physiology and device interfaces — thus it changes slowly over time.  
>   → So Prototype UI extracts pure HCI logic into declarative files.
> - The system is layered: each layer can be extended independently at low cost.
> - This is not a “framework” or a “library” — it’s a set of modifiable, copy-paste-friendly _code_.

---

## 正文 | Full Explanation

像前文所说，Prototype UI 只是自娱自乐吗？真的没有用吗？  
如果世界上有另一个我提前完成了这个项目，那或许就真的没“用”了，我肯定也会推荐大家去用其他实现更好的方案。

> As mentioned, is Prototype UI just a self-indulgent project? Is it truly useless?  
> If another version of me had already finished this project and done it better —  
> I’d have no problem recommending their version instead.

但我还未找到与 Prototype UI 定位完全重合的项目。

> But I haven’t found a project that aligns completely with the vision of Prototype UI.

Prototype UI 的底层哲学是让交互变得纯粹：

> The core philosophy of Prototype UI is to make **interaction pure**:

- 人类长期内还需要依赖视觉、听觉、触觉
- 交互的媒介长期内还会是键鼠、触屏、阅读器、VR/AR、脑机接口等方式

> - Humans will rely on vision, sound, and touch for the foreseeable future.
> - Our interaction methods will remain — keyboards, touch, screen readers, VR/AR, neural input, etc.

可以发现，交互的本质长期不变；  
而设备、OS、APP 的实现方式总在变。我们已经写了太多遍 Button 与 CheckBox，但它们的交互本质并无不同。

> So while the essence of interaction doesn’t change,  
> our devices, OSes, and app frameworks constantly do.  
> We’ve written the same Button and CheckBox a hundred times, though their behavior rarely differs.

因此，Prototype UI 提出了三段式架构：

> Hence, Prototype UI proposes a **three-stage architecture**:

交互原型 Prototype  
→ 技术适配 Adapter  
→ 渲染组件 Component

> Prototype (pure interaction model)  
> → Adapter (translates to implementation)  
> → Component (framework-native/platform-native rendering instance)

- Prototype：平台无关的交互描述，可扩展、可运行
- Adapter：高度模块化、可重组，用于翻译 Prototype 为原生组件
- Component：不属于项目关注范围，由 Adapter 产出并交由技术栈处理

> - **Prototype** is the abstract interaction contract — extensible and executable, but framework-agnostic.
> - **Adapter** is a modular, recomposable layer that translates prototypes into actual component logic.
> - **Component** is the byproduct — rendering is delegated to the target tech stack.

由此，项目形成了天然的生态分层：

> This naturally creates an ecosystem-wide layering:

- **设计师**只关注 Prototype（交互）；DSL 简单、可修改，逻辑表达力强
- **开发者**聚焦 Adapter 定制，一次性工作即可服务多个平台
- **业务方**直接使用 Component，可集成至 CI/CD，全平台一致性由设计部门主导

> - Designers focus on _Prototypes_. The DSL is approachable and expressive enough to define logic directly.
> - Developers maintain _Adapters_, a one-time effort that supports multiple platforms.
> - Business teams consume generated _Components_, usable across platforms and pipelines, with consistency driven by design.

此外，Prototype UI 可实现 0 运行时开销；生成的组件代码具备良好可读性，任意过程都可以增删拓展。

> Moreover, it introduces zero runtime overhead.  
> The generated components are human-readable, and every part of the process is open to extension or replacement.

Prototype UI 不是框架，不是库，而是一个**组件生成方案**。默认方案开箱即用，但拓展权交给开发者。

> Prototype UI is not a framework. It is not a library.  
> It is a **generation strategy for component code** — ready to use by default, but fully open for modification.

---

# 项目发展 | Project Direction

从设计哲学可知，Prototype UI 不与框架竞争，而是与组件库竞争。

> By its nature, Prototype UI does not compete with frameworks — only with component libraries.

我将保留原组件库的签名与版权，免费提供 Prototype UI 的重构版本。  
使用体验与原版一致，但无障碍性和拓展性将显著增强。

> I will preserve original authorship and signatures of third-party libraries,  
> and offer open-source refactors based on Prototype UI.  
> User experience will remain identical, while accessibility and extensibility will be vastly improved.

这个过程可能不会太快，  
但有我在，Prototype UI 星火长燃，  
即使它错过了最佳发布时机也是如此。

> This will take time.  
> But as long as I’m here, Prototype UI will burn faint but steady —  
> even if it misses the “perfect” moment to be seen.
