# next-react-notes

这是一个基于 Next.js（App Router）的笔记示例应用，包含笔记列表、笔记预览与编辑、以及示例的 Supabase 登录集成（代码中包含示例/演示用途的片段，详见安全说明）。

本仓库在开发过程中已移除多语言 i18n 的自动路由逻辑（原先通过 middleware 在路径前添加 locale 前缀），目前项目以单一默认语言运行并保留了一些兼容 wrapper；同时为方便开发添加了部分 path alias（见下文）。

## 功能概览

- 笔记列表（侧边栏）+ 预览与编辑页面（`/note/[id]`）
- 简单的登录示例（位于 `app/login/page.js`，演示 Supabase auth 调用）
- 使用 Redis（lib/redis.js）作为笔记存储的示例（请按需启动/配置 Redis）

## 当前重要变更说明

- 已移除或中和项目中的 i18n 逻辑：
  - `middleware.js` 已被修改为 no-op（不再自动重写路径到 `/{locale}/...`）。
  - `app/i18n` 模块已变为占位实现以避免运行时报错。
  - `app/[lng]` 下的文件被保留为兼容 wrapper，但不再依赖自动 locale 重写。
- 导航及选中逻辑（侧边栏）已修复：侧边栏跳转现在使用标准路由 `/note/:id`，避免被早期的 i18n 重写导致 404。
- 添加/规范了项目路径别名（`jsconfig.json`）：
  - `@/components/*` -> `app/components/*` 等，便于统一导入路径。

这些变更目的是让路由和文件结构更简单、可预测，便于在单语言或准备重新实现 i18n 时进一步开发。

## 开发环境

需要 Node.js。建议使用与项目兼容的 Node 版本（按你本地环境配置）。

安装依赖并启动开发服务器：

```powershell
cd d:\exerciseCode\next-react-notes
npm install
npm run dev
# 如果你使用 pnpm/yarn：pnpm install; pnpm dev 或 yarn install; yarn dev
```

开发服务器默认端口为 3000，打开 http://localhost:3000 查看页面。

> 本项目使用 Next 15（package.json 中指定），默认 dev 命令使用 turbopack（如需回退到 webpack 可修改 scripts）。

## 环境变量与外部服务

项目中包含对 Supabase 与 Redis 的示例调用，请在开发或部署时设置相应的环境变量：

- SUPABASE_URL
- SUPABASE_ANON_KEY（或 SERVICE_KEY，取决于你如何在服务器端/客户端使用）
- REDIS_URL（或以你在 `lib/redis.js` 中要求的其他变量名）

注意：仓库中部分示例代码内可能包含**硬编码的演示凭据**（仅用于示例），请务必在实际环境中移除并使用环境变量或安全凭据存储。

## 代码组织（简要）

- `app/` - Next.js App Router 页面与布局
  - `components/` - UI 组件
  - `note/` - 笔记详情与编辑（动态路由 `note/[id]`）
  - `login/` - 登录页面示例
- `lib/` - 后端服务封装（如 Redis、Supabase 客户端）

## 进一步工作 / 建议

1. 如果你确定不再需要多语言支持，可以彻底删除 `app/i18n` 与 `app/[lng]` 目录，以及 package.json 中的相关 i18n 依赖（例如 `i18next`、`react-i18next` 等）。我可以代为执行并更新 lockfile。
2. 将示例登录中的任何硬编码凭据替换为真实的认证流程（表单 + 环境变量）。
3. 根据需要将路径导入统一替换为别名（`@/components/...`），保持代码风格一致性。

## 部署

该项目可以部署到 Vercel 或其他支持 Next.js 的平台。部署前请：

- 配置环境变量（Supabase、Redis、任何 Secrets）
- 如要启用生产优化，运行 `npm run build` 并使用 `next start` 启动

## 联系与贡献

PR 与 issue 都欢迎。如果你需要我继续：删除残留 i18n 代码、移除依赖并验证构建，我可以继续处理并提交变更。

---

更新于：2025-12-10
