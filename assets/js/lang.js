/* Language switch — English (default markup) / Thai. Loaded synchronously in
   <head>, right after theme.js, so the stored choice is set on <html> before
   first paint. Translation itself runs once the DOM exists: every element
   tagged data-i18n="key" gets its innerHTML swapped against assets/js/
   strings.th.js (window.DDStrings), with the page's original English cached
   on first run so switching back to English needs no separate dictionary.
   data-i18n-attr="attr:key;attr2:key2" does the same for attributes (aria-
   label, alt, title, the <meta description> content, …) that can't hold
   markup. Dynamic content injected by releases.js/plugins.js is sourced live
   from GitHub and stays in English regardless of the chosen language. */
(function () {
  "use strict";

  var KEY = "dracondex-lang";
  var root = document.documentElement;

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "th" || v === "en" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function current() {
    return root.getAttribute("data-lang") === "th" ? "th" : "en";
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
  }

  apply(stored() || "en");

  function dict() {
    return window.DDStrings || {};
  }

  function translateOne(el) {
    var key = el.getAttribute("data-i18n");
    if (el.dataset.i18nOrig === undefined) el.dataset.i18nOrig = el.innerHTML;
    var th = dict()[key];
    el.innerHTML = current() === "th" && th != null ? th : el.dataset.i18nOrig;
  }

  function translateAttrs(el) {
    var spec = el.getAttribute("data-i18n-attr");
    if (!spec) return;
    var pairs = spec.split(";").filter(Boolean).map(function (pair) {
      var i = pair.indexOf(":");
      return [pair.slice(0, i).trim(), pair.slice(i + 1).trim()];
    });
    if (el.dataset.i18nAttrOrig === undefined) {
      var orig = {};
      pairs.forEach(function (p) {
        orig[p[0]] = el.getAttribute(p[0]) || "";
      });
      el.dataset.i18nAttrOrig = JSON.stringify(orig);
    }
    var origMap = JSON.parse(el.dataset.i18nAttrOrig);
    pairs.forEach(function (p) {
      var attr = p[0];
      var th = dict()[p[1]];
      el.setAttribute(attr, current() === "th" && th != null ? th : origMap[attr]);
    });
  }

  function applyAll() {
    document.querySelectorAll("[data-i18n]").forEach(translateOne);
    document.querySelectorAll("[data-i18n-attr]").forEach(translateAttrs);
    document.dispatchEvent(new CustomEvent("dracondex:langchange"));
  }

  var BTN = {
    en: { text: "TH", aria: "Switch to Thai" },
    th: { text: "EN", aria: "สลับเป็นภาษาอังกฤษ" },
  };

  function sync(btn) {
    var s = BTN[current()];
    btn.textContent = s.text;
    btn.setAttribute("aria-label", s.aria);
    btn.title = s.aria;
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyAll();
    var btn = document.querySelector("[data-lang-toggle]");
    if (!btn) return;
    sync(btn);
    btn.addEventListener("click", function () {
      apply(current() === "en" ? "th" : "en");
      try {
        localStorage.setItem(KEY, current());
      } catch (e) {
        /* private mode — the choice just won't persist */
      }
      applyAll();
      sync(btn);
    });
  });
})();
