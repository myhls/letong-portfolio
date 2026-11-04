import { readFile, readdir, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = resolve(root, "content/journal/manifest.json");
const outputRoot = resolve(root, "site/journal");

function fail(message) {
  throw new Error(`[journal] ${message}`);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeUrl(value) {
  const url = String(value).trim();
  if (/^(https?:|mailto:|#)/i.test(url) || /^[./]/.test(url)) {
    return escapeHtml(url);
  }
  return "#";
}

function inlineMarkdown(value) {
  let output = escapeHtml(value);
  output = output.replace(/`([^`]+)`/g, "<code>$1</code>");
  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  output = output.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, label, href) =>
      `<a href="${sanitizeUrl(href)}" rel="noreferrer">${label}</a>`
  );
  return output;
}

function stripMarkdown(value) {
  return String(value)
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

function slugifyHeading(value, fallback) {
  const slug = stripMarkdown(value)
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function renderTable(lines) {
  const cells = (line) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  const headers = cells(lines[0]);
  const rows = lines.slice(2).map(cells);
  return `
<div class="article-table-wrap">
  <table>
    <thead>
      <tr>${headers.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr>
    </thead>
    <tbody>
      ${rows
        .map(
          (row) =>
            `<tr>${headers
              .map((_, index) => `<td>${inlineMarkdown(row[index] || "")}</td>`)
              .join("")}</tr>`
        )
        .join("\n      ")}
    </tbody>
  </table>
</div>`.trim();
}

function markdownToHtml(markdown) {
  const source = markdown.replace(/<!--[\s\S]*?-->/g, "");
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const output = [];
  const usedHeadingIds = new Set();

  for (let index = 0; index < lines.length; ) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const codeLines = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      assert(index < lines.length, "Markdown 代码块缺少结束标记");
      index += 1;
      output.push(
        `<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ""}>${escapeHtml(
          codeLines.join("\n")
        )}</code></pre>`
      );
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      const baseId = slugifyHeading(text, `section-${index + 1}`);
      let headingId = baseId;
      let suffix = 2;
      while (usedHeadingIds.has(headingId)) {
        headingId = `${baseId}-${suffix}`;
        suffix += 1;
      }
      usedHeadingIds.add(headingId);
      output.push(`<h${level} id="${headingId}">${inlineMarkdown(text)}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^---+$/.test(line)) {
      output.push("<hr>");
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quoteLines = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      output.push(
        `<blockquote><p>${quoteLines.map(inlineMarkdown).join("<br>")}</p></blockquote>`
      );
      continue;
    }

    if (
      line.startsWith("|") &&
      index + 1 < lines.length &&
      /^\|?(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(lines[index + 1].trim())
    ) {
      const tableLines = [lines[index], lines[index + 1]];
      index += 2;
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      output.push(renderTable(tableLines));
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      const items = [];
      while (index < lines.length) {
        const match = lines[index].trim().match(/^[-*]\s+(.+)$/);
        if (!match) break;
        items.push(match[1]);
        index += 1;
      }
      output.push(`<ul>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      continue;
    }

    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      const items = [];
      while (index < lines.length) {
        const match = lines[index].trim().match(/^\d+\.\s+(.+)$/);
        if (!match) break;
        items.push(match[1]);
        index += 1;
      }
      output.push(`<ol>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ol>`);
      continue;
    }

    const paragraph = [];
    while (index < lines.length) {
      const candidate = lines[index].trim();
      if (
        !candidate ||
        /^#{2,4}\s+/.test(candidate) ||
        candidate.startsWith(">") ||
        candidate.startsWith("```") ||
        candidate.startsWith("|") ||
        /^[-*]\s+/.test(candidate) ||
        /^\d+\.\s+/.test(candidate) ||
        /^---+$/.test(candidate)
      ) {
        break;
      }
      paragraph.push(candidate);
      index += 1;
    }
    output.push(`<p>${paragraph.map(inlineMarkdown).join("<br>")}</p>`);
  }

  return output.join("\n");
}

function articleOutputPath(article) {
  return resolve(outputRoot, article.category, `${article.slug}.html`);
}

async function listFilesRecursive(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursive(entryPath)));
    } else {
      files.push(entryPath);
    }
  }
  return files;
}

function validateImage(article, image, fieldName) {
  assert(image && typeof image === "object", `${article.id}: ${fieldName} 必须是对象或 null`);
  for (const field of ["src", "alt", "caption", "source", "credit", "license"]) {
    assert(
      typeof image[field] === "string" && image[field].trim(),
      `${article.id}: ${fieldName}.${field} 不能为空`
    );
  }

  assert(!/^https?:/i.test(image.src), `${article.id}: 图片必须本地托管，不能热链`);
  const articlePage = articleOutputPath(article);
  const imagePath = resolve(dirname(articlePage), image.src);
  assert(
    imagePath.startsWith(resolve(root, "site") + sep),
    `${article.id}: 图片路径必须位于 site/ 内`
  );
  assert(existsSync(imagePath), `${article.id}: 图片不存在 ${relative(root, imagePath)}`);
}

function validateManifest(manifest) {
  assert(manifest.schemaVersion === 1, "不支持的 manifest schemaVersion");
  assert(Array.isArray(manifest.categories) && manifest.categories.length, "缺少专题定义");
  assert(Array.isArray(manifest.articles), "缺少 articles 数组");

  const categoryIds = new Set();
  for (const category of manifest.categories) {
    assert(category.id && !categoryIds.has(category.id), `专题 id 重复或为空: ${category.id}`);
    categoryIds.add(category.id);
  }

  const articleIds = new Set();
  const articleSlugsByCategory = new Set();
  for (const article of manifest.articles) {
    assert(article.id && !articleIds.has(article.id), `文章 id 重复或为空: ${article.id}`);
    articleIds.add(article.id);
    assert(article.slug && /^[a-z0-9-]+$/.test(article.slug), `${article.id}: slug 不合法`);
    assert(categoryIds.has(article.category), `${article.id}: 未知专题 ${article.category}`);
    if (article.date !== null) {
      assert(/^\d{4}-\d{2}-\d{2}$/.test(article.date), `${article.id}: 日期格式错误`);
    }
    assert(
      Object.hasOwn(manifest.statusValues, article.status),
      `${article.id}: 未知状态 ${article.status}`
    );

    const pathKey = `${article.category}/${article.slug}`;
    assert(!articleSlugsByCategory.has(pathKey), `${article.id}: 文章输出路径重复`);
    articleSlugsByCategory.add(pathKey);

    if (["draft", "review", "published"].includes(article.status)) {
      assert(article.date, `${article.id}: 已开始的文章必须有日期`);
      const contentPath = resolve(root, article.contentFile);
      assert(contentPath.startsWith(resolve(root, "content") + sep), `${article.id}: 正文路径不合法`);
      assert(existsSync(contentPath), `${article.id}: 正文不存在 ${article.contentFile}`);
    }

    if (article.cover !== null) validateImage(article, article.cover, "cover");
    article.images.forEach((image, index) =>
      validateImage(article, image, `images[${index}]`)
    );
  }

  for (const category of manifest.categories) {
    const total = manifest.articles.filter((article) => article.category === category.id).length;
    assert(
      total === category.expectedArticleCount,
      `${category.id}: 预期 ${category.expectedArticleCount} 篇，实际 ${total} 篇`
    );
  }
}

function pageShell({ title, description, depth, content }) {
  const rootPrefix = "../".repeat(depth);
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="theme-color" content="#e6f9fd" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="article" />
    <title>${escapeHtml(title)}</title>
    <link rel="icon" href="${rootPrefix}assets/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="${rootPrefix}css/journal.css?v=0.6.1" />
  </head>
  <body>
    <header class="journal-header">
      <div class="journal-header-inner">
        <a class="journal-brand" href="${rootPrefix}index.html#home" aria-label="1111号个人主页">
          <span class="journal-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48">
              <path d="M10 31c-4 0-6-3-5-7 1-3 4-5 7-4 1-6 6-10 12-9 6 1 9 5 9 10 4 0 7 3 7 6 0 4-3 6-7 6H10Z" />
              <path d="M17 35h16" />
            </svg>
          </span>
          <span>
            <strong>1111号</strong>
            <small>GAME DESIGN JOURNAL</small>
          </span>
        </a>
        <nav class="journal-nav" aria-label="Journal 导航">
          <a href="${rootPrefix}index.html#about">成长档案</a>
          <a href="${rootPrefix}journal/index.html">观察日记</a>
        </nav>
      </div>
    </header>
    ${content}
    <footer class="journal-footer">
      <span>1111号 · Game Design Journal</span>
      <a href="${rootPrefix}index.html#about">返回成长档案</a>
    </footer>
  </body>
</html>
`;
}

function categoryName(manifest, id) {
  return manifest.categories.find((category) => category.id === id)?.title || id;
}

function renderArticleCard(article) {
  return `<article class="journal-card">
    <div class="journal-card-meta">
      <span>${escapeHtml(article.date)}</span>
      <span>${escapeHtml(article.tags[0] || "游戏策划")}</span>
    </div>
    <h3><a href="${escapeHtml(article.category)}/${escapeHtml(article.slug)}.html">${escapeHtml(
      article.title
    )}</a></h3>
    <p>${escapeHtml(article.summary)}</p>
    <div class="journal-card-footer">
      <div class="journal-tags">${article.tags
        .slice(0, 3)
        .map((tag) => `<span>${escapeHtml(tag)}</span>`)
        .join("")}</div>
      <a class="journal-read-link" href="${escapeHtml(article.category)}/${escapeHtml(
        article.slug
      )}.html">阅读全文 <span>→</span></a>
    </div>
  </article>`;
}

function renderIndex(manifest) {
  const published = manifest.articles
    .filter((article) => article.status === "published")
    .sort((a, b) => b.date.localeCompare(a.date));
  const latest = published[0];
  const categories = [...manifest.categories].sort((a, b) => a.order - b.order);

  const categorySections = categories
    .map((category) => {
      const all = manifest.articles.filter((article) => article.category === category.id);
      const visible = published.filter((article) => article.category === category.id);
      return `<section class="journal-topic" id="${escapeHtml(category.id)}">
        <div class="topic-heading">
          <div>
            <p>${escapeHtml(category.englishTitle)} / ${String(category.order).padStart(2, "0")}</p>
            <h2>${escapeHtml(category.title)}</h2>
          </div>
          <div class="topic-count">
            <strong>${visible.length}</strong>
            <span>/ ${all.length} 篇已发布</span>
          </div>
        </div>
        <p class="topic-summary">${escapeHtml(category.summary)}</p>
        ${
          visible.length
            ? `<div class="journal-card-list">${visible.map(renderArticleCard).join("")}</div>`
            : `<p class="topic-empty">内容整理中，完成学习记录后会更新到这里。</p>`
        }
      </section>`;
    })
    .join("");

  const content = `<main class="journal-main">
    <section class="journal-hero">
      <div class="journal-hero-copy">
        <p class="journal-kicker">GAME DESIGN JOURNAL / ${String(published.length).padStart(
          2,
          "0"
        )} PUBLISHED</p>
        <h1>游戏策划<br>观察日记</h1>
        <p>保留真实问题、初始判断、反例和修正过程。这里记录的是我如何逐步形成设计判断，而不是把知识整理成没有过程的答案。</p>
      </div>
      <aside class="journal-hero-note">
        <span>LATEST UPDATE</span>
        <strong>${latest ? escapeHtml(latest.date) : "等待更新"}</strong>
        <p>${latest ? escapeHtml(latest.title) : "第一篇学习记录正在整理。"}</p>
        <small>${categories.length} 个专题 / ${categories.reduce(
          (sum, category) =>
            sum + manifest.articles.filter((article) => article.category === category.id).length,
          0
        )} 篇内容规划中</small>
      </aside>
    </section>
    <div class="journal-topics">${categorySections}</div>
  </main>`;

  const html = pageShell({
    title: "游戏策划观察日记｜1111号",
    description: "记录游戏策划学习中的问题、判断、反例、修正与设计结论。",
    depth: 1,
    content
  });
  return { html, published };
}

function renderArticlePage(manifest, article, bodyHtml) {
  const category = categoryName(manifest, article.category);
  const day = article.id.match(/day-(\d+)/i)?.[1] || "01";
  const tags = article.tags
    .map((tag) => `<span>${escapeHtml(tag)}</span>`)
    .join("");

  const content = `<main class="article-main">
    <nav class="article-breadcrumb" aria-label="面包屑">
      <a href="../index.html">观察日记</a>
      <span>/</span>
      <a href="../index.html#${escapeHtml(article.category)}">${escapeHtml(category)}</a>
    </nav>
    <header class="article-hero">
      <p class="journal-kicker">${escapeHtml(
        manifest.categories.find((item) => item.id === article.category)?.englishTitle || ""
      )} / DAY ${escapeHtml(day)}</p>
      <h1>${escapeHtml(article.title)}</h1>
      <p class="article-summary">${escapeHtml(article.summary)}</p>
      <div class="article-meta">
        <span>${escapeHtml(article.date)}</span>
        <span>${escapeHtml(category)}</span>
        <span>约 ${Math.max(1, Math.ceil(bodyHtml.replace(/<[^>]+>/g, "").length / 500))} 分钟阅读</span>
      </div>
      <div class="journal-tags">${tags}</div>
    </header>
    <div class="article-layout">
      <article class="article-content">${bodyHtml}</article>
      <aside class="article-aside">
        <span>ARTICLE FILE</span>
        <dl>
          <div><dt>专题</dt><dd>${escapeHtml(category)}</dd></div>
          <div><dt>首次整理</dt><dd>${escapeHtml(article.date)}</dd></div>
          <div><dt>最近更新</dt><dd>${escapeHtml(article.updatedAt || article.date)}</dd></div>
        </dl>
        <a href="../index.html">返回 Journal</a>
      </aside>
    </div>
  </main>`;

  const html = pageShell({
    title: `${article.title}｜1111号`,
    description: article.summary,
    depth: 2,
    content
  });
  return html;
}

async function main() {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  validateManifest(manifest);

  const renderedArticles = [];
  for (const article of manifest.articles) {
    if (article.status !== "published") continue;
    const markdown = await readFile(resolve(root, article.contentFile), "utf8");
    const body = markdown.replace(/<!--[\s\S]*?-->/g, "").trim();
    assert(body, `${article.id}: 已发布文章正文为空`);
    renderedArticles.push({
      article,
      markdown,
      html: renderArticlePage(manifest, article, markdownToHtml(markdown))
    });
  }

  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });

  const index = renderIndex(manifest);
  await writeFile(resolve(outputRoot, "index.html"), index.html, "utf8");

  for (const rendered of renderedArticles) {
    const outputPath = articleOutputPath(rendered.article);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, rendered.html, "utf8");
  }

  const generatedRelative = [
    "site/journal/index.html",
    ...renderedArticles.map(({ article }) =>
      relative(root, articleOutputPath(article)).replaceAll("\\", "/")
    )
  ].sort();

  const unexpected = (await listFilesRecursive(outputRoot))
    .filter((entry) => extname(entry) === ".html")
    .map((entry) => relative(root, entry).replaceAll("\\", "/"))
    .sort();
  assert(JSON.stringify(generatedRelative) === JSON.stringify(unexpected), "Journal 输出目录存在未预期文件");

  console.log(
    JSON.stringify(
      {
        validatedArticles: manifest.articles.length,
        publishedArticles: renderedArticles.length,
        generatedFiles: generatedRelative,
        status: "ok"
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
