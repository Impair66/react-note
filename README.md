# next-react-notes

基于 Next.js 15 (App Router) + React 19 的笔记应用，支持笔记的增删改查、Markdown 预览、搜索过滤和 Supabase 登录认证。

## 技术栈

- **框架**: Next.js 15 (App Router) + React 19
- **数据存储**: Redis (ioredis)
- **认证**: Supabase Auth
- **Markdown**: marked + sanitize-html
- **校验**: Zod
- **样式**: CSS Modules

## 功能

- 笔记列表（侧边栏）+ 预览与编辑页面 (`/note/[id]`)
- 搜索过滤笔记
- Markdown 实时预览
- Supabase 登录认证
- Server Actions 数据操作

## 环境变量

复制 `.env.local.example` 为 `.env.local` 并填入你的配置：

```
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥
SUPABASE_SERVICE_ROLE_KEY=你的Supabase服务密钥
REDIS_URL=redis://localhost:6379
```

## 开发

```bash
npm install
npm run dev
```

开发服务器默认端口 3000，打开 http://localhost:3000 查看。

## 项目结构

```
app/
  components/       # UI 组件
  note/             # 笔记详情与编辑路由
  login/            # 登录页面
  layout.js         # 根布局
  action.js         # Server Actions (保存/删除笔记)
  error.js          # 错误边界
  not-found.js      # 404 页面
lib/
  redis.js          # Redis 数据操作
  supabase/         # Supabase 客户端
```

## 部署

```bash
npm run build
npm start
```

部署到 Vercel 或其他支持 Next.js 的平台前，请确保配置好环境变量并启动 Redis 服务。
