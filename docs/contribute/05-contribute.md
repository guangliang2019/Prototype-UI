# 贡献指南 & 项目现状

## 近期重点

### TODO

- [x] 旧内核以及比旧内核还旧的原型，需要迁移到新内核
- [ ] 原型需要拓展

  - [x] Button
  - [x] Switch
  - [ ] Radio
  - [ ] Checkbox
  - [ ] Input
  - [x] Select
  - [ ] Slider
  - [ ] Rate
  - [ ] Progress
  - [ ] Badge
  - [ ] Tooltip
  - [ ] Popover
  - [ ] Dialog
  - [ ] Drawer
  - [ ] Menu
  - [ ] SubMenu
  - [ ] Dropdown
  - [x] Tabs
  - [ ] Breadcrumb
  - [ ] Pagination
  - [ ] Steps
  - [ ] Upload
  - [ ] Transfer
  - [ ] Table
  - [ ] Tree
  - [ ] Carousel
  - [ ] Collapse
  - [ ] Timeline
  - [ ] Calendar

- [ ] 适配器库开发

  - [ ] JS
  - [x] WebComponent
  - [ ] Vue2
  - [ ] Vue3
  - [ ] React
  - [ ] Angular
  - [ ] Svelte
  - [ ] SolidJS
  - [ ] Preact
  - [ ] MiniProgram

  - [ ] Flutter
  - [ ] Qt
  - [ ] Unity
  - [ ] Cocos

- [ ] Shadcn UI 主题原型
  - [x] Button
  - [ ] Input
  - [x] Select
  - [x] Checkbox
  - [ ] Radio
  - [x] Switch
  - [ ] Slider
  - [ ] Rate
  - [ ] Progress
  - [ ] Badge
  - [ ] Tooltip
  - [ ] Popover
  - [ ] Dialog
  - [ ] Drawer
  - [ ] Menu
  - [ ] SubMenu
  - [ ] Dropdown
  - [x] Tabs
  - [ ] Breadcrumb
  - [ ] Pagination
  - [ ] Steps
  - [ ] Upload
  - [ ] Transfer
  - [ ] Table
  - [ ] Tree
  - [ ] Carousel
  - [ ] Collapse
  - [ ] Timeline
  - [ ] Calendar

### next-core 重构计划

- 已完成测试的模块：
  - props
  - state
  - attribute
- 正在进行中的模块：
  - 现存 prototype 的 next-core 重构
- 基础组件 prototype 拓展中

## 核心模块状态

### 内核

- 新内核：接近稳定
- 旧内核：稳定可用

### 适配器库

- WebComponent：旧内核适配器完成，新内核调试中
- 其他适配器：未开发，技术验证已完成

### 原型库

- 基础组件：10-20个（目标50个）
- 主题支持：
  - Shadcn 主题
  - 标准无样式主题
- 图标库：完整支持 lucide 项目图标（原型方式提供）

### 命令行工具

- 开发进度：50%
- 当前状态：暂时搁置
- 优先级：文档站优先（自举验证必经之路）

### 文档站

- 基础功能：准备完毕（完全自举）
- 下一步：开发可视化调试工具/Playground（类似 Storybook）

## 项目评价

目前项目仍处于早期阶段，像一块"位置不错的荒地"。虽然基础设施正在建设中，但仍有大量工作待完成。

### 参与机会

欢迎参与以下方向的工作：

- 拓展原型库
- 丰富主题库
- 拓展适配器库（需等待内核重构完成）
- 建设 CLI
- 建设 Playground
- 协助重构内核

### 贡献激励

- 现金奖励：根据 PR 复杂度支付（例如：完整 select 组件原型可获得 500 CNY）
- Contributor 计划：
  - 独立社群服务
  - 作者设计 T 恤
