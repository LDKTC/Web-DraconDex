/* Theme switch — mirrors the app's "midnight" (dark) / "daylight" (light)
   themes. Loaded synchronously in <head> so the stored choice is applied
   before first paint. With nothing stored we leave data-theme unset and let
   the prefers-color-scheme block in site.css follow the OS. */
(function () {
  "use strict";

  var KEY = "dracondex-theme";
  var root = document.documentElement;

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "midnight" || v === "daylight" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function apply(theme) {
    if (theme) root.setAttribute("data-theme", theme);
    else root.removeAttribute("data-theme");
  }

  apply(stored());

  function current() {
    var explicit = root.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
      ? "daylight"
      : "midnight";
  }

  function sync(btn) {
    var dark = current() === "midnight";
    btn.innerHTML = window.DDIcon ? window.DDIcon(dark ? "sun" : "moon") : "";
    btn.setAttribute(
      "aria-label",
      dark ? "Switch to light theme" : "Switch to dark theme"
    );
    btn.title = btn.getAttribute("aria-label");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    sync(btn);
    btn.addEventListener("click", function () {
      var next = current() === "midnight" ? "daylight" : "midnight";
      apply(next);
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {
        /* private mode — the choice just won't persist */
      }
      sync(btn);
    });
  });
})();
