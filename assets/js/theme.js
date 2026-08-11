/* Theme switch — mirrors the app's three themes (src/design/tokens/tokens.json
   in LDKTC/App-DraconDex): "midnight" (default dark), "daylight" (light) and
   "moonlight" (dark blue). Loaded synchronously in <head> so the stored
   choice is applied before first paint. With nothing stored we leave
   data-theme unset and let the prefers-color-scheme block in site.css
   follow the OS (between midnight and daylight only — moonlight is always
   an explicit pick). */
(function () {
  "use strict";

  var KEY = "dracondex-theme";
  var ORDER = ["midnight", "daylight", "moonlight"];
  var root = document.documentElement;

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return ORDER.indexOf(v) !== -1 ? v : null;
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

  function next(theme) {
    return ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
  }

  var ICON = { midnight: "moon", daylight: "sun", moonlight: "moon-star" };
  var LABEL = {
    midnight: { en: "Switch to midnight theme", th: "สลับเป็นธีมมิดไนท์" },
    daylight: { en: "Switch to daylight theme", th: "สลับเป็นธีมกลางวัน" },
    moonlight: { en: "Switch to moonlight theme", th: "สลับเป็นธีมมูนไลท์" },
  };

  function lang() {
    return root.getAttribute("data-lang") === "th" ? "th" : "en";
  }

  function sync(btn) {
    var target = next(current());
    btn.innerHTML = window.DDIcon ? window.DDIcon(ICON[target]) : "";
    btn.setAttribute("aria-label", LABEL[target][lang()]);
    btn.title = btn.getAttribute("aria-label");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    sync(btn);
    btn.addEventListener("click", function () {
      apply(next(current()));
      try {
        localStorage.setItem(KEY, current());
      } catch (e) {
        /* private mode — the choice just won't persist */
      }
      sync(btn);
    });
    document.addEventListener("dracondex:langchange", function () {
      sync(btn);
    });
  });
})();
