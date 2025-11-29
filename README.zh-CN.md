# fe-codebase-nuxt4

一个基于 Nuxt 4 的前端示例代码仓库，用于日常功能的模拟与演示。当前包含一个“答题流程优化”示例，重点展示客户端偷跑预加载、大列表处理、轻量过渡动画与防御性导航等实用模式。

## 为什么用它

- 快速搭建与验证常见交互，无需复杂项目骨架
- 评估用户体验流程：预加载、分步导航、过渡动画等
- 练习在内存中高效处理大规模数据（5,000 条）
- 复用基于 composable 的状态管理模式，便于扩展多个小示例

## 技术栈

- Nuxt 4（`nuxt@^4.2.1`）
- Vue 3（`vue@^3.5.24`）
- Vue Router（`vue-router@^4.6.3`）
- TypeScript

## 当前示例：答题流程优化

- 首页挂载即预加载题目，数据就绪后跳转到 `/quiz`（`app/pages/index.vue:51-58`，`app/pages/index.vue:76-80`）
- 答题页提供进度与顺滑过渡，无数据则进行防御性重定向（`app/pages/quiz.vue:48-51`，`app/pages/quiz.vue:54-58`）
- 使用 `useState` + `shallowRef` 共享大数组，避免深层响应式开销（`app/composables/useQuiz.ts:8-12`）
- 请求 Promise 级别缓存，避免重复发起（`app/composables/useQuiz.ts:13-23`）
- 仅在客户端用 `$fetch('/api/questions')`，保持 SSR 响应快速（`app/composables/useQuiz.ts:26-33`）
- 模拟 API：1.5 秒延迟后返回 5,000 条题目（`server/api/questions.get.ts:5-12`，`server/api/questions.get.ts:8-19`）

## 试用步骤

```bash
npm install
npm run dev
```

- 打开 `http://localhost:3000`
- 点击首页按钮开始测试；数据预加载完成后自动进入 `/quiz`

## 如何扩展新的示例

- 在 `app/pages` 下新增页面，承载你的交互流程
- 在 `app/composables` 下新增 composable 进行状态复用与请求缓存
- 如需数据，优先在 `server/api` 下新增模拟接口
- 非关键数据建议仅在客户端拉取，避免阻塞 SSR

## 脚本

- `dev`：启动开发服务
- `build`：生产构建
- `generate`：预渲染静态页面
- `preview`：本地预览生产构建
- `postinstall`：Nuxt 准备步骤

## 项目结构

- `app/pages/index.vue`：首页与预加载流程
- `app/pages/quiz.vue`：答题页与过渡动画
- `app/composables/useQuiz.ts`：共享题目状态与数据加载
- `server/api/questions.get.ts`：题目模拟 API
- `app/app.vue`：布局与全局页面切换样式
- `nuxt.config.ts`：配置（开启 DevTools）

## 注意事项

- 当前为模拟数据；可按需调整接口与数据结构
- 大数组建议使用 `shallowRef`，并尽量避免深层对象频繁变更

## 生产

```bash
npm run build
npm run preview
```
