# hytz.co.in — Audit (Oct 2026)

Audited live: `/`, `/about`, `/contact`. Built on Framer.

## Critical — buttons & links
| Element | Problem | Fixed in v2 by |
|---|---|---|
| "Let's talk", "More about us", "Contact Now" | `<a>` with **no `href`** — nothing happens on click | Real anchors to `#contact` / `#services`, service pre-selection |
| Entire hero | Wrapped in `<a href="https://̥" target="_blank">` — broken URL, opens dead tab | Hero is not a link; two explicit CTAs |
| "+" menu icon | Does nothing on click | Full-screen menu: Esc to close, focus trap, scroll lock |
| Footer nav (01 / Home …) | `<div>`s styled as links; not focusable, no new-tab | Real `<a>` elements |
| `/work`, `/insights` | **404** | Single page; work opens as case-study modals |
| `info@hytz.co.in` | Links to **`mailto:dummy@mail.com`** — every email lead lost | `mailto:info@hytz.co.in` + copy-to-clipboard button |
| Service cards | Hover dots, no action | Accordion with deliverables + "Discuss →" CTA that pre-ticks the form |

## Critical — template leftovers
- `/about`: "About Clive", USD pricing ($2,999 / $3,599 / $5,999), fake Awwwards / CSS Design Awards / Red Dot claims.
- `/contact`: "Contact Me", **Los Angeles address**, template FAQ ("Do I need to know how to code?"), social icons → `x.com/MandroDesign`, `dribbble.com`.
- "Use for Free" buttons linking to the Framer template remix page.
- Template forms with ~14 junk fields.

## UX / content
- 410px **empty orange block** above the footer → now the final CTA band.
- Stat counters show "0X / 1M+ / 1%+" before animating; numbers duplicated for screen readers → final value is in HTML, animation is visual only.
- No `<h1>`; 37/38 images missing `alt`; identical `<title>` on every page.
- No case studies despite strong film work.

## Added in v2
- Adaptive cursor: orange by default, switches to ink over orange surfaces (no orange-on-orange), white over posters, per-item override via `data-cursor-tone`; grows into a labelled "View" ring on cards, a caret on text fields. Off on touch devices; no trailing lag under reduced-motion.
- "Now Showing" work reel: pinned on desktop (vertical scroll drives posters sideways, focused poster scales up, credits/counter/progress/film-strip follow), swipeable snap carousel on mobile; filters, ← → buttons and arrow keys; centred poster opens the case-study modal.
- Keyboard-navigable modal (← →, Esc), active-section nav highlight, hide-on-scroll header.
- Validated contact form (inline errors, busy/success/error states, honeypot) — posts to Formspree if configured, else opens a pre-filled email.
- Open Graph, JSON-LD (`MarketingAgency`), skip link, visible focus rings, `prefers-reduced-motion` support.
