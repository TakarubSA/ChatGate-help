# ChatGate Help Center

The public help site for ChatGate, served at **help.chatgate.io**. Arabic (default, right-to-left) and English. Static HTML built from Markdown, with search, light/dark theme and a phone layout.

## Edit the content

Every page is a Markdown file:

```
content/ar/<page>.md   Arabic
content/en/<page>.md   English (same file name)
```

Each file starts with a title and a one-line description:

```markdown
---
title: Templates
description: Create WhatsApp message templates that Meta approves.
---
```

- `##` and `###` headings appear in "On this page" and in search.
- Tables, lists, links and `code` work as usual.
- Callouts: start a quote with `[!NOTE]`, `[!TIP]`, `[!WARNING]` or `[!IMPORTANT]`.
- Link between pages with `/ar/<page>/` or `/en/<page>/`.

The menu order and the section names are in `site.json`. To add a page, create both language files and add its name to a section there.

> Don't name the previous platform customers moved from — say "your previous platform" or "partner (BSP)".

## Build and preview

Node 18 or newer.

```bash
npm install
npm run preview     # builds, then serves dist/ at http://localhost:4600
npm run dev         # rebuilds on every change to content/ or assets/
npm run build       # builds dist/ only
```

## Deploy

`npm run build` produces `dist/`: plain files, no server code. Copy `dist/` to the server and serve it with nginx:

```nginx
server {
    server_name help.chatgate.io;
    root /var/www/chatgate-help/dist;
    index index.html;

    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }
    location /assets/ {
        expires 7d;
        add_header Cache-Control "public";
    }
    error_page 404 /404.html;
}
```

Then add HTTPS, for example with `sudo certbot --nginx -d help.chatgate.io`, and point the `help` DNS record (A or CNAME) at the server.

One-line update on the server, once the project is cloned to `/var/www/chatgate-help`:

```bash
cd /var/www/chatgate-help && git pull && npm install --omit=dev && npm run build
```

The portal links here from the menu under the user's name (**Help center**). Override the address with `NEXT_PUBLIC_HELP_URL` in the portal if the help site moves.

## Settings

`site.json`:

| Key | Meaning |
| --- | --- |
| `url` | The help site's own address (canonical links, sitemap) |
| `portalUrl` | Where **Open ChatGate** goes |
| `languages`, `defaultLanguage` | Languages built, and the one `/` opens |
| `sections` | Menu groups, their names per language, and their pages in order |
