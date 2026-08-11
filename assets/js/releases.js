/* Live release data for the download buttons and the download page.
   Reads the public GitHub API from the visitor's browser — no build step and
   no token, so the page never goes stale when a new version ships. The API
   allows 60 unauthenticated requests per hour per IP; every entry point
   degrades to a plain link to the Releases page when that runs out. */
(function () {
  "use strict";

  var APP_REPO = "LDKTC/App-DraconDex";
  var API = "https://api.github.com/repos/" + APP_REPO + "/releases";
  var RELEASES_URL = "https://github.com/" + APP_REPO + "/releases";
  var CACHE_KEY = "dracondex-releases";
  var CACHE_MS = 10 * 60 * 1000;

  /* --- asset classification ---------------------------------------------
     Asset names come from .github/workflows/build-electron.yml in the app
     repo: DraconDex-Setup-<v>.exe, DraconDex-Portable-<v>.exe,
     DraconDex-<v>-win-x64.zip, checksums-sha256.txt */
  var KINDS = {
    installer: {
      icon: "wand-sparkles",
      label: "Windows installer",
      note: "Normal install/uninstall, shortcuts, data in %APPDATA%/DraconDex",
      test: function (n) {
        return /-setup-.*\.exe$/i.test(n);
      }
    },
    portable: {
      icon: "footprints",
      label: "Portable .exe",
      note: "Single file, nothing installed — data sits next to the exe",
      test: function (n) {
        return /-portable-.*\.exe$/i.test(n);
      }
    },
    zip: {
      icon: "archive",
      label: "Portable folder (zip)",
      note: "Unzip and run DraconDex.exe — the whole folder travels on a USB stick",
      test: function (n) {
        return /win-x64\.zip$/i.test(n);
      }
    },
    checksums: {
      icon: "lock",
      label: "SHA-256 checksums",
      note: "Verify a download before running it",
      test: function (n) {
        return /^checksums/i.test(n);
      }
    },
    other: { icon: "package", label: "Asset", note: "", test: function () {
      return true;
    } }
  };

  var KIND_ORDER = ["installer", "portable", "zip", "checksums", "other"];

  function kindOf(name) {
    for (var i = 0; i < KIND_ORDER.length; i++) {
      var k = KIND_ORDER[i];
      if (KINDS[k].test(name)) return k;
    }
    return "other";
  }

  function formatSize(bytes) {
    if (!bytes && bytes !== 0) return "";
    var mb = bytes / (1024 * 1024);
    if (mb >= 1) return mb.toFixed(1) + " MB";
    return Math.max(1, Math.round(bytes / 1024)) + " KB";
  }

  function formatDate(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function isWindows() {
    var p = (navigator.userAgentData && navigator.userAgentData.platform) || "";
    return /win/i.test(p || navigator.platform || navigator.userAgent);
  }

  /* --- fetching ---------------------------------------------------------- */
  function readCache() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var box = JSON.parse(raw);
      if (!box || Date.now() - box.at > CACHE_MS) return null;
      return box.data;
    } catch (e) {
      return null;
    }
  }

  function writeCache(data) {
    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ at: Date.now(), data: data })
      );
    } catch (e) {
      /* storage full or blocked — the request just isn't cached */
    }
  }

  var pending = null;

  function load() {
    if (pending) return pending;
    var cached = readCache();
    if (cached) {
      pending = Promise.resolve(cached);
      return pending;
    }
    pending = fetch(API + "?per_page=20", {
      headers: { Accept: "application/vnd.github+json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("GitHub API responded " + res.status);
        return res.json();
      })
      .then(function (list) {
        if (!Array.isArray(list)) throw new Error("Unexpected API response");
        var published = list.filter(function (r) {
          return !r.draft;
        });
        writeCache(published);
        return published;
      });
    return pending;
  }

  /* --- hero / nav download button ---------------------------------------- */
  function fillPrimaryButtons(releases) {
    var latest = releases.filter(function (r) {
      return !r.prerelease;
    })[0] || releases[0];
    if (!latest) return;

    var assets = latest.assets || [];
    var preferred = null;
    for (var i = 0; i < assets.length && !preferred; i++) {
      if (kindOf(assets[i].name) === "installer") preferred = assets[i];
    }

    document.querySelectorAll("[data-latest-download]").forEach(function (el) {
      // Non-Windows visitors keep the Releases page link — the only builds
      // published as release assets are Windows ones.
      if (preferred && isWindows()) {
        el.href = preferred.browser_download_url;
        var label = el.querySelector("[data-download-label]");
        if (label) label.textContent = "Download for Windows";
      }
      var sub = el.querySelector("[data-download-sub]");
      if (sub) {
        sub.textContent =
          latest.tag_name +
          (preferred ? " · " + formatSize(preferred.size) : "");
      }
    });

    document.querySelectorAll("[data-latest-version]").forEach(function (el) {
      el.textContent = latest.tag_name;
    });
    document.querySelectorAll("[data-latest-date]").forEach(function (el) {
      el.textContent = formatDate(latest.published_at);
    });
    document.querySelectorAll("[data-latest-notes]").forEach(function (el) {
      el.href = latest.html_url;
    });
    document.querySelectorAll("[data-latest-meta]").forEach(function (el) {
      el.hidden = false;
    });
  }

  /* --- download page ------------------------------------------------------ */
  function assetRow(asset, featured) {
    var kind = kindOf(asset.name);
    var meta = KINDS[kind];

    var row = document.createElement("div");
    row.className = "asset" + (featured ? " asset--featured" : "");

    var icon = document.createElement("div");
    icon.className = "asset__icon";
    icon.innerHTML = window.DDIcon ? window.DDIcon(meta.icon) : "";

    var body = document.createElement("div");
    body.className = "asset__body";

    var title = document.createElement("div");
    title.className = "asset__name";
    title.textContent = meta.label;

    var sub = document.createElement("div");
    sub.className = "asset__meta";
    sub.textContent =
      asset.name +
      " · " +
      formatSize(asset.size) +
      (meta.note ? " · " + meta.note : "");

    body.appendChild(title);
    body.appendChild(sub);

    var link = document.createElement("a");
    link.className = "btn" + (featured ? " btn--primary" : "");
    link.href = asset.browser_download_url;
    link.textContent = "Download";
    link.setAttribute("aria-label", "Download " + asset.name);

    row.appendChild(icon);
    row.appendChild(body);
    row.appendChild(link);
    return row;
  }

  function sortAssets(assets) {
    return assets.slice().sort(function (a, b) {
      return KIND_ORDER.indexOf(kindOf(a.name)) -
        KIND_ORDER.indexOf(kindOf(b.name));
    });
  }

  function renderLatest(host, release) {
    host.textContent = "";
    if (!release.assets || !release.assets.length) {
      var empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent =
        "This release has no attached files. Open it on GitHub to see what it contains.";
      host.appendChild(empty);
      return;
    }
    sortAssets(release.assets).forEach(function (asset) {
      host.appendChild(assetRow(asset, kindOf(asset.name) === "installer"));
    });
  }

  function renderHistory(host, releases) {
    host.textContent = "";
    if (!releases.length) {
      host.innerHTML =
        '<p class="muted">No earlier releases yet.</p>';
      return;
    }
    releases.forEach(function (release) {
      var box = document.createElement("details");
      box.className = "release";

      var summary = document.createElement("summary");
      var name = document.createElement("span");
      name.textContent = release.tag_name;
      summary.appendChild(name);

      if (release.prerelease) {
        var pre = document.createElement("span");
        pre.className = "pill pill--warn";
        pre.textContent = "pre-release";
        summary.appendChild(pre);
      }

      var when = document.createElement("span");
      when.className = "muted small";
      when.textContent = formatDate(release.published_at);
      summary.appendChild(when);
      box.appendChild(summary);

      var list = document.createElement("div");
      list.className = "release__assets";
      sortAssets(release.assets || []).forEach(function (asset) {
        var a = document.createElement("a");
        a.href = asset.browser_download_url;
        a.textContent = asset.name + " (" + formatSize(asset.size) + ")";
        list.appendChild(a);
      });

      var notes = document.createElement("a");
      notes.href = release.html_url;
      notes.textContent = "Release notes on GitHub →";
      list.appendChild(notes);

      box.appendChild(list);
      host.appendChild(box);
    });
  }

  function failure(host, err) {
    if (!host) return;
    host.innerHTML = "";
    var p = document.createElement("p");
    p.className = "is-error";
    p.textContent =
      "Could not load the release list (" +
      err.message +
      "). GitHub limits anonymous API requests — the downloads are always available directly:";
    var a = document.createElement("a");
    a.className = "btn btn--primary";
    a.href = RELEASES_URL;
    a.textContent = "Open Releases on GitHub";
    host.appendChild(p);
    host.appendChild(a);
  }

  /* --- boot -------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var latestHost = document.querySelector("[data-latest-assets]");
    var historyHost = document.querySelector("[data-release-history]");
    var needsButtons = document.querySelector("[data-latest-download]");

    if (!latestHost && !historyHost && !needsButtons) return;

    load()
      .then(function (releases) {
        fillPrimaryButtons(releases);

        if (!releases.length) {
          if (latestHost) {
            latestHost.innerHTML =
              '<p class="muted">No releases have been published yet. Builds can be produced from source — see the app repository.</p>';
          }
          if (historyHost) historyHost.innerHTML = "";
          return;
        }

        var stable = releases.filter(function (r) {
          return !r.prerelease;
        });
        var latest = stable[0] || releases[0];

        if (latestHost) renderLatest(latestHost, latest);
        if (historyHost) {
          renderHistory(
            historyHost,
            releases.filter(function (r) {
              return r.id !== latest.id;
            })
          );
        }
      })
      .catch(function (err) {
        failure(latestHost, err);
        if (historyHost) {
          historyHost.innerHTML =
            '<p class="muted">Earlier releases are listed on <a href="' +
            RELEASES_URL +
            '">GitHub</a>.</p>';
        }
      });
  });
})();
