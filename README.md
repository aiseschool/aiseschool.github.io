# AISE Winter School 2027 — website

Static site for the Winter School on AI-Infused Software Engineering (AISE) —
Research and Practice. IIIT Bangalore, 4–13 January 2027.

Live at **https://aiseschool.github.io**

## How it works

Plain HTML, CSS and one small JavaScript file. No build step, no npm, no
framework. Push to `main` and GitHub Pages serves it within a minute.

```
index.html              the live site — modernist design
css/style.css           its design tokens and layout
js/main.js              mobile nav, scroll-spy, fade-in on scroll
assets/img/             photographs and logos (see manifest below)
preview/index.html      compares the live design with the alternatives
preview/riso/           riso print design (previously live), kept as an alternative
preview/glacier/        glacier editorial design, kept as an alternative
preview/shared/main.js  the same behaviour script, for the preview pages
.nojekyll               tells GitHub Pages to serve files as-is
```

The design is the **modernist** direction: one ink on warm grey, a single signal
red, 2px rules, Archivo throughout. The riso print and glacier editorial versions are kept under
`preview/` and are not linked from the live site.

To preview locally, open `index.html` in a browser. That is the whole workflow.

## Editing content

Everything is in `index.html`, in the same order it appears on the page. Each
section is marked with a comment banner, for example:

```html
<!-- ======================================================= SPEAKERS -->
```

Common edits:

- **Add a speaker** — copy any `<li class="person reveal">…</li>` block inside
  `<ul class="people">`, change the name, the affiliation and the `aria-label`.
- **Change a date** — it appears in three places: the hero `dl`, the facts strip,
  and the footer. Search for `2027` to find them all.
- **Open registration** — in the `#registration` section, replace the
  `<p class="callout__status">Not yet open</p>` line and put the ACM India link
  into the callout text. If you want a button, copy the `<a class="btn">` markup
  from the hero.
- **Change the accent colour** — one line in `css/style.css`: `--accent`.

## Images

Every image slot currently renders a dashed grey box labelled with its purpose
and required size. To fill one, replace the whole `<div class="ph …">…</div>`
with an `<img>`:

```html
<!-- before -->
<div class="ph ph--1x1" role="img" aria-label="Portrait of Alpana Dubey">
  <span class="ph__label">Portrait<em>800 × 800</em></span>
</div>

<!-- after -->
<img src="assets/img/speakers/alpana-dubey.jpg" alt="Portrait of Alpana Dubey">
```

### Manifest

| Where | Suggested path | Size (px) | Notes |
|---|---|---|---|
| Hero banner | `assets/img/hero-campus.jpg` | 2400 × 1000 | Wide campus shot, 21:9 crop |
| Venue — academic block | `assets/img/venue-academic.jpg` | 1200 × 900 | 4:3 |
| Venue — lab / lecture hall | `assets/img/venue-lab.jpg` | 1200 × 900 | 4:3 |
| Venue — hostel | `assets/img/venue-hostel.jpg` | 1200 × 900 | 4:3 |
| Organiser portraits (6) | `assets/img/organisers/` | 800 × 800 | **Done.** Five of the six are also speakers, so the same file feeds both lists. |
| Speaker portraits (5) | `assets/img/speakers/` | 800 × 800 | **Done.** Saha, Vinu E V, Sahana Prabhu, Vasu Malhotra, Karthik Vaidhyanathan |
| ACM India logo | `assets/img/logos/acmlogo.png` | any ratio | **Done** — links to india.acm.org |
| ACM SIGSOFT logo | `assets/img/logos/sigsoft-D6cWwEez.png` | any ratio | **Done** — links to sigsoft.org |
| Monash University logo | `assets/img/logos/Monash-300x300.png` | any ratio | **Done** — links to monash.edu |
| IIIT Bangalore logo | `assets/img/logos/IIITB_logo1.png` | any ratio | **Done** — links to iiitb.ac.in |

Each logo fills its white box (`.logos img { object-fit: contain }`), keeping
its own ratio. The Monash file has a lot of empty space around the mark, so it
is wrapped in `<span class="logo-crop">` to crop to the mark itself. To add another
sponsor, copy an existing `<li>` in the sponsors list and point it at the new
file — no sizing work needed.

Keep photographs under ~300 KB each — the site has no image pipeline.

Portraits are cropped square in CSS (`.portrait { object-fit: cover }`), so a
non-square source works, but anything much below 800 × 800 will look soft on a
wide screen. Currently under that: `Sridhar_Chimalakonda.jpg` (200 × 240),
`Karthik-Vaidhyanathan-300x300.jpg`, `vinu.jpg` (320), `Prof__Sahan_M_Prabhu.png`
(320), `Diptikalyan_Saha.webp` (400), `meenakshi-dsouza-poa.jpg` (430),
`Santosh_Singh_Rathore.jpg` (543 × 429). Replace them when better files exist.

## Design variants

`preview/index.html` compares the live design with the riso print and glacier
editorial alternatives kept in `preview/riso/` and `preview/glacier/`. The
previews share nothing but `preview/shared/main.js`, so editing one never
touches another. Note that edits to the live site do **not** propagate to the
preview copies — if one ever needs to be promoted, its content has to be
brought up to date first.

## Still to be confirmed

These render as "to be announced" on the page. Update them when known:

- ACM India registration URL
- Day-wise schedule (the page currently shows five themed modules and says the
  day-wise schedule will be announced)
- Remaining speakers — the list is marked tentative

## Deploying

```
git add -A
git commit -m "Update content"
git push origin main
```

In the repository settings, Pages must be set to deploy from branch `main`,
folder `/ (root)`.
