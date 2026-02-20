# Claude Code Prompt — Kristina Bachová · Freelance Power BI Specialist Website

---

## What to build

A fully responsive, multi-page static website for a freelance Power BI specialist. No backend, no CMS — plain HTML, CSS, and vanilla JS (or a single-page app with client-side routing). All content is provided below. Design tone: **warm, sharp, professional** — not corporate-cold, not startup-playful. Think premium consulting.

---

## Tech stack

- Single `index.html` entry point with client-side routing (hash-based is fine), **or** separate HTML files linked via a nav bar — your choice, pick whichever is cleaner.
- CSS: vanilla with CSS custom properties for the colour palette. No framework required, but Tailwind is fine if you prefer.
- JS: vanilla. No React, no bundler needed. Keep it simple.
- Fully responsive down to mobile.
- Smooth scroll, subtle hover states, clean transitions. No flashy animations — this is a consulting site, not a portfolio playground.

---

## Colour palette (use these exact values)

```
--colour-primary:      #D97706;   /* Amber — main accent, CTAs, highlights */
--colour-accent:       #EA580C;   /* Deep Orange — secondary accent, badges */
--colour-dark:         #1C1917;   /* Stone 900 — headings, nav bg */
--colour-mid:          #92400E;   /* Amber 800 — hover states, links */
--colour-bg:           #FAF7F5;   /* Warm White — page background */
--colour-card:         #FFFFFF;   /* Cards and sections */
--colour-text:         #44403C;   /* Stone 700 — body text */
--colour-text-muted:   #78716C;   /* Stone 500 — subheadings, captions */
--colour-border:       #E7E5E4;   /* Stone 200 — borders, dividers */
--colour-green:        #16A34A;   /* Check marks */
--colour-warning:      #CA8A04;   /* Warning / partial icons */
--colour-red:          #DC2626;   /* Cross / no icons */
```

Typography: use **Playfair Display** (Google Fonts) for headings and **Source Sans 3** for body. Both are free. Pair: Playfair Display gives warmth and authority; Source Sans 3 is clean and very readable at body sizes.

---

## Site structure — 6 pages

```
Home            →  /  or /#home
Services        →  /#services
Portfolio       →  /#portfolio
About           →  /#about
Resources       →  /#resources
Contact         →  /#contact
```

Navigation: sticky top bar, dark background (`--colour-dark`), logo/name on the left, nav links on the right. On mobile: hamburger menu.

Footer: dark background, same as nav. Short tagline, links to all pages, and a simple copyright line.

---

## PAGE 1 — HOME

### Hero section
- Full-width, dark background (`--colour-dark`). Text is white.
- H1: **Kristina Bachová**
- Subheading (smaller, muted white): **Power BI Specialist · BI Operations · CoE Setup · Scalable Reporting**
- One-sentence value prop below that: *"I help companies turn messy BI into trusted, scalable reporting — fast."*
- One CTA button: **"Book a free discovery call"** — amber background, links to the Contact section. Rounded pill shape.
- No background image needed. A subtle geometric pattern or a very faint grid texture is fine, or just solid dark. Keep it clean.

### Social proof strip
- Light background strip below the hero.
- Text: *"Industries I've worked across:"*
- Four industry tags displayed as simple pills or icons: **Logistics · Healthcare · Consultancy · IT**

### What I do — 3 pillars
- Section heading: **What I do**
- Three cards in a row (stack on mobile), each with an icon, a short title, and 1–2 sentences:
  - 🔧 **BI Operations** — Keep your Power BI environment healthy, monitored, and running smoothly. Gateway management, performance tuning, incident resolution.
  - 🏛️ **CoE Setup & Governance** — Build the structure, best practices, and training that make Power BI self-service actually work across your organisation.
  - 📊 **Scalable Reporting** — Design dashboards and data models that grow with your business — not ones you'll have to rebuild in six months.

### Package teaser
- Section heading: **Services built for where you are right now**
- Four package cards in a row (2×2 on tablet, stack on mobile). Each card shows: package name, the "best for" line, timeframe, and price range. The **Stabilisation** card gets a small amber "Most Popular" badge and slightly elevated styling (subtle shadow or border highlight).
- At the bottom of this section: a link that says *"See all packages →"* linking to the Services page.
- Card content (use exactly these values):

| | Health Check | Stabilisation | CoE & Operating Model | Fractional BI Ops |
|---|---|---|---|---|
| Best for | Teams unsure where risks are | Teams firefighting issues | Orgs scaling BI | Ongoing BI leadership |
| Timeframe | 1–2 weeks | 4–6 weeks | 6–8 weeks | Ongoing |
| Price | €1.5k – €3k | €4k – €8k | €6k – €12k | €1k – €3k / month |

### Closing CTA
- Simple line of text: *"Not sure which package fits? Start with a Health Check — it's the fastest way to find out."*
- Button: **"Get in touch"** → links to Contact.

---

## PAGE 2 — SERVICES

### Intro
- Page heading: **Services & Packages**
- Short intro paragraph: *"Every engagement starts with understanding your situation — not a template. Here's how I typically work with clients, and what each package includes."*

### How It Works — 3 steps
- Horizontal flow (or vertical on mobile):
  - **1. Discovery Call** — A free 30-minute call. You explain the problem; I tell you honestly whether and how I can help.
  - **2. Proposal & Scope** — I put together a clear proposal: what's included, what's not, timeline, and price. No surprises.
  - **3. Delivery** — Hands-on work, regular check-ins, and a handover that actually makes sense.

### Full package breakdown — 4 sections
Each package gets its own detailed card or section. Use this exact content:

#### 🩺 Health Check
- **Best for:** Teams unsure where BI risks are
- **Primary goal:** Identify risks & priorities
- **Typical trigger:** *"We don't trust our reports"*
- **Timeframe:** 1–2 weeks
- **What you get:**
  - Executive-ready BI assessment
  - Risk scoring & heatmap
  - 30–60–90 day prioritised roadmap
- **Hands-on fixes:** ❌ No
- **Governance & standards:** ❌ No
- **Executive-ready outputs:** ✅ Yes
- **Ongoing support:** ❌ No
- **Primary ROI:** Avoid wrong BI investments
- **Key risks avoided:** Hidden data, security & trust risks
- **Price:** €1.5k – €3k

#### ⭐ Stabilisation *(Most Popular)*
- **Best for:** Teams firefighting issues
- **Primary goal:** Fix what's broken fast
- **Typical trigger:** *"Things keep breaking"*
- **Timeframe:** 4–6 weeks
- **What you get:**
  - Hands-on fixes to restore trust in reports
  - Core governance & standards put in place
  - Tactical improvement roadmap
- **Hands-on fixes:** ✅ Yes
- **Governance & standards:** ⚠️ Basic
- **Executive-ready outputs:** ⚠️ Some
- **Ongoing support:** ❌ No
- **Primary ROI:** Restore trust & productivity
- **Key risks avoided:** Downtime, slow reports, rework
- **Price:** €4k – €8k

#### 🏛️ CoE & Operating Model
- **Best for:** Organisations scaling BI
- **Primary goal:** Make BI scalable
- **Typical trigger:** *"We're growing fast"*
- **Timeframe:** 6–8 weeks
- **What you get:**
  - Full governance framework & standards
  - Strategic BI roadmap
  - Executive-ready operating model & training plan
- **Hands-on fixes:** ⚠️ Some
- **Governance & standards:** ✅ Full
- **Executive-ready outputs:** ✅ Yes
- **Ongoing support:** ❌ No
- **Primary ROI:** Enable scale without chaos
- **Key risks avoided:** BI sprawl, shadow IT, bottlenecks
- **Price:** €6k – €12k

#### 🔄 Fractional BI Ops
- **Best for:** Ongoing BI leadership needs
- **Primary goal:** Prevent future problems
- **Typical trigger:** *"We need senior oversight"*
- **Timeframe:** Ongoing
- **What you get:**
  - Continuous governance & oversight
  - Advisory & leadership support
  - Rolling roadmap & prioritisation
- **Hands-on fixes:** ⚠️ Advisory
- **Governance & standards:** ✅ Continuous
- **Executive-ready outputs:** ⚠️ Some
- **Ongoing support:** ✅ Yes
- **Primary ROI:** Avoid future rework & extra hires
- **Key risks avoided:** Burnout, dependency on individuals
- **Price:** €1k – €3k / month

### FAQ accordion
Five questions, collapsible. Use this content:

- **Do I need Power BI Premium or Pro to work with you?**
  Not necessarily. I'll assess your current licensing as part of any engagement and advise on what you actually need — not what a vendor wants to sell you.

- **How long does a CoE setup realistically take?**
  A basic CoE framework can be in place in 6–8 weeks. Making it stick — training, adoption, governance — is an ongoing process, which is exactly what the Fractional BI Ops package supports.

- **Can you work with our existing Power BI reports, or do I need to start from scratch?**
  Always from what you have. A Health Check or Stabilisation engagement starts by reviewing your current setup, not replacing it.

- **I'm based outside Portugal. Can we still work together?**
  Yes. I work remotely with clients across Europe. Everything runs over video calls, shared screens, and collaborative tools — location is not a barrier.

- **What happens after the project is finished?**
  Every engagement ends with clear documentation and a handover. If you want ongoing support, Fractional BI Ops is designed exactly for that.

---

## PAGE 3 — PORTFOLIO

### Intro
- Page heading: **Portfolio**
- Intro: *"A selection of the types of work I do. Client names and specific details are kept confidential — but the problems, the approaches, and the results are real."*

### Case study cards — 3 items
Each card: a short title, the type of work, a 2–3 sentence description, and the outcome. Style them as clean cards with an icon or colour accent on the left.

- **🏭 CoE Setup for a Global Medical Devices Company**
  Type: CoE & Governance
  *Built a Power BI Centre of Excellence from scratch — governance framework, best-practice guidelines, training programme, and workspace structure. End result: business users could create their own reports confidently within guardrails.*
  Outcome: Self-service adoption up across 4 departments within 3 months.

- **⚙️ BI Operations Stabilisation for an IT Services Firm**
  Type: BI Ops & Troubleshooting
  *Took over a chaotic Power BI environment — broken reports, performance issues, no governance. Triaged, fixed, and put a monitoring and support process in place.*
  Outcome: Report failures dropped by 80%. Team confidence restored.

- **📦 Power BI Reporting for Port Inspections & Logistics**
  Type: Dashboard Development
  *Designed and delivered end-to-end Power BI reports for port inspection KPIs, lab results, and certification tracking. Included RLS for regional access control and trained local superusers.*
  Outcome: Replaced fragmented Excel reporting with a single source of truth.

### Skills matrix
- Section heading: **Technical Skills**
- A clean grid or tag cloud. Group them:
  - **Power BI:** DAX, Power Query (M), Data Modelling, Star Schema, RLS, Conditional Formatting, Calculation Groups, Incremental Refresh
  - **Platform & Governance:** CoE Setup, Tenant Administration, Gateway Management, Workspace Management, Premium Capacity Planning
  - **Integration & Automation:** SQL Server, Azure, SharePoint, PowerShell & REST API, ServiceNow
  - **Microsoft Fabric:** Dataflows, Fabric Capacity, OneLake (working knowledge)

### Portfolio-in-progress note
- A small honest callout box (amber border, light amber background):
  *"I'm currently building new showcase dashboards using public datasets. Check back soon — or follow me on LinkedIn for updates."*

---

## PAGE 4 — ABOUT

### Intro
- Page heading: **About Me**

### Professional story — short narrative
One flowing block of text, no bullet points. Use this content, written in first person:

*I've spent over 10 years in business intelligence — starting as a Power BI developer in logistics, moving through healthcare and consultancy, and eventually into BI operations and governance leadership. Along the way I've built dashboards that people actually use, set up centres of excellence that stuck, and fixed BI environments that were quietly falling apart.*

*I went on maternity leave in 2024 and used the time to think clearly about what kind of work I actually want to do. The answer was obvious: the CoE and governance side — the part where you help an entire organisation get better at using data, not just one team.*

*Now I freelance. It lets me work on the problems I find genuinely interesting, for clients who are ready to take their BI seriously, without the politics of a big corporate structure.*

### Why I freelance
- A small highlighted box:
  *"Freelancing isn't a gap-filler. It's a deliberate choice. I take on fewer clients so I can do better work for each one — and I'm always available for the right project."*

### Languages
- English (Fluent), Slovak (Native), Czech (Native), Portuguese (learning)

### Tech stack badges
- A row of technology tags: Power BI · DAX · Power Query · SQL Server · Azure · SharePoint · PowerShell · ServiceNow · Fabric · JIRA · Confluence

---

## PAGE 5 — RESOURCES

### Intro
- Page heading: **Resources**
- Intro: *"Things I've learned, written about, and think are worth sharing. Mostly about Power BI governance and making BI actually work in practice."*

### Article cards — 5 items
Each card: title, short description (1–2 sentences), a "Read more" link (these can be placeholder links for now — just style them properly). Tag each with a category badge.

- 📚 **[CoE]** How to Set Up a Power BI Centre of Excellence — Step by Step
  *A practical guide to building a CoE that lasts — from getting executive buy-in to writing governance guidelines that people actually follow.*

- 📚 **[Governance]** Power BI vs Microsoft Fabric — What Actually Changed?
  *Dataflows, capacity, OneLake — here's what's real, what's hype, and what it means for your Power BI setup right now.*

- 📚 **[DAX]** 5 DAX Functions Every BI Team Should Know (And Why)
  *Beyond SUM and COUNT. The functions that actually make your measures efficient, maintainable, and readable.*

- 📚 **[Governance]** Writing Power BI Best Practices That People Will Actually Follow
  *Guidelines only work if they're clear, relevant, and not buried in a SharePoint folder nobody visits.*

- 📚 **[Tips]** Free Power BI Theme: Warm Sharp Minimal
  *A ready-to-download Power BI theme JSON — modern, warm colours, clean look. Import it in two clicks.*

### Lead magnet callout
- A highlighted box (amber border):
  - Heading: **📥 Free Download: Power BI CoE Starter Checklist**
  - Text: *"Not sure where to start with a CoE? Download this checklist — it covers the 12 things you need to decide before you build anything."*
  - A button: **"Download the checklist"** — this can link to a mailto or a placeholder for now.

---

## PAGE 6 — CONTACT

### Intro
- Page heading: **Let's Talk**
- Short text: *"If you're thinking about your Power BI setup — whether it's broken, chaotic, or just not where you need it to be — a 30-minute call costs nothing and tells you a lot."*

### Booking section
- A clearly visible box with:
  - Heading: **Book a free 30-min discovery call**
  - Placeholder text: *"[Calendly embed goes here]"* — style the box so it's obvious where the embed will live. Make it prominent, not a small link buried in text.

### Contact form
- Simple form with these fields:
  - Name (text input)
  - Email (email input)
  - Company (text input, optional — mark it)
  - What do you need help with? (dropdown with options: Health Check, Stabilisation, CoE Setup, Fractional BI Ops, Not sure yet)
  - Message (textarea, optional)
  - Submit button: **"Send message"** — amber, pill-shaped, same style as other CTAs
- Note: the form doesn't need to actually submit anywhere. Wire it up to show a simple "Thanks, I'll be in touch" confirmation message on submit. Just validate that name and email are filled in.

### Availability info
- A small info block:
  - 📍 Based in Portugal · Available remotely across Europe
  - 🕐 Typically respond within 24 hours on working days

---

## Global details to remember

- Every CTA button on the site should look the same: amber background (`--colour-primary`), white text, rounded pill shape, subtle hover darkening.
- The "Most Popular" badge on Stabilisation appears everywhere that package is shown (hero teaser, services page).
- ✅ ⚠️ ❌ icons in the package comparison should use the colours defined above (green, warning-amber, red) — not emoji. Use simple SVG circles with a tick, exclamation, or cross, or CSS-styled spans.
- All headings on inner pages should be left-aligned, not centred. Only the hero H1 is centred.
- No stock photos. No placeholder images of people. The site should look complete and intentional without them.
- Make sure the nav highlights the current page/section as the user scrolls or navigates.
- Keep spacing generous. This is a consulting site — white space = confidence.
