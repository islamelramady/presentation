/* ============================================================
   main.js — presentation engine
   Renders the deck from slides.js and drives navigation,
   overview, presenter notes, lightbox, bilingual UI.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const pad = (n) => String(n).padStart(2, "0");
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- bilingual UI strings ---------- */
  const UI = {
    en: {
      print: "Print", notes: "Notes", overview: "Overview", navigate: "navigate",
      shortcuts: "shortcuts", presenterNotes: "Presenter notes", slideOverview: "Slide overview",
      showAppendix: "Show appendix", langBtn: "عربي", next: "Next slide", prev: "Previous slide",
      screenshotsWhere: "Where do the screenshots go?",
      screenshotsWhereBody: "Put every screenshot in the <code>assets/img/</code> folder using the exact file name printed on each placeholder — the slide swaps the placeholder for your picture automatically.",
      shotSlot: "Screenshot slot", zoom: "Click to zoom", copy: "Copy path", copied: "Path copied",
      noNote: "No note for this slide.",
      keys: [
        [["→", "↓", "Space"], "Next slide"], [["←", "↑"], "Previous slide"],
        [["Home"], "First slide"], [["End"], "Last slide"],
        [["O"], "Slide overview"], [["N"], "Presenter notes"],
        [["F"], "Fullscreen"], [["A"], "Show / hide appendix"],
        [["P"], "Print / save as PDF"], [["Esc"], "Close overlay"],
        [["?"], "This help"]
      ]
    },
    ar: {
      print: "طباعة", notes: "ملاحظات", overview: "نظرة عامة", navigate: "تنقل",
      shortcuts: "الاختصارات", presenterNotes: "ملاحظات المحاضر", slideOverview: "شرائح العرض",
      showAppendix: "إظهار الملحق", langBtn: "English", next: "الشريحة التالية", prev: "الشريحة السابقة",
      screenshotsWhere: "أين أضع لقطات الشاشة؟",
      screenshotsWhereBody: "ضع كل لقطة شاشة في مجلد <code>assets/img/</code> بنفس اسم الملف المكتوب على الإطار الفارغ — وستستبدل الشريحة الإطار الفارغ بالصورة تلقائيًا.",
      shotSlot: "مكان لقطة الشاشة", zoom: "اضغط للتكبير", copy: "نسخ المسار", copied: "تم نسخ المسار",
      noNote: "لا توجد ملاحظات لهذه الشريحة.",
      keys: [
        [["→", "↓", "Space"], "الشريحة التالية"], [["←", "↑"], "الشريحة السابقة"],
        [["Home"], "أول شريحة"], [["End"], "آخر شريحة"],
        [["O"], "نظرة عامة على الشرائح"], [["N"], "ملاحظات المحاضر"],
        [["F"], "ملء الشاشة"], [["A"], "إظهار / إخفاء الملحق"],
        [["P"], "طباعة / حفظ PDF"], [["Esc"], "إغلاق النافذة"],
        [["?"], "هذه المساعدة"]
      ]
    }
  };

  /* ---------- state ---------- */
  let LANG  = store.get("pca-lang", "en");
  let cur   = 0;
  let nav   = [];              // visible slide indices
  let notesOn  = store.get("pca-notes", "0") === "1";
  let appendix = store.get("pca-appendix", "0") === "1";
  let built = false;
  let timerSec = 0, timerId = null;

  const L = (v) => {
    if (v === null || v === undefined) return "";
    if (typeof v === "string") return v;
    return v[LANG] !== undefined ? v[LANG] : v.en;
  };
  const secOf = (s) => DECK.sections[s.section] || DECK.sections.intro;

  /* ============================================================
     RENDER
     ============================================================ */
  function head(s, concise) {
    let h = "";
    if (s.title)  h += `<h2 class="slide-title">${L(s.title)}</h2>`;
    if (!concise && s.kicker) h = `<div class="kicker">${L(s.kicker)}${s.step ? ` <span class="n">· ${L(s.step)}</span>` : ""}</div>` + h;
    if (!concise && s.sub)    h += `<p class="slide-sub">${L(s.sub)}</p>`;
    return h;
  }

  function calloutHTML(c) {
    if (!c) return "";
    const ico = c.kind === "warn" ? "i-alert" : c.kind === "good" ? "i-check" : "i-help";
    return `<div class="callout ${c.kind || "info"}">
      <svg class="ico"><use href="#${ico}"></use></svg><p>${L(c.text)}</p></div>`;
  }

  function shotsHTML(list, cols, extraClass) {
    if (!list || !list.length) return "";
    const n = cols || (list.length === 1 ? 1 : list.length === 2 ? 2 : 2);
    return `<div class="shots s${n}${extraClass ? ` ${extraClass}` : ""}">` + list.map((sh, i) => `
      <figure class="shot" data-file="${sh.file}">
        <span class="zoom-hint">${UI[LANG].zoom}</span>
        <div class="shot-media">
          <div class="ph">
            <span class="ph-ico"><svg class="ico"><use href="#i-camera"></use></svg></span>
            <span class="ph-label">${UI[LANG].shotSlot}</span>
            <p class="ph-what">${L(sh.hint)}</p>
            <span class="ph-file" title="${UI[LANG].copy}">
              <svg class="ico"><use href="#i-copy"></use></svg>assets/img/${sh.file}.png
            </span>
          </div>
        </div>
        <figcaption class="shot-cap">
          <span class="cap-n">${pad(i + 1)}</span>
          <span><b>${L(sh.cap)}</b>${sh.detail ? `<small>${L(sh.detail)}</small>` : ""}</span>
        </figcaption>
      </figure>`).join("") + `</div>`;
  }

  function cardsHTML(list, cls) {
    return `<div class="cards ${cls || "c" + Math.min(list.length, 4)}">` + list.map((c, i) => `
      <div class="card">
        ${c.n ? `<span class="n">${c.n}</span>` : ""}
        ${c.ico ? `<div class="ico-lg"><svg class="ico"><use href="#${c.ico}"></use></svg></div>` : ""}
        <h3>${L(c.h)}</h3>
        <p>${L(c.p)}</p>
      </div>`).join("") + `</div>`;
  }

  function numberedHTML(list, cls) {
    if (!list || !list.length) return "";
    return `<div class="cards ${cls || "c2"}">` + list.map((c) => `
      <div class="card">
        <span class="n">${c.n}</span>
        <h3>${L(c.h)}</h3>
        <p>${L(c.p)}</p>
      </div>`).join("") + `</div>`;
  }

  function bulletsRich(list) {
    return `<ul class="bullets">` + list.map((b) => `<li>${L(b)}</li>`).join("") + `</ul>`;
  }

  function stepsHTML(list) {
    return `<ol class="steps">` + list.map((s) => `<li>${L(s)}</li>`).join("") + `</ol>`;
  }

  function body(s) {
    switch (s.layout) {

      case "cover":
        return `<div class="inner cover">
            <span class="cover-badge">${L(s.badge)}</span>
            <h1 class="cover-title"><span>${L(s.title)}</span></h1>
            <p class="cover-sub">${L(s.sub)}</p>
            <div class="cover-meta">${(s.meta || []).map((m) => `
              <span class="meta-pill"><svg class="ico"><use href="#${m.icon}"></use></svg>${L(m.text)}</span>`).join("")}</div>
          </div>
          <div class="inner" style="margin-top:clamp(14px,2.4vh,26px)">${shotsHTML(s.shots, 1)}</div>`;

      case "objectives":
        return `<div class="inner">
            ${head(s)}
            <div class="obj">${(s.objectives || []).map((o) => `
              <div class="obj-row">
                <span class="obj-num">${L(o.n)}</span>
                <span>
                  <span class="obj-text">${L(o.en)}</span>
                  <span class="obj-note">${o.note ? L(o.note) : ""}</span>
                </span>
              </div>`).join("")}</div>
          </div>`;

      case "roadmap":
        return `<div class="inner">
            ${head(s)}
            <div class="cards c${Math.min((s.phases || []).length, 4)}">${(s.phases || []).map((p) => `
              <div class="card">
                <div class="ico-lg"><svg class="ico"><use href="#${p.ico}"></use></svg></div>
                <span class="n">${p.n}</span>
                <h3>${L({ en: p.en, ar: p.ar })}</h3>
              </div>`).join("")}</div>
            <div class="split wide-left">
              <div class="col">${bulletsRich(s.bullets || [])}</div>
              <div class="col">${calloutHTML(s.callout)}</div>
            </div>
          </div>`;

      case "divider":
        return `<div class="inner">
            <span class="div-num">${s.num}</span>
            <div class="div-line"></div>
            <h2 class="div-title">${L(s.title)}</h2>
            <p class="div-sub">${L(s.sub)}</p>
          </div>`;

      case "split":
        if (s.visual) return `<div class="inner visual-slide">
            ${head(s, true)}
            ${shotsHTML(s.shots, (s.shots || []).length > 1 ? 2 : 1)}
            ${s.visualNote ? `<p class="visual-note">${L(s.visualNote)}</p>` : ""}
          </div>`;
        return `<div class="inner">
            ${head(s)}
            <div class="split ${(s.shots || []).length > 1 ? "wide-left" : ""}">
              <div class="col">
                ${s.steps ? stepsHTML(s.steps) : ""}
                ${s.bullets ? bulletsRich(s.bullets) : ""}
                ${calloutHTML(s.callout)}
              </div>
              <div class="col">${shotsHTML(s.shots)}</div>
            </div>
          </div>`;

      case "stack":
        if (s.visual) return `<div class="inner visual-slide">
            ${head(s, true)}
            ${numberedHTML(s.cards2, "c2")}
            ${shotsHTML(s.shots, (s.shots || []).length > 1 ? 2 : 1)}
          </div>`;
        return `<div class="inner">
            ${head(s)}
            ${s.bullets ? bulletsRich(s.bullets) : ""}
            ${numberedHTML(s.cards2, "c2")}
            ${calloutHTML(s.callout)}
            ${shotsHTML(s.shots)}
          </div>`;

      case "cards":
        return `<div class="inner">
            ${head(s, s.visual)}
            ${cardsHTML(s.cards || [], "c" + Math.min((s.cards || []).length, 5))}
            ${s.visualNote ? `<p class="visual-note">${L(s.visualNote)}</p>` : ""}
            ${calloutHTML(s.callout)}
          </div>`;

      case "install-methods":
        return `<div class="inner install-inner">
            ${head(s, true)}
            <div class="install-methods">${(s.methods || []).map((m) => `
              <article class="install-method">
                <div class="install-method-head">
                  <span class="install-method-icon"><svg class="ico"><use href="#${m.ico}"></use></svg></span>
                  <div><h3>${L(m.h)}</h3><span class="install-method-label">${L(m.label)}</span></div>
                </div>
                <p class="install-method-intro">${L(m.intro)}</p>
                <div class="install-flow">${(m.steps || []).map((step, i) => `
                  ${i ? `<svg class="ico install-arrow" aria-hidden="true"><use href="#i-chev-right"></use></svg>` : ""}
                  <div class="install-step"><span>${String(i + 1).padStart(2, "0")}</span><b>${L(step)}</b></div>`).join("")}
                </div>
              </article>`).join("")}</div>
          </div>`;

      case "backup-path":
        return `<div class="inner install-inner backup-inner">
            ${head(s, true)}
            <div class="backup-layout">
              <article class="install-method backup-method">
                <div class="install-method-head">
                  <span class="install-method-icon"><svg class="ico"><use href="#${s.method.ico}"></use></svg></span>
                  <div><h3>${L(s.method.h)}</h3><span class="install-method-label">${L(s.method.label)}</span></div>
                </div>
                <p class="install-method-intro">${L(s.method.intro)}</p>
                <div class="install-flow">${s.method.steps.map((step, i) => `
                  ${i ? `<svg class="ico install-arrow" aria-hidden="true"><use href="#i-chev-right"></use></svg>` : ""}
                  <div class="install-step"><span>${String(i + 1).padStart(2, "0")}</span><b>${L(step)}</b></div>`).join("")}
                </div>
              </article>
              ${shotsHTML(s.shots, 1, "backup-shot")}
            </div>
          </div>`;

      case "welcome-options":
        return `<div class="inner welcome-inner">
            ${head(s, true)}
            <div class="welcome-options">${(s.options || []).map((option, i) => `
              <article class="welcome-option${option.selected ? " selected" : ""}">
                <span class="welcome-option-number">${String(i + 1).padStart(2, "0")}</span>
                <span class="welcome-option-icon"><svg class="ico"><use href="#${option.ico}"></use></svg></span>
                <div class="welcome-option-copy">
                  <h3>${L(option.h)}</h3>
                  <p>${L(option.p)}</p>
                </div>
                ${option.selected ? `<span class="welcome-option-pick">${L(t("TODAY’S CHOICE", "اختيارنا اليوم"))}</span>` : ""}
              </article>`).join("")}</div>
          </div>`;

      case "sample-path":
        return `<div class="inner sample-inner">
            ${head(s, true)}
            <div class="sample-steps">${(s.steps || []).map((step, i) => `
              ${i ? `<svg class="ico sample-arrow" aria-hidden="true"><use href="#i-chev-right"></use></svg>` : ""}
              <article class="sample-step">
                <span class="sample-step-number">${step.n}</span>
                <span class="sample-step-icon"><svg class="ico"><use href="#${step.ico}"></use></svg></span>
                <h3>${L(step.h)}</h3>
                <p>${L(step.p)}</p>
              </article>`).join("")}</div>
            ${shotsHTML(s.shots, 2, "sample-shots")}
          </div>`;

      case "uninstall-route":
        return `<div class="inner uninstall-inner">
            ${head(s, true)}
            <div class="uninstall-layout">
              <div class="uninstall-route">
                <span class="uninstall-route-label">${L(s.routeLabel)}</span>
                ${(s.steps || []).map((step, i) => `
                  <article class="uninstall-step${i === s.steps.length - 1 ? " final" : ""}">
                    <span class="uninstall-step-number">${step.n}</span>
                    <span class="uninstall-step-icon"><svg class="ico"><use href="#${step.ico}"></use></svg></span>
                    <span class="uninstall-step-copy">
                      <small>${L(t("STEP", "الخطوة"))} ${step.n}</small>
                      <h3>${L(step.h)}</h3>
                      <p>${L(step.p)}</p>
                    </span>
                  </article>`).join("")}
              </div>
              <aside class="uninstall-finish">
                <span class="uninstall-finish-label">${L(s.finishLabel)}</span>
                <span class="uninstall-finish-icon"><svg class="ico"><use href="#i-close"></use></svg></span>
                <h3>${L(t("This is where Peachtree is removed", "هنا تتم إزالة Peachtree"))}</h3>
                <div class="uninstall-breadcrumb">
                  <span>Control Panel</span><b>›</b><span>Programs</span><b>›</b><span>Uninstall</span>
                </div>
              </aside>
            </div>
          </div>`;

      case "menu-map":
        return `<div class="inner">
            ${head(s)}
            <div class="ribbon">${L(s.ribbon).split(" ").map((w) => `<span>${w}</span>`).join("")}</div>
            <div class="menu-map">${(s.menus || []).map((m) => `
              <div class="menu-block">
                <div class="menu-head"><span class="menu-name">${m.name}</span><span class="menu-tag">${L(m.tag)}</span></div>
                <ul class="menu-items">${m.items[LANG].map((it) => `<li><span class="b"></span>${it}</li>`).join("")}</ul>
              </div>`).join("")}</div>
          </div>`;

      case "menu-detail":
        return `<div class="inner">
            ${head(s)}
            <div class="split wide-left">
              <div class="col">
                <ul class="menu-items" style="padding:0">${(s.items || []).map((it) => `<li><span class="b"></span>${L(it)}</li>`).join("")}</ul>
                ${calloutHTML(s.callout)}
              </div>
              <div class="col">${shotsHTML(s.shots, 1)}</div>
            </div>
          </div>`;

      case "menu-gallery":
        return `<div class="inner">
            ${head(s, true)}
            ${shotsHTML(s.shots, s.columns || 3, "menu-shots")}
            ${s.visualNote ? `<p class="visual-note">${L(s.visualNote)}</p>` : ""}
          </div>`;

      case "resources":
        return `<div class="inner">
            ${head(s)}
            <div class="cards c3">${(s.links || []).map((lk) => `
              <a class="link-card" href="${lk.url}" target="_blank" rel="noopener">
                <div class="ico-lg"><svg class="ico"><use href="#${lk.ico}"></use></svg></div>
                <div><h3>${L(lk.h)}</h3><p>${lk.url}</p></div>
              </a>`).join("")}</div>
            ${calloutHTML(s.callout)}
          </div>`;

      case "thanks":
        return `<div class="inner">
            <h2 class="big-thanks">${L(s.title)}</h2>
            <p class="div-sub">${L(s.sub)}</p>
            <div class="qmark-grid">${(s.points || []).map((p) => `<span class="chip on">${L(p)}</span>`).join("")}</div>
          </div>`;

      case "checklist":
        return `<div class="inner">
            ${head(s)}
            <div class="check-groups">${(s.groups || []).map((g) => `
              <div class="check-group">
                <h3>${L(g.h)}</h3>
                <ul>${g.items.map((it) => `
                  <li data-file="${it.f}"><span class="box"><svg class="ico" style="font-size:11px"><use href="#i-check"></use></svg></span>
                    <span><code>${it.f}.png</code><br>${L(it.d)}</span></li>`).join("")}</ul>
              </div>`).join("")}</div>
          </div>`;

      default:
        return `<div class="inner">${head(s)}</div>`;
    }
  }

  function buildDeck() {
    const deck = $("#deck");
    deck.innerHTML = SLIDES.map((s, i) => {
      const sec = secOf(s);
      return `<section class="slide layout-${s.layout}" data-i="${i}" data-section="${s.section}"
                ${s.appendix ? "data-appendix=\"1\"" : ""} style="--sec:${sec.color}"
                aria-label="Slide ${i + 1}" aria-hidden="true">${body(s)}</section>`;
    }).join("");
    built = true;
    refreshNav();
    hydrate();
    checkChecklist();
  }

  /* ---------- navigation list (respects appendix) ---------- */
  function refreshNav() {
    nav = SLIDES.map((s, i) => i).filter((i) => appendix || !SLIDES[i].appendix);
    $("#total").textContent = nav.length;

    const dots = $("#dots");
    dots.innerHTML = nav.map((i) =>
      `<span class="dot-nav" data-go="${i}" title="${pad(i + 1)}"></span>`).join("");

    buildOverview();
    if (!nav.includes(cur)) cur = nav[0];
  }

  function buildOverview() {
    const grid = $("#overviewGrid");
    grid.innerHTML = nav.map((i) => {
      const s = SLIDES[i], sec = secOf(s);
      return `<button class="ov-card" data-go="${i}">
                <span class="ov-sec" style="background:${sec.color}"></span>
                <span class="ov-n">${pad(i + 1)}</span>
                <span class="ov-t">${L(s.title) || L(s.badge) || ""}</span>
                <span class="ov-s">${L(sec.name)}</span>
              </button>`;
    }).join("");
  }

  /* ---------- screenshot hydration ---------- */
  const EXT = [".svg", ".png", ".jpg", ".jpeg", ".webp", ".SVG", ".PNG", ".JPG", ".JPEG"];

  function loadImage(file) {
    return new Promise((resolve) => {
      let i = 0;
      (function attempt() {
        if (i >= EXT.length) return resolve(null);
        const src = "assets/img/" + file + EXT[i++];
        const img = new Image();
        img.onload = () => resolve({ src: src, el: img });
        img.onerror = attempt;
        img.src = src;
      })();
    });
  }

  async function hydrate() {
    const figures = $$(".shot");
    await Promise.all(figures.map(async (fig) => {
      const file = fig.dataset.file;
      const found = await loadImage(file);
      if (!found) return;
      const media = $(".shot-media", fig);
      const img = document.createElement("img");
      img.src = found.src;
      img.alt = file;
      img.loading = "eager";
      media.innerHTML = "";
      media.appendChild(img);
      fig.classList.add("has-img");
    }));
  }

  function checkChecklist() {
    $$(".check-group li[data-file]").forEach(async (li) => {
      const found = await loadImage(li.dataset.file);
      if (found) li.classList.add("done");
    });
  }

  /* ---------- go to slide ---------- */
  function go(i, skipHash) {
    if (!nav.length) return;
    cur = Math.max(0, nav.indexOf(i) < 0 ? 0 : nav.indexOf(i));
    const idx = nav[cur];

    $$(".slide").forEach((el) => {
      const on = Number(el.dataset.i) === idx;
      el.classList.toggle("active", on);
      el.setAttribute("aria-hidden", on ? "false" : "true");
    });
    $$(".dot-nav").forEach((d, k) => d.classList.toggle("active", k === cur));
    $$(".ov-card").forEach((d, k) => d.classList.toggle("active", k === cur));

    $("#cur").textContent = cur + 1;
    $("#progressBar").style.width = ((cur + 1) / nav.length * 100) + "%";

    const sec = secOf(SLIDES[idx]);
    $("#sectionName").textContent = L(sec.name);
    $("#sectionTag .dot").style.background = sec.color;
    $("#sectionTag .dot").style.boxShadow = "0 0 12px " + sec.color;

    $("#btnPrev").disabled = cur === 0;
    $("#btnNext").disabled = cur === nav.length - 1;

    const note = L(SLIDES[idx].note);
    $("#notesBody").innerHTML = note
      ? note
      : `<em style="color:var(--txt-3)">${UI[LANG].noNote}</em>`;

    if (!skipHash) history.replaceState(null, "", "#" + (idx + 1));
  }

  const next = () => go(nav[Math.min(cur + 1, nav.length - 1)]);
  const prev = () => go(nav[Math.max(cur - 1, 0)]);

  /* ---------- notes ---------- */
  function toggleNotes(force) {
    notesOn = typeof force === "boolean" ? force : !notesOn;
    store.set("pca-notes", notesOn ? "1" : "0");
    $("#notes").hidden = !notesOn;
    $("#btnNotes").classList.toggle("is-on", notesOn);
  }

  /* ---------- appendix ---------- */
  function toggleAppendix(force) {
    appendix = typeof force === "boolean" ? force : !appendix;
    store.set("pca-appendix", appendix ? "1" : "0");
    $("#tgAppendix").checked = appendix;
    $$(".slide[data-appendix]").forEach((el) => { el.hidden = !appendix; });
    refreshNav();
    go(cur, true);
  }

  /* ---------- overlays ---------- */
  const openModal = (m) => { m.hidden = false; };
  const closeModal = (m) => { m.hidden = true; };
  const anyModalOpen = () => $$(".modal").some((m) => !m.hidden) || !$("#lightbox").hidden;

  function openLightbox(fig) {
    const img = $("img", fig), cap = $(".shot-cap", fig);
    $("#lbImg").src = img.src;
    $("#lbCap").innerHTML = cap ? cap.innerHTML : "";
    openModal($("#lightbox"));
  }

  /* ---------- toast ---------- */
  let toastId = null;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastId);
    toastId = setTimeout(() => { el.hidden = true; }, 1800);
  }

  function copyPath(file) {
    const path = "assets/img/" + file + ".png";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(path)
        .then(() => toast(UI[LANG].copied + ": " + path))
        .catch(() => toast(path));
    } else {
      toast(path);
    }
  }

  /* ---------- timer ---------- */
  function toggleTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; return; }
    timerId = setInterval(() => {
      timerSec++;
      $("#timer").textContent = pad(Math.floor(timerSec / 60)) + ":" + pad(timerSec % 60);
    }, 1000);
  }

  /* ---------- language ---------- */
  function applyLang() {
    const ui = UI[LANG];
    document.documentElement.lang = LANG;
    document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
    $$("[data-i18n]").forEach((el) => { el.textContent = ui[el.dataset.i18n] || el.textContent; });
    $("#langLabel").textContent = ui.langBtn;
    $("#brandTitle").textContent = L(DECK.title);
    $("#brandSub").textContent = L(DECK.subtitle);
    $("#btnPrev").setAttribute("aria-label", ui.prev);
    $("#btnNext").setAttribute("aria-label", ui.next);
    $$(".ph-label").forEach((el) => { el.textContent = ui.shotSlot; });
    $$(".zoom-hint").forEach((el) => { el.textContent = ui.zoom; });
    $("#keysList").innerHTML = ui.keys.map((k) =>
      `<li><span class="k">${k[0].map((x) => `<kbd>${x}</kbd>`).join("")}</span> ${k[1]}</li>`).join("");
    $("#help .note-block p").innerHTML = ui.screenshotsWhereBody;
    $("#help .note-block strong").textContent = ui.screenshotsWhere;
  }

  function setLang(l) {
    LANG = l;
    store.set("pca-lang", l);
    applyLang();
    const keep = nav[cur];
    buildDeck();
    go(keep, true);
  }

  /* ---------- events ---------- */
  function bind() {
    $("#btnNext").addEventListener("click", next);
    $("#btnPrev").addEventListener("click", prev);
    $("#btnOverview").addEventListener("click", () => {
      buildOverview(); openModal($("#overview"));
    });
    $("#btnHelp").addEventListener("click", () => openModal($("#help")));
    $("#btnFull").addEventListener("click", () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    });
    $("#btnPrint").addEventListener("click", () => window.print());
    $("#btnNotes").addEventListener("click", () => toggleNotes());
    $("#btnNotesClose").addEventListener("click", () => toggleNotes(false));
    $("#btnLang").addEventListener("click", () => setLang(LANG === "en" ? "ar" : "en"));
    $("#btnTimer").addEventListener("click", toggleTimer);
    $("#tgAppendix").addEventListener("change", (e) => toggleAppendix(e.target.checked));

    document.addEventListener("click", (e) => {
      const goEl = e.target.closest("[data-go]");
      if (goEl) {
        go(Number(goEl.dataset.go));
        closeModal($("#overview"));
        return;
      }
      if (e.target.closest("[data-close]")) { closeModal(e.target.closest(".modal")); return; }
      if (e.target.closest("[data-lb-close]") || e.target.id === "lightbox") { closeModal($("#lightbox")); return; }
      const ph = e.target.closest(".ph-file");
      if (ph) { copyPath(ph.closest(".shot").dataset.file); return; }
      const zoom = e.target.closest(".shot.has-img");
      if (zoom) openLightbox(zoom);
    });

    document.addEventListener("keydown", (e) => {
      if (e.target.matches("input,textarea")) return;
      const rtl = document.documentElement.dir === "rtl";
      const k = e.key;

      if (k === "Escape") { $$(".modal").forEach(closeModal); closeModal($("#lightbox")); return; }
      if (anyModalOpen() && k !== "o" && k !== "O") return;

      switch (k) {
        case "ArrowRight": rtl ? prev() : next(); break;
        case "ArrowLeft":  rtl ? next() : prev(); break;
        case "ArrowDown": case "PageDown": case " ": next(); break;
        case "ArrowUp": case "PageUp": prev(); break;
        case "Home": go(nav[0]); break;
        case "End":  go(nav[nav.length - 1]); break;
        case "o": case "O": buildOverview(); openModal($("#overview")); break;
        case "n": case "N": toggleNotes(); break;
        case "a": case "A": toggleAppendix(); break;
        case "f": case "F": $("#btnFull").click(); break;
        case "p": case "P": window.print(); break;
        case "?": case "/": openModal($("#help")); break;
        default: return;
      }
      e.preventDefault();
    });

    /* touch swipe */
    let sx = 0, sy = 0;
    $("#deck").addEventListener("touchstart", (e) => {
      sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    }, { passive: true });
    $("#deck").addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        document.documentElement.dir === "rtl" ? (dx > 0 ? next() : prev()) : (dx < 0 ? next() : prev());
      }
    }, { passive: true });

    window.addEventListener("hashchange", () => {
      const n = Number(location.hash.replace("#", "")) - 1;
      if (nav.includes(n)) go(n, true);
    });
  }

  /* ---------- boot ---------- */
  function init() {
    applyLang();
    bind();
    toggleNotes(notesOn);
    toggleAppendix(appendix);
    buildDeck();
    const n = Number(location.hash.replace("#", "")) - 1;
    go(nav.includes(n) ? n : 0, true);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
