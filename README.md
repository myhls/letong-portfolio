# 1111号个人求职网站

当前版本：`v0.8.0`（简洁版个人作品集）

面向游戏与内容岗位招聘者的零依赖静态作品集。包含顶部导航、6 个项目详情、成长档案、游戏策划观察日记、创作与社群实践、简历下载与联系方式。

视觉采用米白底、深海蓝文字和少量橙色强调。主页以大标题、真实项目画面和留白为主，
项目与日记页使用开放式排版和细线分隔，不再堆叠卡片。所有界面图形与基础动效均由
HTML、CSS 和 JavaScript 实现，不依赖外部作品集模板或未授权素材。

《魔女的怪物工坊》案例明确区分本人创意与 AI 执行部分。创作页展示角色社群企划与原创
视觉实践，并保留图片授权、合作署名和来源边界。

## 本地运行

需要 Node.js 18 或更高版本。

```powershell
node server.mjs
```

打开 `http://127.0.0.1:4173`。

也可以通过环境变量修改端口：

```powershell
$env:PORT=8080; node server.mjs
```

## 部署

`site/` 目录就是完整静态站点，可直接部署到 Vercel、Netlify、Cloudflare Pages、GitHub Pages 或任意静态服务器。

- Build command：留空
- Output / Publish directory：`site`

仓库已包含 GitHub Pages 自动部署工作流。仓库创建并启用 Pages 后，推送到 `main`
即可自动发布。详细步骤见 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)。

## 内容维护

- 页面结构：`site/index.html`
- 全局样式：`site/css/styles.css`
- 简洁版覆盖样式：`site/css/simple.css`
- 项目详情数据与交互：`site/js/app.js`
- 简历：`site/assets/1111号_游戏策划简历.pdf`
- 演示视频：`site/assets/system-demo.mp4`
- 简历 HTML 源文件：`sources/resume-print.html`
- 内容采集表：`outputs/个人网站内容采集表.xlsx`

## Game Design Journal

知识库源文件位于 `content/journal/`。文章元数据由 `manifest.json` 管理，正文使用
Markdown，生成器会输出独立静态页面到 `site/journal/`。日记页的简洁版覆盖样式位于
`site/css/simple-journal.css`。

```powershell
node scripts/build-journal.mjs
```

生成后访问 `http://127.0.0.1:4173/journal/` 进行预览。

页面未公开手机号和住址，不包含内部数据或未授权素材。
