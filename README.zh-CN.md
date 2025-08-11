# Proto UI

**One UI Protocol. Any Platform.**  
让交互逻辑和外观与技术实现解耦，让任何设计体系、任何技术栈的组件互通、可组合、可渐进增强。

[English](README.md) | [简体中文](README.zh-CN.md)

---

## 为什么我们相信这条路能走通

Proto UI 不是纸上构想，而是来自真实生产的范式提炼。  
在我的上一份工作中，我花了两年时间，为一家企业打造了跨 **Flutter、Swift、Kotlin、Vue2、Vue3、React、微信小程序** 的企业级设计规范与组件库。

所有平台全部使用统一的编程范式运行，实现了：

- 多端一致的交互逻辑
- 视觉与交互的解耦
- 渐进式能力增强（无障碍优化、平台特化、交互替换）

Proto UI 就是将这种实践抽象为一种通用建模方法，并固化为协议：

> **Prototype → Adapter → Component → 宿主运行**  
> 这样，任何技术栈都可以复用相同的交互逻辑与组合模式。

---

## 我们已经完成的

✅ **Web Component 适配器 & 编译器**  
✅ **Headless UI 原型**（Button / Menu / Dialog 等）  
✅ **Shadcn UI 原型**（部分完成）  
✅ 核心协议 API：`p.event` / `p.state` / `p.context` / `p.lifecycle` / `p.props`  
✅ 事件生命周期自动管理 & `asHook` 冲突预警

---

## 我们正在构建的

- **跨平台适配**：Qt / Flutter / React Native / Web
- **跨设计体系组合**：Material + Fluent 混用
- **跨技术桥接**：React 组件与 Web Component 混用，比 postMessage 更语义化
- **渐进增强能力**：无障碍模式、儿童模式、老年人模式、可替换交互逻辑

**一旦协议核心实现，这些能力将自动分发给所有已原型化的组件库，无需重写。**

---

## 为什么现在加入

- 协议骨架已稳定，适配工作未来几乎无需重构
- 第一批参与者将直接影响核心 API 与规范
- 你的适配器 / 原型一旦接入，将自动获得未来所有协议增强

---

## 如何参与

1. **体验协议链路**  
   克隆本仓库，运行 `examples/`，看看 Prototype 如何通过 Adapter 运行在宿主平台。
2. **编写适配器**  
   按 [Adapter 开发指南](link-to-doc) 创建一个适配器，支持你常用的平台或框架。
3. **贡献原型**  
   将常用交互模式抽象成 Prototype，让它能服务任意平台。
4. **提出提案**  
   讨论跨平台交互模式、渐进增强能力等协议扩展。

---

## 链接

- [文档站](link-to-doc-site)（功能全景 & 教程）
- [Issue 列表](link-to-issues)（适配任务 & 核心 API 讨论）
- 社区群聊链接（Discord / QQ / Slack）

---

> **声明**  
> Proto UI 目前处于早期阶段，已验证核心可行性，正在铺设更多适配链路。  
> 我们欢迎一切关于跨技术 UI 协议的讨论、适配、原型贡献。
