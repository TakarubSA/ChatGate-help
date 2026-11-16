// Builds the help center into dist/: one page per Markdown file per language, a search index,
// a sitemap and a 404. No framework — just `marked` and this script.
//   node scripts/build.mjs           build once
//   node scripts/build.mjs --watch   rebuild when content/ or assets/ change
import { promises as fs, watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const site = JSON.parse(await fs.readFile(path.join(root, 'site.json'), 'utf8'));

const UI = {
  ar: {
    dir: 'rtl', name: 'مركز مساعدة ChatGate', short: 'المساعدة', search: 'ابحث في المساعدة…', onThisPage: 'في هذه الصفحة',
    prev: 'السابق', next: 'التالي', openPortal: 'افتح ChatGate', other: 'English', otherLang: 'en', home: 'الرئيسية',
    noResults: 'لا توجد نتائج', notFound: 'الصفحة غير موجودة', notFoundBody: 'ربما نُقلت هذه الصفحة. ابدأ من الرئيسية أو ابحث.',
    theme: 'تبديل المظهر', menu: 'القائمة', edited: 'آخر تحديث', helpful: 'لم تجد ما تبحث عنه؟ تواصل مع فريق الدعم من داخل ChatGate.',
    heroTitle: 'كيف نقدر نساعدك؟', heroBody: 'أدلة مختصرة لكل جزء من ChatGate: من ربط رقم واتساب إلى الحملات والبوتات والفوترة.',
  },
  en: {
    dir: 'ltr', name: 'ChatGate Help Center', short: 'Help', search: 'Search help…', onThisPage: 'On this page',
    prev: 'Previous', next: 'Next', openPortal: 'Open ChatGate', other: 'العربية', otherLang: 'ar', home: 'Home',
    noResults: 'No results', notFound: 'Page not found', notFoundBody: 'This page may have moved. Start from the home page or search.',
    theme: 'Toggle theme', menu: 'Menu', edited: 'Last updated', helpful: "Didn't find what you need? Contact support from inside ChatGate.",
    heroTitle: 'How can we help?', heroBody: 'Short guides for every part of ChatGate — from connecting a WhatsApp number to campaigns, bots and billing.',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Arabic-friendly ids: keep letters and digits of any script
const slugify = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-');

function parseFrontMatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: src };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { meta, body: src.slice(m[0].length) };
}

const CALLOUTS = { NOTE: 'note', TIP: 'tip', WARNING: 'warning', IMPORTANT: 'important' };
const CALLOUT_LABEL = {
  ar: { note: 'ملاحظة', tip: 'نصيحة', warning: 'تنبيه', important: 'مهم' },
  en: { note: 'Note', tip: 'Tip', warning: 'Warning', important: 'Important' },
};

function render(markdown, lang) {
  const toc = [];
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = slugify(text);
        if (depth === 2 || depth === 3) toc.push({ depth, id, text: text.replace(/<[^>]+>/g, '') });
        return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true">#</a>${text}</h${depth}>\n`;
      },
      blockquote({ tokens }) {
        const html = this.parser.parse(tokens);
        const m = html.match(/^<p>\[!(NOTE|TIP|WARNING|IMPORTANT)\]\s*/);
        if (!m) return `<blockquote>${html}</blockquote>\n`;
        const kind = CALLOUTS[m[1]];
        return `<div class="callout callout-${kind}"><p class="callout-title">${CALLOUT_LABEL[lang][kind]}</p><p>${html.slice(m[0].length)}</div>\n`;
      },
      table(token) {
        const head = token.header.map((c) => `<th>${this.parser.parseInline(c.tokens)}</th>`).join('');
        const rows = token.rows.map((r) => `<tr>${r.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join('')}</tr>`).join('');
        return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });
  return { html: marked.parse(markdown), toc };
}

const plain = (md) => md.replace(/```[\s\S]*?```/g, ' ').replace(/[#>*_`|\[\]()!-]/g, ' ').replace(/\s+/g, ' ').trim();

async function loadPages(lang) {
  const pages = [];
  for (const section of site.sections) {
    for (const slug of section.pages) {
      const file = path.join(root, 'content', lang, `${slug}.md`);
      const src = await fs.readFile(file, 'utf8').catch(() => null);
      if (!src) { console.warn(`missing: content/${lang}/${slug}.md`); continue; }
      const { meta, body } = parseFrontMatter(src);
      const { html, toc } = render(body, lang);
      const stat = await fs.stat(file);
      pages.push({ slug, section, title: meta.title ?? slug, description: meta.description ?? '', html, toc, body, updated: stat.mtime });
    }
  }
  return pages;
}

function layout({ lang, title, description, canonical, body, nav, toc = [], current = '' }) {
  const ui = UI[lang];
  const otherHref = `/${ui.otherLang}/${current ? `${current}/` : ''}`;
  return `<!doctype html>
<html lang="${lang}" dir="${ui.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${site.url}${canonical}">
<link rel="alternate" hreflang="${ui.otherLang}" href="${site.url}${otherHref}">
<link rel="icon" href="/assets/chatgate-icon.png">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${site.url}/assets/chatgate-mark.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
<script>try{var t=localStorage.getItem('cg-help-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
</head>
<body data-lang="${lang}">
<a class="skip" href="#content">${lang === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}</a>
<header class="topbar">
  <button class="icon-btn menu-btn" type="button" aria-label="${ui.menu}" aria-controls="sidebar" aria-expanded="false">☰</button>
  <a class="brand" href="/${lang}/"><img src="/assets/chatgate-mark.png" alt="" width="28" height="28"><span>ChatGate <b>${ui.short}</b></span></a>
  <div class="search">
    <input id="search" type="search" placeholder="${ui.search}" autocomplete="off" aria-label="${ui.search}">
    <kbd>/</kbd>
    <ul id="results" class="results" role="listbox" hidden></ul>
  </div>
  <nav class="top-actions">
    <a class="lang" href="${otherHref}" hreflang="${ui.otherLang}">${ui.other}</a>
    <button class="icon-btn theme-btn" type="button" aria-label="${ui.theme}">◐</button>
    <a class="portal" href="${site.portalUrl}">${ui.openPortal}</a>
  </nav>
</header>
<div class="shell">
  <aside id="sidebar" class="sidebar">${nav}</aside>
  <main id="content" class="content">${body}</main>
  ${toc.length ? `<aside class="toc"><p>${ui.onThisPage}</p><ul>${toc.map((h) => `<li class="d${h.depth}"><a href="#${h.id}">${esc(h.text)}</a></li>`).join('')}</ul></aside>` : '<aside class="toc"></aside>'}
</div>
<script>window.CG_HELP={lang:"${lang}",noResults:${JSON.stringify(ui.noResults)}}</script>
<script src="/assets/app.js" defer></script>
</body>
</html>
`;
}

function navHtml(lang, pages, current) {
  return site.sections.map((s) => {
    const items = pages.filter((p) => p.section.id === s.id)
      .map((p) => `<li><a href="/${lang}/${p.slug}/"${p.slug === current ? ' aria-current="page"' : ''}>${esc(p.title)}</a></li>`).join('');
    return `<div class="nav-group"><p>${esc(s.title[lang])}</p><ul>${items}</ul></div>`;
  }).join('');
}

async function write(file, content) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content);
}

async function build() {
  const started = Date.now();
  await fs.rm(dist, { recursive: true, force: true });
  await fs.cp(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true });
  const urls = [];

  for (const lang of site.languages) {
    const ui = UI[lang];
    const pages = await loadPages(lang);
    const index = [];

    for (const [i, p] of pages.entries()) {
      const prev = pages[i - 1];
      const next = pages[i + 1];
      const date = p.updated.toISOString().slice(0, 10);
      const body = `<nav class="crumbs"><a href="/${lang}/">${ui.home}</a><span>/</span><span>${esc(p.section.title[lang])}</span></nav>
<article class="doc"><h1>${esc(p.title)}</h1>${p.description ? `<p class="lead">${esc(p.description)}</p>` : ''}${p.html}</article>
<p class="helpful">${ui.helpful}</p>
<nav class="pager">${prev ? `<a class="prev" href="/${lang}/${prev.slug}/"><small>${ui.prev}</small>${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="next" href="/${lang}/${next.slug}/"><small>${ui.next}</small>${esc(next.title)}</a>` : '<span></span>'}</nav>
<p class="updated">${ui.edited}: <time datetime="${date}">${date}</time></p>`;
      await write(path.join(dist, lang, p.slug, 'index.html'), layout({
        lang, title: `${p.title} — ${ui.name}`, description: p.description, canonical: `/${lang}/${p.slug}/`,
        body, nav: navHtml(lang, pages, p.slug), toc: p.toc, current: p.slug,
      }));
      urls.push(`/${lang}/${p.slug}/`);
      // search: the page, plus each section heading with the text under it
      index.push({ t: p.title, s: p.section.title[lang], u: `/${lang}/${p.slug}/`, x: plain(p.description + ' ' + p.body).slice(0, 4000) });
      for (const h of p.toc.filter((h) => h.depth === 2)) {
        const part = p.body.split(/\n## /).find((chunk) => slugify(chunk.split('\n')[0]) === h.id) ?? '';
        index.push({ t: `${p.title} › ${h.text}`, s: p.section.title[lang], u: `/${lang}/${p.slug}/#${h.id}`, x: plain(part).slice(0, 1200) });
      }
    }

    // home: one card per section
    const cards = site.sections.map((s) => {
      const list = pages.filter((p) => p.section.id === s.id);
      return `<section class="card"><h2>${esc(s.title[lang])}</h2><ul>${list.map((p) => `<li><a href="/${lang}/${p.slug}/"><b>${esc(p.title)}</b><span>${esc(p.description)}</span></a></li>`).join('')}</ul></section>`;
    }).join('');
    const home = `<section class="hero"><h1>${ui.heroTitle}</h1><p>${ui.heroBody}</p><button class="hero-search" type="button">${ui.search}</button></section><div class="cards">${cards}</div>`;
    await write(path.join(dist, lang, 'index.html'), layout({ lang, title: ui.name, description: ui.heroBody, canonical: `/${lang}/`, body: home, nav: navHtml(lang, pages, '') }));
    urls.push(`/${lang}/`);
    await write(path.join(dist, lang, 'search.json'), JSON.stringify(index));

    if (lang === site.defaultLanguage) {
      await write(path.join(dist, '404.html'), layout({
        lang, title: `${ui.notFound} — ${ui.name}`, description: '', canonical: '/404.html',
        body: `<article class="doc"><h1>${ui.notFound}</h1><p class="lead">${ui.notFoundBody}</p><p><a href="/${lang}/">${ui.home}</a></p></article>`, nav: navHtml(lang, pages, ''),
      }));
    }
  }

  // root: Arabic or English depending on the browser, Arabic by default
  await write(path.join(dist, 'index.html'), `<!doctype html><html><head><meta charset="utf-8"><title>ChatGate Help</title>
<meta name="viewport" content="width=device-width, initial-scale=1"><link rel="canonical" href="${site.url}/${site.defaultLanguage}/">
<script>var l=(navigator.language||'').toLowerCase().startsWith('en')?'en':'${site.defaultLanguage}';try{l=localStorage.getItem('cg-help-lang')||l}catch(e){}location.replace('/'+l+'/')</script>
<meta http-equiv="refresh" content="0; url=/${site.defaultLanguage}/"></head><body></body></html>`);
  await write(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site.url}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
  await write(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
  console.log(`built ${urls.length} pages in ${Date.now() - started}ms → dist/`);
}

await build();
if (process.argv.includes('--watch')) {
  let timer;
  for (const dir of ['content', 'assets']) {
    watch(path.join(root, dir), { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(() => build().catch(console.error), 150); });
  }
  console.log('watching content/ and assets/ …');
}
