/* ==========================================================
   Hytz v2 — interactions
   Every clickable thing on this page has a real destination.
   ========================================================== */

// ---- Site config: fill these in, empty values are simply hidden (no dead buttons) ----
const CONFIG = {
  email: "info@hytz.co.in",
  // Enquiries are emailed to info@hytz.co.in via FormSubmit (no backend needed).
  // One-time: the first submission sends an activation email to info@hytz.co.in — click the link in it.
  // After activating, FormSubmit emails you a random alias; swap it in here to keep the address out of the code.
  formEndpoint: "https://formsubmit.co/ajax/info@hytz.co.in",
  phone: "+919746321230",    // Antony Roy, CEO & Founder
  whatsapp: "919746321230",  // country code, no +
  instagram: "https://www.instagram.com/hytz.co.in/",
  linkedin: "https://www.linkedin.com/company/hytz/",
  facebook: "https://www.facebook.com/hytz.co.in",
};

const IMG = (id, w = 800) => `https://framerusercontent.com/images/${id}?scale-down-to=${w}`;

// NOTE: summaries are written from what's visible on the posters; results marked [add] need real numbers.
const WORK = [
  { id: "padakkalam", title: "Padakkalam", cat: "film", img: "CvElHzO4el8MjY0Wt9ITWy5ZPk.jpg", tone: "ink",
    stat: "2M+", statLabel: "YouTube views",
    summary: "Launch and post-release buzz for the Malayalam comedy — trailer cut-downs, meme-led social and a creator push that kept it trending.",
    scope: ["Trailer cut-downs", "Social campaign", "Creator collabs", "Trending creatives"],
    result: "Trending with 2M+ YouTube views (per the campaign creative). [add full campaign numbers]" },
  { id: "pet-detective", title: "The Pet Detective", cat: "film", img: "6xfdWHWoK5K5khovV6pa2kL2xs4.jpeg", tone: "ink",
    summary: "Release-date campaign for a family entertainer — character-first content and a bright, poster-led visual system.",
    scope: ["Release campaign", "Poster adaptations", "Reels", "Influencer seeding"],
    result: "[add reach / impressions / box-office tie-in]" },
  { id: "footage", title: "Footage", cat: "film", img: "WNz0SpRmmmJdzHY2Xi86fczJdNA.jpg", tone: "accent",
    summary: "Mystery-thriller promotions built around tension — teaser drops timed to keep audiences guessing.",
    scope: ["Teaser strategy", "Social rollout", "Paid amplification"],
    result: "[add reach / impressions]" },
  { id: "ragam", title: "Ragam '25 × Job Kurian", cat: "event", img: "U6iMeWeyecHUr7WDPA7fDpXhDU.jpg", tone: "accent",
    summary: "Headline-act announcement for NIT Calicut's cultural fest — a campus-wide hype cycle in a week.",
    scope: ["Event branding", "Announcement creatives", "Campus social"],
    result: "[add ticket sales / reach]" },
  { id: "gulab-jamun", title: "Gulab Jamun", cat: "brand", img: "dlyIu682elKojN8cuGHbehwYQ.jpg", tone: "white",
    summary: "Product storytelling for a dessert menu — moody, appetite-first food photography and social content.",
    scope: ["Food photography", "Art direction", "Social content"],
    result: "[add engagement / orders]" },
  { id: "ebu-coffee-rave", title: "Ebu Coffee Rave", cat: "event", img: "ztlktDcvYrYT9b4vQE4Heq5w6g.jpeg", tone: "ink",
    summary: "Hand-drawn identity for a coffee-and-music rave by Mamangam — playful illustration that feels like a zine.",
    scope: ["Illustration", "Event identity", "Promo creatives"],
    result: "[add footfall / reach]" },
];

const SERVICES = [
  { title: "Branding & Design", sub: "Logos, brand kits, packaging, creative direction.", level: 1, form: "Branding & Design",
    body: "Identity systems that look as good on a billboard as they do in a 9:16 story.",
    tags: ["Logo & identity", "Brand guidelines", "Packaging", "Creative direction", "Pitch decks"] },
  { title: "Social Media Campaigns", sub: "We don't “manage” social, we weaponize it.", level: 2, form: "Social Media Campaigns",
    body: "Culture-first content calendars, reels that loop, and community that talks back.",
    tags: ["Content strategy", "Reels & shorts", "Meme marketing", "Influencer & creator collabs", "Community"] },
  { title: "Performance Marketing", sub: "We bring the numbers.", level: 3, form: "Performance Marketing",
    body: "Full-funnel paid media on Meta and Google, with creative testing baked in from day one.",
    tags: ["Meta & Google Ads", "Creative testing", "Funnels & landing pages", "Analytics & reporting"] },
  { title: "Film Collaborations", sub: "You've probably double-tapped our work without knowing it.", level: 4, form: "Film Collaborations",
    body: "From first-look to OTT release — we've run digital for Malayalam cinema's loudest launches.",
    tags: ["First-look & trailer launches", "Promo cut-downs", "Star & creator tie-ins", "Release-week war room"] },
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add("js");

/* ---------------- Toast ---------------- */
const toastEl = $("[data-toast]");
let toastT;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("is-on");
  clearTimeout(toastT);
  toastT = setTimeout(() => toastEl.classList.remove("is-on"), 2400);
}

/* ---------------- "Top" links: logo, Home, Back to top ----------------
   The hero (#top) is position: sticky, so the browser thinks it's always in view
   and a plain #top jump doesn't scroll. Scroll the window to 0 explicitly. */
function scrollToTop() {
  history.replaceState(null, "", location.pathname + location.search);
  scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}
document.addEventListener("click", e => {
  const a = e.target.closest('a[href="#top"]');
  if (!a || a.classList.contains("btn") || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  scrollToTop();
});

/* ---------------- Link buttons: arrow floods the button, then go ---------------- */
function go(a) {
  const href = a.getAttribute("href");
  if (a.target === "_blank") return window.open(a.href, "_blank", "noopener");
  if (href === "#top") return scrollToTop();
  if (href.startsWith("#")) {
    history.pushState(null, "", href);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  } else {
    location.href = a.href;
  }
}
document.addEventListener("click", e => {
  const a = e.target.closest("a.btn");
  if (!a) return;
  // let new-tab / modified clicks behave natively
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  if (a.classList.contains("is-filling")) return;
  // no animation if motion is reduced or the button was just hidden (e.g. the modal CTA closes its dialog)
  if (reduceMotion || !a.getClientRects().length || a.closest("dialog:not([open])")) return go(a);

  // wrap loose label text so it can sit above the fill (CSS lifts element children only)
  [...a.childNodes].forEach(n => {
    if (n.nodeType === 3 && n.textContent.trim()) {
      const s = document.createElement("span");
      n.replaceWith(s);
      s.append(n);
    }
  });

  // grow from the arrow; buttons without one grow from the click point (or centre for keyboard)
  const box = a.getBoundingClientRect();
  const origin = $(".btn__icon, .btn__arrow", a)?.getBoundingClientRect();
  const ox = origin ? origin.left + origin.width / 2 - box.left : e.detail ? e.clientX - box.left : box.width / 2;
  const oy = origin ? origin.top + origin.height / 2 - box.top : e.detail ? e.clientY - box.top : box.height / 2;
  const r = Math.hypot(Math.max(ox, box.width - ox), Math.max(oy, box.height - oy));
  const fill = document.createElement("span");
  fill.className = "btn__fill";
  fill.setAttribute("aria-hidden", "true");
  Object.assign(fill.style, { left: `${ox}px`, top: `${oy}px`, width: `${r * 2}px`, height: `${r * 2}px` });
  a.prepend(fill);
  void fill.offsetWidth;            // commit scale(0) before growing
  a.classList.add("is-filling");

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    go(a);
    setTimeout(() => {              // reset once we've moved away
      fill.style.opacity = "0";
      a.classList.remove("is-filling");
      setTimeout(() => fill.remove(), 300);
    }, 700);
  };
  fill.addEventListener("transitionend", ev => { if (ev.propertyName === "transform") finish(); });
  setTimeout(finish, 600);          // fallback if transitionend doesn't fire
});

/* ---------------- Header: scrolled state, hide-on-scroll, active link ---------------- */
(() => {
  const header = $("[data-header]");
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle("is-scrolled", y > 40 || header.hasAttribute("data-solid"));
    const menuOpen = document.body.classList.contains("menu-open");
    header.classList.toggle("is-hidden", !menuOpen && y > lastY && y > innerHeight * 0.6);
    lastY = y;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const links = $$("[data-nav]").filter(a => a.getAttribute("href").startsWith("#"));
  const map = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
      const a = map.get(e.target.id);
      if (a) { a.classList.add("is-active"); a.setAttribute("aria-current", "true"); }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => io.observe(s));
})();

/* ---------------- Full-screen menu ---------------- */
(() => {
  const btn = $("[data-menu-toggle]");
  const menu = $("[data-menu]");
  let lastFocus;

  const focusables = () => $$("a, button", menu).concat(btn);
  function open() {
    lastFocus = document.activeElement;
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add("is-open"));
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
    document.body.classList.add("menu-open");
    $("a", menu).focus({ preventScroll: true });
  }
  function close(restoreFocus = true) {
    menu.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");
    setTimeout(() => { if (!menu.classList.contains("is-open")) menu.hidden = true; }, reduceMotion ? 0 : 600);
    if (restoreFocus && lastFocus) lastFocus.focus({ preventScroll: true });
  }
  btn.addEventListener("click", () => (btn.getAttribute("aria-expanded") === "true" ? close() : open()));
  menu.addEventListener("click", e => { if (e.target.closest("a")) close(false); });
  document.addEventListener("keydown", e => {
    if (btn.getAttribute("aria-expanded") !== "true") return;
    if (e.key === "Escape") close();
    if (e.key === "Tab") {           // focus trap: menu links + toggle button
      const f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();

/* ---------------- Hero → intro staircase (scroll-linked) ----------------
   p = how far the white intro has risen over the pinned hero (0 → 1).
   Each column extends p × amp × viewport-height above the section edge; middle leads,
   outer columns lag, so the edge reads as a staircase. At p = 1 the section has fully
   covered the hero and the columns are off-screen above it — seamless. */
(() => {
  const cols = $$("[data-stairs] i");
  const hero = $(".hero");
  const heroInner = $(".hero__inner"), heroScroll = $(".hero__scroll");
  if (!cols.length || reduceMotion) return;
  const AMP = [0.12, 0.24, 0.46, 0.2, 0.05];
  let ticking = false;
  const render = () => {
    ticking = false;
    const vh = innerHeight;
    const p = Math.min(1, Math.max(0, scrollY / hero.offsetHeight));
    cols.forEach((c, i) => c.style.setProperty("--h", (AMP[i] * vh * p).toFixed(1)));
    // hero content drifts up and fades as it's covered
    heroInner.style.transform = `translate3d(0, ${(-p * 12).toFixed(2)}vh, 0)`;
    heroInner.style.opacity = (1 - p * 1.1).toFixed(3);
    heroScroll.style.opacity = (1 - p * 3).toFixed(3);
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(render); } }, { passive: true });
  addEventListener("resize", render);
  render();
})();

/* ---------------- Client ticker: infinite, seamless at any width ---------------- */
(() => {
  const track = $(".ticker__track");
  if (!track) return;
  const originals = $$("li", track);
  const SPEED = 70;   // px per second
  const build = () => {
    $$("li[data-clone]", track).forEach(li => li.remove());
    if (reduceMotion) return;   // static, wrapped row — no duplicates
    const setW = originals.reduce((w, li) => w + li.getBoundingClientRect().width, 0);
    if (!setW) return;
    // enough copies that the strip still covers the screen after shifting one full set
    const copies = Math.ceil((innerWidth + setW) / setW);
    for (let n = 0; n < copies; n++) {
      originals.forEach(li => {
        const c = li.cloneNode(true);
        c.dataset.clone = "";
        c.setAttribute("aria-hidden", "true");
        $("img", c).alt = "";
        track.appendChild(c);
      });
    }
    track.style.setProperty("--loop", `-${setW}px`);
    track.style.setProperty("--dur", `${setW / SPEED}s`);
  };
  build();
  let t;
  addEventListener("resize", () => { clearTimeout(t); t = setTimeout(build, 150); });
})();

/* ---------------- Work: "Now Showing" reel ----------------
   f = fractional index of the poster in focus (0 … n-1).
   Desktop (>860px): the reel pins; page scroll through it maps to f, and the track is translated.
   Narrow:           the viewport scrolls natively (scroll-snap); its scrollLeft maps to f.
   Everything visual (scale, dimming, credits, counter, film holes) is derived from f. */
let reelIds = WORK.map((_, i) => i);   // WORK indexes currently shown (after filter) — also used by the modal
let openCase = () => {};               // assigned by the modal below

(() => {
  const reel = $("[data-reel]"), track = $("[data-reel-track]"), viewport = $("[data-reel-viewport]");
  if (!reel) return;
  const credits = $("[data-credits]"), count = $("[data-reel-count]"), bar = $("[data-reel-bar]");
  const films = $$(".film"), prev = $("[data-reel-prev]"), next = $("[data-reel-next]");
  const wide = matchMedia("(min-width: 861px)");
  const CAT = { film: "Film promotion", brand: "Brand campaign", event: "Event campaign" };
  const STEP_VH = 55;   // scroll distance per poster on desktop
  let items = [], active = -1, f = 0, ticking = false, swapT;

  const pad = n => String(n).padStart(2, "0");
  const stepPx = () => (items[0]?.offsetWidth || 1) + parseFloat(getComputedStyle(track).columnGap || 0);
  const maxF = () => Math.max(0, items.length - 1);
  const reelTop = () => reel.getBoundingClientRect().top + scrollY;   // page offset (offsetTop is relative to the section)

  function build() {
    track.innerHTML = reelIds.map((id, k) => {
      const w = WORK[id];
      return `<li class="reel__item">
        <button type="button" class="poster" data-k="${k}" data-cursor-label="View" data-cursor-tone="${w.tone}"
          aria-label="${w.title}, ${CAT[w.cat]}. Open case study">
          <span class="poster__media"><img src="${IMG(w.img)}" alt="" loading="${k < 3 ? "eager" : "lazy"}" width="324" height="408"></span>
        </button></li>`;
    }).join("");
    items = $$(".reel__item", track);
    active = -1;
    layout();
  }

  // desktop: give the reel enough height to scroll through every poster while pinned
  function layout() {
    reel.style.height = wide.matches ? `calc(100svh + ${maxF() * STEP_VH}vh)` : "";
    track.style.transform = "";
    render();
  }

  function readF() {
    if (wide.matches) {
      const span = reel.offsetHeight - innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, (scrollY - reelTop()) / span)) : 0;
      return p * maxF();
    }
    return Math.min(maxF(), viewport.scrollLeft / stepPx());
  }

  function render() {
    ticking = false;
    if (!items.length) return;
    f = readF();
    const step = stepPx();
    if (wide.matches) {
      // centre the (fractional) focused poster in the viewport
      const x = viewport.clientWidth / 2 - (f * step + items[0].offsetWidth / 2);
      track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
    }
    items.forEach((li, k) => {
      const d = Math.min(1, Math.abs(k - f));
      li.style.setProperty("--s", (1 - d * 0.2).toFixed(3));
      li.style.setProperty("--o", (1 - d * 0.6).toFixed(3));
    });
    bar.style.setProperty("--p", (maxF() ? f / maxF() : 0).toFixed(4));
    films.forEach((el, i) => el.style.setProperty("--film", ((i ? 1 : -1) * f * step * 0.5).toFixed(1)));
    setActive(Math.round(f));
  }

  function fillCredits(k) {
    const w = WORK[reelIds[k]];
    $("[data-credits-cat]").textContent = CAT[w.cat];
    $("[data-credits-title]").textContent = w.title;
    $("[data-credits-summary]").textContent = w.summary;
    $("[data-credits-tags]").innerHTML = w.scope.slice(0, 3).map(t => `<li>${t}</li>`).join("");
    const stat = $("[data-credits-stat]");
    stat.hidden = !w.stat;
    if (w.stat) {
      $("[data-credits-num]").textContent = w.stat;
      $("[data-credits-label]").textContent = w.statLabel;
    }
    credits.classList.remove("is-swapping");
  }

  function setActive(k) {
    if (k === active) return;
    const first = active === -1;
    active = k;
    items.forEach((li, i) => {
      li.classList.toggle("is-active", i === k);
      $(".poster", li).setAttribute("aria-current", i === k ? "true" : "false");
    });
    count.textContent = `${pad(k + 1)} / ${pad(items.length)}`;
    prev.disabled = k === 0;
    next.disabled = k === items.length - 1;
    clearTimeout(swapT);
    if (first || reduceMotion) return fillCredits(k);
    credits.classList.add("is-swapping");   // quick fade out, swap text, fade back in
    swapT = setTimeout(() => fillCredits(active), 150);
  }

  function goTo(k) {
    k = Math.max(0, Math.min(maxF(), k));
    const behavior = reduceMotion ? "auto" : "smooth";
    if (wide.matches) {
      const span = reel.offsetHeight - innerHeight;
      scrollTo({ top: reelTop() + (maxF() ? (k / maxF()) * span : 0) + 1, behavior });
    } else {
      viewport.scrollTo({ left: k * stepPx(), behavior });
    }
  }

  const schedule = () => { if (!ticking) { ticking = true; requestAnimationFrame(render); } };
  addEventListener("scroll", () => wide.matches && schedule(), { passive: true });
  viewport.addEventListener("scroll", () => !wide.matches && schedule(), { passive: true });
  addEventListener("resize", layout);
  wide.addEventListener("change", layout);

  // click: off-centre poster → bring it to centre; centred poster → open the case study
  track.addEventListener("click", e => {
    const b = e.target.closest(".poster");
    if (!b) return;
    const k = +b.dataset.k;
    if (k === active) openCase(reelIds[k], b);
    else goTo(k);
  });
  // keyboard: arrows move through the reel, focus follows
  track.addEventListener("keydown", e => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const k = Math.max(0, Math.min(maxF(), active + (e.key === "ArrowRight" ? 1 : -1)));
    goTo(k);
    $(".poster", items[k]).focus({ preventScroll: true });
  });
  track.addEventListener("focusin", e => {
    const b = e.target.closest(".poster");
    if (b && b.matches(":focus-visible") && +b.dataset.k !== active) goTo(+b.dataset.k);
  });
  prev.addEventListener("click", () => goTo(active - 1));
  next.addEventListener("click", () => goTo(active + 1));
  $("[data-credits-open]").addEventListener("click", e => openCase(reelIds[active], e.currentTarget));

  // filters rebuild the reel and rewind it to the first poster
  const chips = $$("[data-filter]");
  chips.forEach(c => c.addEventListener("click", () => {
    const flt = c.dataset.filter;
    chips.forEach(x => { const on = x === c; x.classList.toggle("is-active", on); x.setAttribute("aria-pressed", on); });
    reelIds = WORK.map((_, i) => i).filter(i => flt === "all" || WORK[i].cat === flt);
    const inReel = wide.matches && scrollY > reelTop();
    build();
    if (inReel) scrollTo({ top: reelTop() + 1, behavior: "auto" });
    else viewport.scrollLeft = 0;
    render();
  }));

  build();
})();

/* ---------------- Case study modal ---------------- */
(() => {
  const modal = $("[data-modal]");
  if (!modal) return;
  let idx = 0, opener;

  function render(i) {
    idx = i;
    const w = WORK[i];
    $("[data-modal-img]").src = IMG(w.img, 1024);
    $("[data-modal-img]").alt = `${w.title} campaign poster`;
    $("[data-modal-cat]").textContent = w.cat === "film" ? "Film promotion" : w.cat === "event" ? "Event campaign" : "Brand campaign";
    $("[data-modal-title]").textContent = w.title;
    $("[data-modal-summary]").textContent = w.summary;
    $("[data-modal-scope]").innerHTML = w.scope.map(s => `<li>${s}</li>`).join("");
    $("[data-modal-result]").textContent = w.result;
    $("[data-modal-cta]").dataset.service = w.cat === "film" ? "Film Collaborations" : w.cat === "brand" ? "Branding & Design" : "Social Media Campaigns";
  }
  function step(d) {
    const p = reelIds.indexOf(idx);
    render(reelIds[(p + d + reelIds.length) % reelIds.length]);
  }
  openCase = (i, from) => {
    opener = from;
    render(i);
    modal.showModal();
    document.body.classList.add("modal-open");
    // <dialog> sits in the browser's top layer, above our cursor — use the native one while it's open
    document.documentElement.classList.remove("has-cursor");
  };
  modal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (matchMedia("(pointer: fine)").matches) document.documentElement.classList.add("has-cursor");
    opener?.focus({ preventScroll: true });
  });
  modal.addEventListener("click", e => { if (e.target === modal) modal.close(); }); // backdrop
  $("[data-modal-close]").addEventListener("click", () => modal.close());
  $("[data-modal-prev]").addEventListener("click", () => step(-1));
  $("[data-modal-next]").addEventListener("click", () => step(1));
  modal.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  $("[data-modal-cta]").addEventListener("click", e => {
    opener = null;
    modal.close();
    preselectService(e.currentTarget.dataset.service);
  });
})();

/* ---------------- Services accordion ---------------- */
(() => {
  const root = $("[data-accordion]");
  if (!root) return;
  root.innerHTML = SERVICES.map((s, i) => `
    <div class="acc${i === 0 ? " is-open" : ""}">
      <button type="button" class="acc__head" id="acc-h-${i}" aria-expanded="${i === 0}" aria-controls="acc-p-${i}">
        <span class="acc__titles"><span class="acc__title">${s.title}</span><span class="acc__sub">${s.sub}</span></span>
        <span class="acc__dots" aria-hidden="true">${[1, 2, 3, 4].map(n => `<i class="${n <= s.level ? "on" : ""}"></i>`).join("")}</span>
        <span class="acc__plus" aria-hidden="true">+</span>
      </button>
      <div class="acc__panel" id="acc-p-${i}" role="region" aria-labelledby="acc-h-${i}">
        <div><div class="acc__inner">
          <p>${s.body}</p>
          <ul class="tags">${s.tags.map(t => `<li>${t}</li>`).join("")}</ul>
          <div><a href="#contact" class="btn btn--accent btn--sm" data-service="${s.form}">Discuss ${s.title.split(" ")[0]} →</a></div>
        </div></div>
      </div>
    </div>`).join("");

  root.addEventListener("click", e => {
    const head = e.target.closest(".acc__head");
    if (head) {
      const item = head.parentElement;
      const willOpen = !item.classList.contains("is-open");
      $$(".acc", root).forEach(a => { a.classList.remove("is-open"); $(".acc__head", a).setAttribute("aria-expanded", "false"); });
      if (willOpen) { item.classList.add("is-open"); head.setAttribute("aria-expanded", "true"); }
      return;
    }
    const cta = e.target.closest("[data-service]");
    if (cta) preselectService(cta.dataset.service);
  });
})();

/* Pre-tick a service in the contact form and flash it so the user sees it happened */
function preselectService(name) {
  const input = $$('[name="service"]').find(i => i.value === name);
  if (!input) return;
  input.checked = true;
  const label = input.closest(".choice");
  label.classList.remove("flash");
  void label.offsetWidth;
  label.classList.add("flash");
  setTimeout(() => $("#f-name").focus({ preventScroll: true }), reduceMotion ? 0 : 700);
}

/* ---------------- Counters (final value is in the HTML, so no-JS / SR users never see "0X") ---------------- */
(() => {
  const els = $$(".counter");
  els.forEach(el => {
    const dd = el.parentElement;
    dd.setAttribute("aria-label", el.textContent);
    el.setAttribute("aria-hidden", "true");
  });
  if (reduceMotion) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      io.unobserve(target);
      const to = +target.dataset.to, suf = target.dataset.suffix, t0 = performance.now(), dur = 1400;
      const tick = now => {
        const p = Math.min(1, (now - t0) / dur), eased = 1 - Math.pow(1 - p, 4);
        target.textContent = Math.round(to * eased) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  els.forEach(el => io.observe(el));
})();

/* ---------------- Reveal on scroll ---------------- */
(() => {
  const els = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("is-in")); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -10% 0px" });
  els.forEach(e => io.observe(e));
})();

/* ---------------- Copy email ---------------- */
document.addEventListener("click", async e => {
  const b = e.target.closest("[data-copy]");
  if (!b) return;
  try {
    await navigator.clipboard.writeText(b.dataset.copy);
    toast("Email copied — talk soon!");
  } catch {
    toast(b.dataset.copy);
  }
});

/* ---------------- Quick contact links (only rendered when configured) ---------------- */
(() => {
  const box = $("[data-quick-links]");
  if (!box) return;
  const items = [];
  if (CONFIG.whatsapp) items.push(`<a class="btn btn--pill" href="https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Hi Hytz! I'd like to discuss a project.")}" target="_blank" rel="noopener">WhatsApp us</a>`);
  if (CONFIG.phone) items.push(`<a class="btn btn--pill" href="tel:${CONFIG.phone}">Call us</a>`);
  if (CONFIG.instagram) items.push(`<a class="btn btn--pill" href="${CONFIG.instagram}" target="_blank" rel="noopener">Instagram</a>`);
  if (CONFIG.linkedin) items.push(`<a class="btn btn--pill" href="${CONFIG.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`);
  if (CONFIG.facebook) items.push(`<a class="btn btn--pill" href="${CONFIG.facebook}" target="_blank" rel="noopener">Facebook</a>`);
  if (items.length) box.innerHTML = items.join("");
  else box.remove();
})();

/* ---------------- Contact form ---------------- */
(() => {
  const form = $("[data-form]");
  if (!form) return;
  const status = $("[data-form-status]");
  const submit = $("[data-submit]");
  const rules = {
    name: v => v.trim().length >= 2 || "Please tell us your name.",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "That email doesn't look right.",
    message: v => v.trim().length >= 10 || "A sentence or two helps us reply properly (10+ characters).",
  };
  function check(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const res = rule(input.value);
    const field = input.closest(".field");
    const err = $(".field__err", field);
    const ok = res === true;
    field.classList.toggle("has-error", !ok);
    input.setAttribute("aria-invalid", !ok);
    input.setAttribute("aria-describedby", err.id);
    err.textContent = ok ? "" : res;
    return ok;
  }
  // validate on blur, then live once a field has been flagged
  form.addEventListener("focusout", e => { if (rules[e.target.name] && e.target.value) check(e.target); });
  form.addEventListener("input", e => { if (e.target.closest(".has-error")) check(e.target); });

  // pre-filled mailto, used as the fallback whenever the email service can't be reached
  const mailtoFor = d => {
    const body = [
      `Name: ${d.name}`, `Email: ${d.email}`, `Company: ${d.company || "-"}`,
      `Services: ${d.services}`, `Budget: ${d.budget || "-"}`, "", d.message,
    ].join("\n");
    return `mailto:${CONFIG.email}?subject=${encodeURIComponent(`New project enquiry — ${d.name}`)}&body=${encodeURIComponent(body)}`;
  };

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const fields = ["name", "email", "message"].map(n => form.elements[n]);
    const bad = fields.filter(f => !check(f));
    if (bad.length) { bad[0].focus(); status.className = "form__status err"; status.textContent = "Please fix the highlighted fields."; return; }
    if (form.elements._honey.value) return; // bot

    const fd = new FormData(form);
    const d = {
      name: fd.get("name").trim(), email: fd.get("email").trim(), company: fd.get("company").trim(),
      services: fd.getAll("service").join(", ") || "Not specified", budget: fd.get("budget"), message: fd.get("message").trim(),
    };
    submit.setAttribute("aria-busy", "true");
    $(".btn__label", submit).textContent = "Sending…";
    status.className = "form__status"; status.textContent = "";

    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Name: d.name, Email: d.email, Company: d.company || "-", Services: d.services, Budget: d.budget || "-", Message: d.message,
          email: d.email,                                   // FormSubmit uses this as the reply-to
          _subject: `New project enquiry — ${d.name}${d.company ? ` (${d.company})` : ""}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === "false") throw new Error(json.message || res.status);
      form.classList.add("is-sent");
      form.innerHTML = `<h3 class="display" style="font-size:40px">Thank you<span class="dot">.</span></h3>
        <p class="muted">Your enquiry is in our inbox at ${CONFIG.email}. We'll reply within one working day.</p>`;
    } catch {
      status.className = "form__status err";
      status.textContent = "Couldn't send right now. ";
      const a = document.createElement("a");
      a.href = mailtoFor(d);
      a.textContent = `Email it to ${CONFIG.email} instead →`;
      status.append(a);
    } finally {
      submit.removeAttribute("aria-busy");
      const lbl = $(".btn__label", submit);
      if (lbl) lbl.textContent = "Send enquiry";
    }
  });
})();

/* ---------------- Footer year ---------------- */
$("[data-year]").textContent = new Date().getFullYear();

/* ==========================================================
   Cursor trail
   - the native pointer always stays visible; a filled circle
     follows it with a lag (frame-rate independent easing)
   - colour is picked from what's under the pointer so it never blends in:
       data-cursor-tone on an ancestor -> that tone (per-poster)
       orange background               -> ink (never orange-on-orange)
       anything else (black, paper, white logo, images) -> brand orange
   ========================================================== */
(() => {
  if (!matchMedia("(pointer: fine)").matches) return;
  document.documentElement.classList.add("has-cursor");
  const cur = $(".cursor"), trail = $(".cursor__trail"), label = $(".cursor__label");
  const ACCENT = [255, 70, 46];
  const FOLLOW = 0.1;   // fraction of the remaining distance covered per 60fps frame — lower = lazier trail
  let x = 0, y = 0, tx = 0, ty = 0, started = false, lastEl = null, lastT = performance.now();
  const toneCache = new WeakMap();

  const parse = c => (c.match(/[\d.]+/g) || []).map(Number);
  const near = (a, b, tol = 70) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < tol;

  function bgTone(el) {
    if (toneCache.has(el)) return toneCache.get(el);
    let tone = "accent";
    const override = el.closest("[data-cursor-tone]");
    if (override) tone = override.dataset.cursorTone;
    else {
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const c = parse(getComputedStyle(n).backgroundColor);
        if (c.length >= 3 && (c[3] === undefined || c[3] > 0.5)) { tone = near(c, ACCENT) ? "ink" : "accent"; break; }
      }
    }
    toneCache.set(el, tone);
    return tone;
  }

  function update(el) {
    if (!el || el === lastEl) return;
    lastEl = el;
    const interactive = el.closest("a, button, label.choice, summary, [data-cursor-label]");
    const textField = el.closest("input:not([type=checkbox]), textarea, select");
    // Colour comes from what's behind the hovered control, so an orange button turns the trail ink.
    const lbl = interactive?.dataset.cursorLabel || "";
    // labelled bubbles ("View", "Read", "Visit") are always brand orange so they look the same on every poster
    const tone = lbl ? "accent" : bgTone(el);
    cur.dataset.tone = tone === "accent" ? "" : tone;
    label.textContent = lbl;
    cur.classList.toggle("has-label", !!lbl);
    cur.classList.toggle("is-link", !!interactive && !lbl);
    cur.classList.toggle("is-text", !!textField);
  }

  addEventListener("pointermove", e => {
    x = e.clientX; y = e.clientY;
    if (!started) { tx = x; ty = y; started = true; }   // first move: appear under the pointer, don't fly in
    update(document.elementFromPoint(x, y));
    cur.classList.remove("is-hidden");
  }, { passive: true });
  // content moves under a still pointer when scrolling — re-evaluate
  addEventListener("scroll", () => { if (started) { lastEl = null; update(document.elementFromPoint(x, y)); } }, { passive: true });
  addEventListener("pointerdown", () => cur.classList.add("is-down"));
  addEventListener("pointerup", () => cur.classList.remove("is-down"));
  document.documentElement.addEventListener("mouseleave", () => cur.classList.add("is-hidden"));
  document.documentElement.addEventListener("mouseenter", () => started && cur.classList.remove("is-hidden"));

  const loop = now => {
    const dt = Math.min(64, now - lastT); lastT = now;
    const k = reduceMotion ? 1 : 1 - Math.pow(1 - FOLLOW, dt / 16.67);
    tx += (x - tx) * k; ty += (y - ty) * k;
    trail.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
})();
