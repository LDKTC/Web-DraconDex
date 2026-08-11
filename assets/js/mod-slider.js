/* Module screenshot gallery: an endlessly-looping "coverflow" carousel —
   the front slide sits large and centered with just one neighbor peeking
   in from each side; everything past that fades out. Position comes from
   a cyclic distance (index modulo slide count) from a floating-point
   "current" value, so there's no start/end to hit and nothing to clone for
   the loop: dragging or paging past the last slide just wraps naturally
   back to the first. A mouse drag also tilts each visible slide towards
   the drag direction (every slide gets its own skew, not one shared pane),
   easing back to level on release. Pairs with a fullscreen lightbox (zoom
   via wheel/buttons/pinch) for any [data-lightbox-trigger] element on the
   page. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  /* --- coverflow carousel -------------------------------------------------- */
  function initCarousel(root) {
    var track = root.querySelector("[data-mod-track]");
    if (!track) return;
    var items = Array.prototype.slice.call(
      track.querySelectorAll("[data-mod-item]")
    );
    var n = items.length;
    if (!n) return;

    var SPACING = 300; // px between adjacent slide centers
    var VISIBLE = 1.5; // only the current slide + one neighbor each side
    var current = 0; // unbounded — cyclicOffset() wraps it per slide
    var dragging = false;
    var moved = false;
    var justDragged = false;
    var startX = 0;
    var startCurrent = 0;
    var lastX = 0;
    var dragTilt = 0; // deg, applied per-slide (not to the shared track)
    var maxTilt = 6;

    function cyclicOffset(i, cur) {
      var raw = i - cur;
      var wrapped = ((raw % n) + n) % n; // 0..n
      if (wrapped > n / 2) wrapped -= n; // shortest signed path, (-n/2, n/2]
      return wrapped;
    }

    function render() {
      var nearest = Math.round(current);
      items.forEach(function (el, i) {
        var offset = cyclicOffset(i, current);
        var abs = Math.abs(offset);
        var visible = abs <= VISIBLE;
        var scale = Math.max(0.62, 1 - abs * 0.32);
        var opacity = visible ? Math.max(0, 1 - abs * 0.62) : 0;
        var z = Math.round(100 - abs * 10);
        el.style.transform =
          "translate(-50%, -50%) translateX(" +
          (offset * SPACING).toFixed(1) +
          "px) skewX(" +
          dragTilt.toFixed(2) +
          "deg) scale(" +
          scale.toFixed(3) +
          ")";
        el.style.opacity = String(opacity);
        el.style.zIndex = String(z);
        el.style.pointerEvents = visible ? "" : "none";
        var isCurrent = ((nearest % n) + n) % n === i;
        el.classList.toggle("is-current", isCurrent);
        el.setAttribute("aria-hidden", isCurrent ? "false" : "true");
      });
    }

    function goTo(i) {
      current = i;
      render();
    }

    var activePointerId = null;
    var captured = false;

    track.addEventListener("pointerdown", function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true;
      moved = false;
      captured = false;
      activePointerId = e.pointerId;
      startX = e.clientX;
      lastX = e.clientX;
      startCurrent = current;
    });

    track.addEventListener("pointermove", function (e) {
      if (!dragging || e.pointerId !== activePointerId) return;
      var dx = e.clientX - startX;

      if (!moved) {
        if (Math.abs(dx) <= 4) return; // below the drag threshold — still a click
        moved = true;
        track.classList.add("is-dragging");
        // Captured lazily: capturing on every pointerdown would retarget the
        // click that follows a plain tap/click to the track itself, since
        // captured pointers re-target their whole event sequence — see
        // https://w3c.github.io/pointerevents/#dfn-pointer-capture-target-override.
        // Capturing only once real dragging starts keeps a plain click's
        // event target intact (the slide's own button) while still letting
        // an actual drag track the pointer outside the element's bounds.
        track.setPointerCapture(e.pointerId);
      }

      current = startCurrent - dx / SPACING;

      if (e.pointerType === "mouse") {
        var step = e.clientX - lastX;
        lastX = e.clientX;
        dragTilt = Math.max(-maxTilt, Math.min(maxTilt, -step * 1.4));
      }
      render();
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("is-dragging");
      dragTilt = 0;
      goTo(Math.round(current));
      if (moved) {
        justDragged = true;
        setTimeout(function () {
          justDragged = false;
        }, 300);
      }
      moved = false;
    }

    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("pointerleave", function (e) {
      if (dragging && e.pointerType === "mouse") endDrag();
    });

    /* Capture-phase so we can decide, before a click ever reaches a slide's
       own lightbox-trigger button, whether it should open the lightbox
       (front slide) or just bring that slide to the front (any other). */
    track.addEventListener(
      "click",
      function (e) {
        if (justDragged) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        var slideEl = e.target.closest(".mod-slide");
        if (!slideEl) return;
        var i = items.indexOf(slideEl);
        if (i === -1) return;
        var nearest = ((Math.round(current) % n) + n) % n;
        if (nearest !== i) {
          e.preventDefault();
          e.stopPropagation();
          goTo(i);
        }
      },
      true
    );

    root.querySelectorAll("[data-mod-prev]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        goTo(Math.round(current) - 1);
      });
    });
    root.querySelectorAll("[data-mod-next]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        goTo(Math.round(current) + 1);
      });
    });

    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(Math.round(current) - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(Math.round(current) + 1);
      }
    });

    render();
  }

  /* --- lightbox: zoom + pan + pinch, keyboard and click-outside to close -- */
  var MIN_SCALE = 1;
  var MAX_SCALE = 4;

  function initLightbox() {
    var box = document.querySelector("[data-lightbox]");
    if (!box) return;

    var stage = box.querySelector("[data-lightbox-stage]");
    var img = box.querySelector("[data-lightbox-img]");
    var caption = box.querySelector("[data-lightbox-caption]");
    var zoomLevel = box.querySelector("[data-lightbox-zoom-level]");
    var closeBtn = box.querySelector("[data-lightbox-close]");
    var zoomInBtn = box.querySelector("[data-lightbox-zoom-in]");
    var zoomOutBtn = box.querySelector("[data-lightbox-zoom-out]");
    var prevBtn = box.querySelector("[data-lightbox-prev]");
    var nextBtn = box.querySelector("[data-lightbox-next]");

    var items = Array.prototype.slice.call(
      document.querySelectorAll("[data-lightbox-trigger]")
    );
    if (!items.length) return;

    var index = 0;
    var scale = 1;
    var tx = 0;
    var ty = 0;
    var lastFocus = null;

    function clampScale(s) {
      return Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));
    }

    function clampPan() {
      if (scale <= 1) {
        tx = 0;
        ty = 0;
        return;
      }
      var rect = stage.getBoundingClientRect();
      var maxX = (rect.width * (scale - 1)) / 2;
      var maxY = (rect.height * (scale - 1)) / 2;
      tx = Math.max(-maxX, Math.min(maxX, tx));
      ty = Math.max(-maxY, Math.min(maxY, ty));
    }

    function apply() {
      img.style.transform =
        "translate(-50%, -50%) translate(" +
        tx +
        "px," +
        ty +
        "px) scale(" +
        scale +
        ")";
      if (zoomLevel) zoomLevel.textContent = Math.round(scale * 100) + "%";
      stage.classList.toggle("is-zoomed", scale > 1);
      if (zoomOutBtn) zoomOutBtn.disabled = scale <= MIN_SCALE;
      if (zoomInBtn) zoomInBtn.disabled = scale >= MAX_SCALE;
    }

    function setScale(next) {
      scale = clampScale(next);
      clampPan();
      apply();
    }

    function resetView() {
      scale = 1;
      tx = 0;
      ty = 0;
      apply();
    }

    function show(i) {
      index = (i + items.length) % items.length;
      var el = items[index];
      var full = el.getAttribute("data-full") || "";
      var cap = el.getAttribute("data-caption") || "";
      img.src = full;
      img.alt = cap;
      if (caption) caption.textContent = cap;
      resetView();
    }

    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      box.hidden = false;
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      box.hidden = true;
      document.body.style.overflow = "";
      img.removeAttribute("src");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    items.forEach(function (el, i) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        open(i);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", close);
    if (prevBtn)
      prevBtn.addEventListener("click", function () {
        show(index - 1);
      });
    if (nextBtn)
      nextBtn.addEventListener("click", function () {
        show(index + 1);
      });
    if (zoomInBtn)
      zoomInBtn.addEventListener("click", function () {
        setScale(scale + 0.5);
      });
    if (zoomOutBtn)
      zoomOutBtn.addEventListener("click", function () {
        setScale(scale - 0.5);
      });

    box.addEventListener("click", function (e) {
      if (e.target === box) close();
    });

    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(index - 1);
      else if (e.key === "ArrowRight") show(index + 1);
      else if (e.key === "+" || e.key === "=") setScale(scale + 0.5);
      else if (e.key === "-") setScale(scale - 0.5);
    });

    stage.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
        setScale(scale + (e.deltaY < 0 ? 0.3 : -0.3));
      },
      { passive: false }
    );

    img.addEventListener("dblclick", function () {
      setScale(scale > 1 ? 1 : 2.5);
    });

    /* pointer-based pan (mouse/pen drag when zoomed) + two-finger pinch */
    var pointers = {};
    var panning = false;
    var panStart = { x: 0, y: 0, tx: 0, ty: 0 };
    var pinchStartDist = 0;
    var pinchStartScale = 1;

    function dist(a, b) {
      return Math.hypot(a.x - b.x, a.y - b.y);
    }

    stage.addEventListener("pointerdown", function (e) {
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pointers);
      if (ids.length === 1 && scale > 1) {
        panning = true;
        panStart = { x: e.clientX, y: e.clientY, tx: tx, ty: ty };
        stage.setPointerCapture(e.pointerId);
        stage.classList.add("is-panning");
      } else if (ids.length === 2) {
        panning = false;
        var pts = ids.map(function (id) {
          return pointers[id];
        });
        pinchStartDist = dist(pts[0], pts[1]);
        pinchStartScale = scale;
      }
    });

    stage.addEventListener("pointermove", function (e) {
      if (!(e.pointerId in pointers)) return;
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pointers);

      if (ids.length === 2) {
        var pts = ids.map(function (id) {
          return pointers[id];
        });
        var d = dist(pts[0], pts[1]);
        if (pinchStartDist > 0) setScale(pinchStartScale * (d / pinchStartDist));
        return;
      }

      if (panning) {
        tx = panStart.tx + (e.clientX - panStart.x);
        ty = panStart.ty + (e.clientY - panStart.y);
        clampPan();
        apply();
      }
    });

    function endPointer(e) {
      delete pointers[e.pointerId];
      if (Object.keys(pointers).length < 2) pinchStartDist = 0;
      if (Object.keys(pointers).length === 0) {
        panning = false;
        stage.classList.remove("is-panning");
      }
    }

    stage.addEventListener("pointerup", endPointer);
    stage.addEventListener("pointercancel", endPointer);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-mod-slider]").forEach(initCarousel);
    initLightbox();
  });
})();
