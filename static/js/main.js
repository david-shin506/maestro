/* MAESTRO project page — language toggle, TOC highlight, figure lightbox */
(function () {
  "use strict";

  /* ---------- language ---------- */
  var html = document.documentElement;
  var KEY = "maestro-lang";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* ignore */ }
  }

  function setLang(lang) {
    html.setAttribute("data-lang", lang);
    html.setAttribute("lang", lang === "ko" ? "ko" : "en");
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    store(lang);
    var t = document.querySelector("title");
    if (t && t.dataset.ko) t.textContent = lang === "ko" ? t.dataset.ko : t.dataset.en;
  }

  setLang(stored() === "en" ? "en" : "ko");

  document.querySelectorAll(".lang-toggle button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang); });
  });

  /* ---------- TOC highlight ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
  var targets = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function syncToc() {
    var best = null, bestTop = -Infinity;
    var line = 110; // just under the sticky bar
    targets.forEach(function (sec) {
      var top = sec.getBoundingClientRect().top;
      if (top <= line && top > bestTop) { bestTop = top; best = sec.id; }
    });
    if (best === null && targets.length) {
      best = targets[0].getBoundingClientRect().top > line ? null : targets[0].id;
    }
    links.forEach(function (a) {
      a.classList.toggle("active", best !== null && a.getAttribute("href") === "#" + best);
    });
  }

  if (targets.length) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { syncToc(); ticking = false; });
    }, { passive: true });
    window.addEventListener("resize", syncToc, { passive: true });
    syncToc();
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = lb ? lb.querySelector("img") : null;

  document.querySelectorAll("figure .imgbox img").forEach(function (img) {
    img.addEventListener("click", function () {
      if (!lb || !lbImg) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt || "";
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLb() {
    if (!lb) return;
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }
  if (lb) {
    lb.addEventListener("click", closeLb);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLb();
    });
  }
})();
