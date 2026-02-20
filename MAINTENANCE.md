# Website Maintenance Documentation

**Site:** https://bachovak.github.io/website/
**GitHub repo:** https://github.com/bachovak/website
**Owner:** Kristina Bachová — freelance Power BI specialist

---

## Table of Contents

1. [Architecture overview](#1-architecture-overview)
2. [Project file structure](#2-project-file-structure)
3. [External tools and integrations](#3-external-tools-and-integrations)
4. [Design system](#4-design-system)
5. [Pages and routing](#5-pages-and-routing)
6. [Common maintenance tasks](#6-common-maintenance-tasks)
7. [Deployment](#7-deployment)
8. [Known gotchas](#8-known-gotchas)

---

## 1. Architecture overview

The site is a **single-page application (SPA) built with plain HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies**.

- All content lives in one file: `index.html`
- All styles live in one file: `styles.css`
- All JavaScript lives in one file: `script.js`
- Navigation is handled via **URL hash routing** (e.g. `/#services`, `/#contact`)
- Page switching is done by toggling a `.active` CSS class on `<div class="page">` elements
- `thank-you.html` is a **separate standalone page** (not part of the SPA), used as the post-subscription redirect from Kit

The site is hosted on **GitHub Pages** — pushing to the `main` branch on GitHub deploys automatically within ~1 minute. There is no CI/CD pipeline.

---

## 2. Project file structure

```
/
├── index.html                          Main SPA — all pages in one file
├── styles.css                          All CSS, including responsive breakpoints
├── script.js                           All JavaScript (routing, menu, forms, FAQ)
├── favicon.svg                         Browser tab icon
├── thank-you.html                      Standalone post-subscription page
├── Downloadables/
│   ├── PowerBI-CoE-Starter-Checklist.pdf   Downloadable checklist (linked from thank-you.html)
│   ├── kristina.photo.jpeg             Profile photo (used in thank-you.html)
│   ├── checklist.html                  Source HTML used to generate the PDF
│   ├── generate-pdf.js                 Node script used to generate the PDF (not deployed)
│   ├── package.json                    Node deps for PDF generation (not deployed)
│   └── node_modules/                   Not deployed
├── README.md                           Project notes
└── MAINTENANCE.md                      This file
```

> **Note:** The `Articles/` folder exists locally but is not tracked by git and not part of the live site.

---

## 3. External tools and integrations

### 3.1 GitHub Pages (Hosting)

| | |
|---|---|
| **URL** | https://bachovak.github.io/website/ |
| **Repo** | https://github.com/bachovak/website |
| **Branch** | `main` |
| **Deploy trigger** | Every push to `main` auto-deploys (no action needed) |

To update the site: commit changes and push to `main`. GitHub Pages picks up the changes automatically.

---

### 3.2 Google Fonts (Typography)

| | |
|---|---|
| **Heading font** | Playfair Display (weights: 400, 600, 700) |
| **Body font** | Source Sans 3 (weights: 300, 400, 500, 600, 700) |
| **Loaded in** | `index.html` `<head>` and `thank-you.html` `<head>` |

No account required. If fonts need changing, update the `<link>` tag in the `<head>` of both HTML files and the CSS variables `--font-heading` and `--font-body` in `styles.css`.

---

### 3.3 Kit — Email subscription form

| | |
|---|---|
| **Platform** | Kit (formerly ConvertKit) |
| **Account** | kristina-bachova.kit.com |
| **Form UID** | `bb35d512cc` |
| **Embed script** | `<script async data-uid="bb35d512cc" src="https://kristina-bachova.kit.com/bb35d512cc/index.js"></script>` |
| **Placed on** | Resources page (inside `index.html`, search for `<!-- Kit form -->`) |
| **Success redirect** | https://bachovak.github.io/website/thank-you.html |

The redirect URL is configured inside the Kit dashboard (not in code). To change the form: replace the `data-uid` and `src` UID in the embed script. To change the redirect: update it inside Kit → Forms → the form → Settings → Success.

---

### 3.4 Formspree — Contact form backend

| | |
|---|---|
| **Platform** | Formspree |
| **Form endpoint** | `https://formspree.io/f/xykdkgnv` |
| **Placed on** | Contact page (`index.html`) |
| **Fields collected** | Name (required), Email (required), Company (optional), Service interest, Message |

Submissions are sent to the email address configured in the Formspree dashboard. Form validation is handled in `script.js`. The form submits via `fetch()` (no page reload). On success, the form hides and a thank-you message appears inline.

---

### 3.5 Calendly — Booking widget

| | |
|---|---|
| **Platform** | Calendly |
| **Calendar URL** | `https://calendly.com/bachovak/30min` |
| **Widget type** | Inline embed |
| **Placed on** | Contact page (`index.html`), inside `.booking-box` |
| **Widget script** | Loaded from `https://assets.calendly.com/assets/external/widget.js` |

The widget is embedded with a fixed height of `700px`. To change the meeting link, update `data-url` on the `.calendly-inline-widget` div.

---

### 3.6 PBI Health Assessment (external tool)

| | |
|---|---|
| **URL** | https://bachovak.github.io/pbi-health-assessment/ |
| **Linked from** | Services page — Health Check package |

This is a separate GitHub Pages site, not part of this repo.

---

## 4. Design system

All design tokens are defined as CSS custom properties at the top of `styles.css` inside `:root {}`.

### Colours

| Variable | Hex | Usage |
|---|---|---|
| `--colour-primary` | `#D97706` | Amber — buttons, links, accents |
| `--colour-accent` | `#EA580C` | Orange-red — hover states |
| `--colour-dark` | `#1C1917` | Near-black — nav, hero, footer backgrounds |
| `--colour-mid` | `#92400E` | Mid-brown — link hovers, article headings |
| `--colour-bg` | `#FAF7F5` | Warm off-white — page background |
| `--colour-card` | `#FFFFFF` | White — card backgrounds |
| `--colour-text` | `#44403C` | Warm dark grey — body text |
| `--colour-text-muted` | `#78716C` | Muted warm grey — secondary text |
| `--colour-border` | `#E7E5E4` | Light warm border |
| `--colour-green` | `#16A34A` | Success states |
| `--colour-warning` | `#CA8A04` | Warning states |
| `--colour-red` | `#DC2626` | Error states |

### Typography

| Variable | Value |
|---|---|
| `--font-heading` | `'Playfair Display', Georgia, serif` |
| `--font-body` | `'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif` |

### Responsive breakpoints

| Breakpoint | Applies to |
|---|---|
| `max-width: 900px` | Tablet — grids collapse, service card meta stacks |
| `max-width: 640px` | Mobile — hamburger menu appears, single-column layouts |

---

## 5. Pages and routing

The SPA uses hash-based routing. The router lives in `script.js` — it reads `window.location.hash` and shows the matching `.page` div.

### Pages in `index.html`

| Hash / URL | DOM element ID | Description |
|---|---|---|
| `/#home` (default) | `page-home` | Hero, pillars, packages teaser, CTA |
| `/#services` | `page-services` | Full package breakdown, FAQ |
| `/#portfolio` | `page-portfolio` | Case studies, skills matrix |
| `/#about` | `page-about` | Story, languages, tech stack |
| `/#resources` | `page-resources` | Article cards, Kit subscription form |
| `/#contact` | `page-contact` | Calendly widget, contact form |
| `/#article-fabric` | `page-article-fabric` | Article: Power BI vs Fabric |
| `/#article-coe-setup` | `page-article-coe-setup` | Article: How to set up a CoE |
| `/#article-dax-functions` | `page-article-dax-functions` | Article: 5 DAX functions |
| `/#article-best-practices` | `page-article-best-practices` | Article: Writing best practices |

### Deep links

Services page supports deep linking to specific packages:

| URL | Scrolls to |
|---|---|
| `/#services/health-check` | Health Check package |
| `/#services/stabilisation` | Stabilisation package |
| `/#services/coe` | CoE & Operating Model package |
| `/#services/fractional` | Fractional BI Ops package |

### Standalone page

| URL | File | Purpose |
|---|---|---|
| `/website/thank-you.html` | `thank-you.html` | Post-subscription landing page. Linked from Kit as the redirect after signup. |

---

## 6. Common maintenance tasks

### Add a new article

1. In `index.html`, add a new `<article class="article-card">` inside `.articles-grid` on the Resources page (search for `<!-- Articles -->`).
2. Add a new `<div class="page" id="page-article-SLUG">` section with the full article content. Copy an existing article page as a template.
3. In `script.js`, add `'article-SLUG'` to the `pages` array at the top.
4. Commit and push.

### Update an existing article

Find the article's `<div class="page" id="page-article-...">` section in `index.html` and edit the content inside `.article-body`.

### Change a service package (price, timeframe, description)

Search for the package's `id` in `index.html` (e.g. `id="pkg-health-check"`). There are two places: the teaser card on the Home page and the full detail card on the Services page. Update both.

### Update the Kit subscription form

Replace the `data-uid` value and the UID in the `src` URL in the embed script on the Resources page (search for `<!-- Kit form -->`). Also update the redirect URL inside the Kit dashboard.

### Update the Calendly booking link

Search for `calendly.com/bachovak` in `index.html` and replace the URL in `data-url` on the `.calendly-inline-widget` element.

### Update the contact form email

Log into Formspree (https://formspree.io) and change the notification email in the form settings. The endpoint URL in `index.html` does not need to change.

### Update the PDF checklist

Replace `Downloadables/PowerBI-CoE-Starter-Checklist.pdf` with the new file (keep the same filename), then commit and push. The download link in `thank-you.html` will automatically serve the new file.

### Update the profile photo

Replace `Downloadables/kristina.photo.jpeg` with the new photo (keep the same filename), then commit and push.

### Add a new page

1. Add a nav link in `<ul class="nav__links">` in `index.html` with `data-page="SLUG"`.
2. Add `<div class="page" id="page-SLUG">` with your content.
3. Add `'SLUG'` to the `pages` array in `script.js`.
4. Add the page to the footer nav links.
5. Commit and push.

---

## 7. Deployment

There is no build step. Deployment is just a `git push`.

```bash
git add <files>
git commit -m "Description of change"
git push
```

GitHub Pages picks up the change within ~1 minute. The live URL is:
`https://bachovak.github.io/website/`

To verify deployment, check the **Actions** tab on the GitHub repo — a green tick means it's live.

> **Important:** Only files tracked by git are deployed. If you add a new image or PDF, you must `git add` it explicitly before committing.

---

## 8. Known gotchas

**Mobile menu initialisation order**
`closeMobileMenu()` is called inside `navigateTo()`, which runs on every page load. The mobile menu DOM variables (`hamburger`, `navLinks`, `navOverlay`) must be initialised before `navigateTo()` is first called, or the script will crash silently and leave all interactive features (menu, FAQ, form) broken. The current `script.js` handles this correctly — do not move the mobile menu initialisation block below the initial `navigateTo()` call.

**Files in `Downloadables/` must be committed individually**
Git does not track the `Downloadables/` folder as a whole. Each file (photo, PDF) must be explicitly `git add`-ed. If a file is missing from the repo, it will 404 in production even if it exists locally.

**`thank-you.html` asset paths**
`thank-you.html` lives in the root. Its assets (photo, PDF) are in `Downloadables/`. Paths in `thank-you.html` are relative: `Downloadables/kristina.photo.jpeg` and `Downloadables/PowerBI-CoE-Starter-Checklist.pdf`.

**`body overflow: hidden` on iOS**
Setting `document.body.style.overflow = 'hidden'` to lock scroll behind the mobile menu does not fully prevent scroll on older iOS versions. This is a known iOS limitation and does not affect functionality.

**Calendly widget minimum width**
The Calendly inline widget has `min-width: 320px` set by Calendly's own embed code. On very small screens (under 320px) this may cause slight horizontal overflow. This is a third-party constraint.

**Kit form styling**
The Kit subscription form is rendered by an external script (`kit.com`). Its visual appearance is controlled inside the Kit dashboard, not by the site's CSS. Changes to form styling must be made in Kit.
