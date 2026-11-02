# 1111号个人求职网站

当前版本：`v0.5`（长期维护起点）

面向游戏与内容岗位招聘者的零依赖静态作品集。包含顶部标签式主页、6 个项目详情、创作与社群实践、简历下载与联系方式。

视觉采用浅蓝线稿与“职业养成游戏”概念：顶部固定标签切换角色、项目、演示、成长、创作和联系，
首页包含职业成长地图与核心循环拼装台。所有界面图形与动效均由 HTML、CSS 和 JavaScript
实现，不依赖外部作品集模板或未授权素材。

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
- 项目详情数据与交互：`site/js/app.js`
- 简历：`site/assets/1111号_游戏策划简历.pdf`
- 演示视频：`site/assets/system-demo.mp4`
- 简历 HTML 源文件：`sources/resume-print.html`
- 内容采集表：`outputs/个人网站内容采集表.xlsx`

页面未公开手机号和住址，不包含内部数据或未授权素材。
